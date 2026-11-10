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
6. Attaches those files to the same GitHub release.
7. Publishes that exact `.tgz` to the public npm registry.

Stable versions use npm's `latest` dist-tag. Prerelease versions, or releases marked as prerelease on GitHub, use `next`. An existing npm version cannot be overwritten; publish a new release version if it has already been published.

## npm authentication

Preferred: configure a GitHub Actions trusted publisher in the npm package's settings:

- Organization: `node-projects`
- Repository: `luma-elements`
- Workflow filename: `release.yml`
- No environment name is required by this workflow.

The workflow has `id-token: write` and installs npm 11 for OIDC support. npm prefers OIDC and generates provenance for supported public packages/repositories. See [npm's trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

For a first publish before a package/trusted publisher exists, an optional repository secret named `NPM_TOKEN` can provide a granular npm token with permission to publish `@node-projects/luma-elements`. The workflow passes it only to the publish step as `NODE_AUTH_TOKEN`. No credentials are stored in this repository. After a trusted publisher is configured, this secret is unnecessary.

GitHub's own token attaches release assets; no separate GitHub token is needed. The release workflow must be present in the tagged commit. It does not push generated files or version changes back to the default branch.

## Local packaging check

```sh
npm test
node scripts/pack-release.mjs
```

This produces an ignored `artifacts/` directory containing the installable tarball and checksum. These commands do not publish anything.
