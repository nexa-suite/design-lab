# Design Lab release policy

## Versioning

Design Lab versions independently from the product repositories. Release truth is the annotated Git tag and its corresponding GitHub Release. RC history remains explicit because it records experimental design evidence, not production readiness or Blueprint authority.

## Tag signing

Release tags MUST be annotated, signed with the maintainer's registered SSH key, verified locally with `git verify-tag <version>` and shown as `Verified` by GitHub before publication. Configure `tag.gpgSign=true` and `gpg.ssh.allowedSignersFile=.github/release-allowed-signers`; the committed allowlist contains only the public signer identity. The private key remains outside the repository.

## Release cadence

A merged PR is not automatically a release. Accumulate a coherent Design Lab evidence milestone and publish only when its validation boundary is meaningful. Use RCs when human review or visual validation remains open; do not publish one stable release per implementation PR.

## Checklist

- [ ] Documentation, architecture and visual validation pass.
- [ ] Experimental, non-production and non-canonical boundaries remain explicit.
- [ ] CHANGELOG and release evidence updated.
- [ ] Annotated SSH-signed tag created.
- [ ] `git verify-tag <version>` passed locally and GitHub shows `Verified`.
- [ ] GitHub Release published.
