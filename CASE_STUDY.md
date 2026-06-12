# Case Study

## Summary

This lab documents a controlled public baseline scaffold for a local-first defensive AI workflow. Codex CLI was used after scaffold creation to produce a defensive baseline review artifact. Remediation planning, approved patch implementation, local validation, and sanitized reporting have been completed for the documented scope.

## Objective

Build a public sanitized portfolio artifact showing how defensive AI-assisted review workflows can remain scoped, reviewed, validated, and human-approved.

## Repository Under Review

Repository: ai-threat-model-dependency-risk-lab  
Mode: local defensive lab  
External targets: not in scope  
Raw local data: not published  

## Baseline

The baseline contains a small demo application with deliberately simple defensive review targets:

- weak input handling;
- missing security headers;
- theoretical rate-limit gap;
- placeholder-based authorization logic;
- dependency surface review.

No real credentials, external systems, private IPs, hostnames, usernames, tokens, or raw logs are included.

## Method

1. Establish controlled public baseline scaffold.
2. Run Codex-assisted defensive baseline review after scaffold creation.
3. Create repository-specific threat model.
4. Review dependency surface.
5. Identify defensive findings.
6. Define remediation plan.
7. Require human approval.
8. Apply scoped patch.
9. Validate patch locally.
10. Publish sanitized evidence.

## Current Result

Initial controlled public baseline scaffold created. Codex-assisted defensive baseline review documented. Remediation proposal completed. Approved defensive patch applied. Post-patch validation completed.

Codex Security initial scan completed for the repository state reviewed by the scan. Seven commits were verified, a repository-specific threat model was generated, and no discoveries surfaced yet.

The main remaining issue identified was documentation integrity inconsistency: older documentation still described remediation and Codex Security usage as pending after those phases had been completed. This case study has been corrected to reflect the current sanitized evidence state.
