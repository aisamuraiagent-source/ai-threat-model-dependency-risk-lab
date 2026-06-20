# Security Findings

## Review Scope

Authorized defensive static review of the `ai-threat-model-dependency-risk-lab` repository.

Constraints honored during analysis:

- local static analysis only;
- no network access;
- no dependency installation;
- no permission changes;
- secret indicator searches limited to versioned files;
- sensitive values were not printed.

## Repository Map

The repository contains a small local Node.js demo application and sanitized defensive documentation.

Key application files:

- `app/package.json`
- `app/src/server.js`
- `app/src/input-handler.js`
- `app/src/auth.js`
- `app/tests/security-check.test.js`

Key security documentation and evidence files:

- `README.md`
- `THREAT_MODEL.md`
- `DEPENDENCY_RISK_REVIEW.md`
- `REMEDIATION_PLAN.md`
- `REMEDIATION_PROPOSAL.md`
- `PATCH_VERIFICATION_RESULT.md`
- `CODEX_SECURITY_INITIAL_SCAN_RESULT.md`
- `GITHUB_RULESETS.md`
- `SANITIZATION_CHECKLIST.md`
- `HUMAN_APPROVAL_LOG.md`
- `evidence/*.md`

## Severity Summary

| Severity | Count |
|---|---:|
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 1 |
| LOW | 4 |
| INFO | 2 |

---

## CRITICAL Findings

No CRITICAL findings were identified during this static local review.

---

## HIGH Findings

No HIGH findings were identified during this static local review.

---

## MEDIUM Findings

### MEDIUM-001: App test CI exists but the required status check is not yet enforced

**Evidence**

A minimal GitHub Actions workflow now exists at `.github/workflows/app-tests.yml`. It defines the `App Tests` workflow, supports manual execution with `workflow_dispatch`, runs on pull requests and pushes that affect the app or workflow, sets up Node.js 22, and runs `npm test` from the `app/` working directory.

The `App Tests / test` check executed successfully on PR #2. `GITHUB_RULESETS.md` now documents the exact check name that may be required after explicit human approval.

Relevant files:

- `.github/workflows/app-tests.yml`
- `GITHUB_RULESETS.md`
- `app/package.json`

**Impact**

The original CI absence has been remediated, but merge-time enforcement is not complete until the GitHub ruleset requires the passing `App Tests / test` status check. Until then, reviewers still need to verify that the check ran and passed before merge.

**Recommended Fix**

After human approval, update the GitHub ruleset manually to require the exact observed status check:

```text
App Tests / test
```

Do not require additional checks until they have run successfully on GitHub and are separately approved.

**Validation Test**

- Open or update a pull request.
- Confirm `App Tests / test` runs automatically and passes.
- Enable the required status check in the GitHub ruleset only after approval.
- Confirm GitHub blocks merge when the required check is missing or failing.

**Residual Risk**

CI validates only the configured checks and does not replace human review, threat modeling, dependency review, or periodic security assessment. The current residual risk is ruleset enforcement, not CI availability.

---

## LOW Findings

### LOW-001: No package lockfile is present

**Evidence**

No versioned `package-lock.json`, `npm-shrinkwrap.json`, `yarn.lock`, or `pnpm-lock.yaml` was identified. Current risk is low because `app/package.json` declares no runtime or development dependencies.

**Impact**

If dependencies are added later without a lockfile, builds may become non-reproducible and dependency review may become less reliable.

**Recommended Fix**

No immediate lockfile is required while dependency sets remain empty. If any third-party dependency is added, generate and commit the appropriate lockfile in the same change.

**Validation Test**

- Confirm no dependencies exist today.
- If dependencies are added later, run the package manager install command in a controlled environment and confirm the lockfile is created and committed.

**Residual Risk**

Even with a lockfile, dependency advisories and package maintenance must still be reviewed.

---

### LOW-002: Demo server listens without explicit localhost binding when started directly

**Evidence**

`app/src/server.js` uses a fixed port and calls `server.listen(port, ...)` when run as the main module.

**Impact**

In some Node.js/runtime environments, not specifying a host can bind more broadly than intended. For a local-only defensive lab, accidental network exposure should be minimized.

**Recommended Fix**

Bind explicitly to `127.0.0.1` or make the host configurable with a safe local default.

**Validation Test**

- Start the app locally.
- Confirm it listens on `127.0.0.1:3000`.
- Confirm tests still pass.

**Residual Risk**

Localhost binding reduces accidental exposure but does not implement authentication, TLS, or production readiness. The app should remain non-production.

---

### LOW-003: Rate limiting remains documented but not implemented

**Evidence**

The threat model and remediation evidence explicitly document rate limiting as a theoretical local design gap and state that no rate limiting was implemented or validated.

**Impact**

If this demo server is ever run in a shared or exposed environment, lack of request throttling could allow noisy local abuse or resource pressure. Current risk is low because the app is documented as local-only and non-production.

**Recommended Fix**

Keep as documentation-only while the app remains local-only. If the server gains broader exposure, add a minimal in-memory local rate limiter or put it behind an environment-appropriate gateway.

**Validation Test**

- For current local-only scope: confirm documentation continues to state that rate limiting is intentionally deferred.
- If implemented later: add local tests proving request thresholds are enforced.

**Residual Risk**

In-memory rate limiting is not sufficient for distributed or production deployments.

---

### LOW-004: Documentation contains residual status inconsistency around Codex Security usage

**Evidence**

Some documents state Codex Security initial scan evidence exists, while other documents still say Codex Security has not yet been used in this repository.

**Impact**

Documentation inconsistency can reduce audit confidence and make it harder for reviewers to determine the true validation state.

**Recommended Fix**

Normalize status language across evidence files. Suggested canonical wording:

```md
Codex Security initial scan evidence exists for the documented repository state. No automatic remediation was applied, no external target was tested, and the result is not a complete vulnerability absence statement.
```

**Validation Test**

- Search documentation for `Codex Security`.
- Confirm all references use consistent status language.
- Confirm no document overclaims coverage, affiliation, or vulnerability absence.

**Residual Risk**

Even consistent documentation can become stale after future commits. Add documentation review to the release checklist.

---

## Informational Notes

### INFO-001: No third-party dependency surface exists today

**Evidence**

`app/package.json` declares empty `dependencies` and `devDependencies`.

**Impact**

This materially reduces dependency supply-chain risk for the current state.

**Recommended Follow-Up**

Preserve the zero-dependency posture unless a dependency has a clear defensive value.

---

### INFO-002: No strong secret indicators were identified in versioned files

**Evidence**

Static secret-indicator searches were run against versioned files only. No files matched the strong token/private-key patterns used in this review.

**Impact**

No exposed secret finding is raised from this stage.

**Recommended Follow-Up**

Continue avoiding raw logs, account identifiers, local paths, private hostnames, private IPs, tokens, keys, and credentials in public evidence.

---

## Prioritized Remediation Backlog

1. Enable the required `App Tests / test` status check in the GitHub ruleset after human approval.
2. Bind local demo server explicitly to `127.0.0.1`.
3. Normalize Codex Security status language across documentation.
4. Keep rate limiting documented as intentionally deferred unless exposure model changes.
5. Require lockfile if dependencies are added later.

## Safe Next Steps

- Verify in GitHub that `App Tests / test` remains passing on the current pull request.
- After explicit human approval, enable the required `App Tests / test` status check in the GitHub ruleset.
- Keep merge blocked if the required check is missing or failing after enforcement is enabled.
- Propose separate minimal patches for localhost binding and documentation consistency only after the status-check enforcement gate is complete.