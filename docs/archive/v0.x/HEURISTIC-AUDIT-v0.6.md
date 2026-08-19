# NEXA DESIGN LAB v0.6 — Nielsen Heuristic Audit

Status: CANDIDATE. Findings are route-level candidate findings from static review and implementation inspection. Manual human evaluation remains required.

## Severity method

The [NN/G severity scale](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/) is used:

0 = no usability problem; 1 = cosmetic only; 2 = minor/low priority; 3 = major/high priority; 4 = catastrophe/imperative. Priority considers frequency, impact and persistence in context.

## Findings

| Heuristic                                                 | Evidence / route                                                              | Finding                                                                                                                                                       | Severity | Remediation                                                                                        | Status                     |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------: | -------------------------------------------------------------------------------------------------- | -------------------------- |
| H1 Visibility of system status                            | Documentation status panel; shell active route; /reference/platform/dashboard | v0.6 exposes candidate status, route hierarchy and active row. Reference controls with static synthetic data still need runtime outcome evidence.             |        2 | Capture loading, empty, success and error behavior for representative routes.                      | Candidate / manual pending |
| H2 Match with real world                                  | Vue/FLOW sales, logistics and buyer routes                                    | Domain vocabulary is preserved: Sales, requests, orders, documents, dispatch and Buyer Portal.                                                                |        0 | Keep route-specific language during human review.                                                  | Candidate                  |
| H3 User control and freedom                               | Mobile Design Lab drawer; auth/manual-order references                        | Escape and focus return are implemented for the Design Lab drawer. Some reference actions are fixtures, so cancel/undo coverage is not complete.              |        2 | Add route-specific cancel, close, back and recovery evidence where the reference claims a flow.    | Candidate / manual pending |
| H4 Consistency and standards                              | Documentation shell, Platform shell, Vue ops.css evidence                     | Active rows now share the observed 8px geometry and inset edge; separate portal/auth shells retain their evidence-backed differences.                         |        1 | Verify all states at matched viewports and keep icon/label pairings stable.                        | Candidate                  |
| H5 Error prevention                                       | Registration error FLOW; manual-order reference                               | Error and review rules are documented, but static reference screens cannot prove prevention before commit.                                                    |        2 | Exercise required fields, invalid values, review and confirmation with keyboard and screen reader. | Candidate / manual pending |
| H6 Recognition rather than recall                         | Breadcrumbs, grouped IA, documentation search, dashboard context              | Pages expose group, title, status and related links; search filters page labels and keywords.                                                                 |        1 | Test whether a first-time reviewer can locate a component and return to the same context.          | Candidate / manual pending |
| H7 Flexibility and efficiency                             | Lazy routed pages, search, keyboard/focus contracts                           | Efficient paths exist for route navigation and documentation search; complex component keyboard behavior remains a contract, not full runtime implementation. |        2 | Add interaction tests for menus, overlays, tables and steppers before promotion.                   | Candidate / manual pending |
| H8 Aesthetic and minimalist design                        | v0.5 capsule correction; documentation page system                            | v0.6 removes broad card soup and generic marketing patterns; evidence pages still need human review for density and wording.                                  |        1 | Review rendered pages at desktop/mobile and remove any repeated container without hierarchy.       | Candidate / manual pending |
| H9 Help users recognize, diagnose and recover from errors | Error, alert, states and form contracts                                       | The documentation specifies cause, recovery and status; runtime references need real error affordance tests.                                                  |        2 | Verify inline errors, focus movement, clear copy and retry/cancel behavior.                        | Candidate / manual pending |
| H10 Help and documentation                                | 40+ routed docs pages; provenance and related links                           | The Design Lab itself supplies component, pattern, quality and engineering guidance with source links.                                                        |        1 | Human audit should validate findability, wording and whether each rule is actionable.              | Candidate / manual pending |

## Scope

Inspected:

- Documentation routes under /guidelines.
- Platform, Portal and Auth reference shells.
- Vue source/token evidence and the 49 FLOW screenshots.
- Angular routing, shell, component specimens and semantic tokens.

Not claimed:

- User research.
- Formal usability certification.
- Assistive technology conformance.
- Production behavior or API correctness.

## Next evaluation

Use at least one independent human reviewer per route family. Record task, viewport, content state, evidence, severity rationale and disposition. Do not collapse findings into one visual score.
