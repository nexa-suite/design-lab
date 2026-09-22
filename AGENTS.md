# Repository Working Agreement

## Authority

- Use accepted Nexa Product, Domain and architecture decisions as the semantic
  authority. Design evidence is not Product authority.
- Read `README.md`, `CONTRIBUTING.md`, `docs/architecture.md` and the relevant
  Blueprint design baseline before changing the design system.
- Start from actor → goal → requirement or story → task flow → design. Do not
  invent business rules to justify a screen or component.

## Repository state

- Inspect the actual branch, worktree, remote metadata and working tree before
  editing.
- Fetch remote metadata before creating new work when permitted; do not merge
  fetched changes into a user's working branch.
- Preserve unrelated local work. Use an isolated worktree when the checkout is
  dirty.

## Design and implementation boundaries

- Preserve design-system consistency, token rationale, task clarity, feedback,
  recovery and accessibility.
- Report implementation variance instead of silently normalizing it.
- Product authority wins when design evidence conflicts with accepted Product
  semantics.
- Consumers import from the accepted public library surface. Do not expose
  documentation renderers or Lab utilities as reusable product components
  without the repository's documented evidence.

## Evidence and security

- Claim only deterministic validation, browser, responsive, reduced-motion,
  contrast, assistive-technology or human-review evidence that was actually
  performed. A command is not proof of human review.
- Do not weaken security, accessibility, data integrity or CI gates to make a
  change pass.
- Do not add credentials, generated host artifacts or undocumented contracts.

## SCM and artifacts

- Follow `CONTRIBUTING.md` for branch, commit, review and release flow.
- Use Conventional Commits and preserve real authorship and signatures.
- Do not force-push, rewrite shared history, create fake commits, invent
  contributors, merge automatically, create releases or create tags for this
  governance change.
- Repository-facing artifacts must be neutral, professional and free of
  internal orchestration residue, temporary placeholders and AI attribution.

## Validation and handoff

- Review the task diff and run `git diff --check`. For design or architecture
  changes, use the repository's documented validation commands; this file alone
  does not require a full product build.
- Do not claim a test, visual gate, browser review, CI result or deployment that
  was not executed and observed.
- End the task with factual result, changes, validation, commit, risk, open
  decision and unverified-item information.
