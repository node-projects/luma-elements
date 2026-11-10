# Builds and releases

`ci.yml` runs on pushes and pull requests. It installs dependencies, builds the library/site/manifest, runs the Node and browser tests, packs the npm package, and retains the tarball and checksum as a workflow artifact. `pages.yml` builds, tests, and deploys the gallery for `main`/`master`; select GitHub Actions in the repository's Pages settings.

## Publish a release

Create a GitHub release with a semantic version tag such as `v1.2.3` or `v1.3.0-beta.1`. Publishing the release triggers `release.yml`.

The workflow:

1. Checks out the release tag.
2. Validates the tag and derives the package version from it. The release title is not used.
3. Updates `package.json` and `package-lock.json` in the runner, without creating a Git commit or another tag.
4. Builds and tests that version, including the JavaScript-linked Custom Elements Manifest.
5. Creates one npm `.tgz`, verifies its actual manifest/module/type/theme contents and compiled version, and writes `SHA256SUMS`.
6. Runs `npm publish --dry-run` against the tarball to verify npm resolves it as a local package.
7. Attaches those files to the same GitHub release.
8. Publishes that exact `.tgz` to the public npm registry.

Stable versions use npm's `latest` dist-tag. Prerelease versions, or releases marked as prerelease on GitHub, use `next`. An existing npm version cannot be overwritten; publish a new release version if it has already been published.

## npm authentication

Publication uses **npm trusted publishing through GitHub Actions OIDC**, with no npm publish token secret. Configure a GitHub Actions trusted publisher in the npm package's settings:

- Organization: `node-projects`
- Repository: `luma-elements`
- Workflow filename: `release.yml`
- Environment name: leave empty (this workflow does not use a GitHub environment).
- Allowed actions: enable direct publication with `npm publish`.

The workflow has `id-token: write` and installs npm 11 for OIDC support. npm obtains short-lived publication credentials from the configured trust relationship and generates provenance for supported public packages/repositories. See [npm's trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

There is no `NPM_TOKEN`/`NODE_AUTH_TOKEN` secret mapping or token fallback in the publish step. The trust relationship must be configured on npm; repository code cannot grant itself permission to publish. Match the owner, repository and workflow filename exactly. A dry run verifies the archive and command, not registry authorization. An `E404` or authentication failure during actual publication requires checking npm package access and the trusted-publisher configuration.

### First publication

npm requires the package to exist before a trusted publisher can be registered ([npm CLI prerequisites](https://github.com/npm/cli/blob/latest/docs/lib/content/commands/npm-trust.md)). A brand-new package therefore needs one interactive publication by an authorized npm organization member. This does not require creating a repository token secret.

For the already-built 1.1.0 release, download the `.tgz` and `SHA256SUMS` from [its release assets](https://github.com/node-projects/luma-elements/releases/tag/1.1.0), verify the checksum, then run in the download directory:

```sh
npm login
npm publish ./node-projects-luma-elements-1.1.0.tgz --access public --ignore-scripts
```

The login and publication may request interactive account/2FA approval. After publication, configure the trusted publisher using the fields above. All later releases use OIDC automatically. Do not rerun publication of an already-published version.

GitHub's own token attaches release assets; no separate GitHub token is needed. The release workflow must be present in the tagged commit. It does not push generated files or version changes back to the default branch.

## Local packaging check

```sh
npm test
node scripts/pack-release.mjs
```

This produces an ignored `artifacts/` directory containing the installable tarball and checksum. These commands do not publish anything.

## Local tarball paths and failed releases

The pack script emits an explicit `./artifacts/…tgz` path. npm requires the `./` prefix for relative tarball paths containing a directory; an unprefixed `artifacts/name.tgz` can be interpreted as a GitHub repository reference. Both CI and release builds exercise the emitted path with a publish dry run before actual publication.

A release workflow checks out its release tag. Re-running an old failed run uses that tagged implementation, not fixes subsequently pushed to `main`. For a release containing workflow fixes, create a new version tag from the corrected commit. Existing published versions cannot be overwritten; existing tags should not be silently moved. If publication failed after asset upload, the tarball and checksum remain attached to that release.
