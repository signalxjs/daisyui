# Releasing

Releases are cut by pushing a `v*.*.*` tag from `main`. The `Release` workflow:

1. Installs deps, lints, typechecks, builds, tests and verifies pack.
2. Publishes `@sigx/daisyui` using **npm trusted publishing** (OIDC) with provenance.
3. Promotes the matching draft GitHub release to `latest`, or creates one if none exists.

## Cutting a release

```bash
# 1. Bump versions across the workspace
pnpm version:patch    # or version:minor / version:major / version:set 0.5.0

# 2. Update CHANGELOG.md (move [Unreleased] → new version section)

# 3. Commit
git add -A
git commit -m "release: vX.Y.Z"

# 4. Tag and push
git tag vX.Y.Z
git push origin main --follow-tags
```

The workflow does the rest.

## npm trusted publishing

`@sigx/daisyui` on npm must have a Trusted Publisher rule pointing at
`signalxjs/daisyui` and workflow `.github/workflows/release.yml`. Without it,
`npm publish` will fail with an OIDC error.

To onboard the package (first publish from this repo):

1. Settings → Trusted Publishers → Add a Trusted Publisher on
   <https://www.npmjs.com/package/@sigx/daisyui/access>.
2. Provider: GitHub Actions.
3. Repository owner: `signalxjs`. Repository: `daisyui`. Workflow filename: `release.yml`.

Subsequent publishes happen automatically via OIDC. Tarballs carry npm provenance
attestation and the verified publisher badge.

## Local dry-run

```bash
pnpm publish:dry
```

This runs `scripts/publish.js --dry-run` which prints what `npm publish` would do without contacting the registry.
