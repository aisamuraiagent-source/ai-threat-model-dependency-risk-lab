# Case Study

## Summary

This lab documents a local-first defensive AI workflow for threat modeling, dependency risk review, remediation planning, patch validation, and audit-ready reporting.

## Objective

Build a public sanitized portfolio artifact showing how AI-assisted defensive workflows can remain scoped, reviewed, validated, and human-approved.

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

1. Establish controlled baseline.
2. Create repository-specific threat model.
3. Review dependency surface.
4. Identify defensive findings.
5. Define remediation plan.
6. Require human approval.
7. Apply scoped patch.
8. Validate patch locally.
9. Publish sanitized evidence.

## Current Result

Baseline scaffold created. No remediation has been applied yet.
