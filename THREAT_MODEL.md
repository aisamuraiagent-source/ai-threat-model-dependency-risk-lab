# Threat Model

## System Overview

This lab contains a local demo Node.js application used only for defensive review.

## Assets

- application source code;
- dependency manifest;
- input handling logic;
- authorization placeholder logic;
- validation evidence;
- public sanitized documentation.

## Trust Boundaries

1. User-provided input enters the application.
2. Application logic processes request data.
3. Authorization placeholder checks demo request metadata.
4. Server returns a local response.
5. Evidence is documented in sanitized Markdown files.

## Threat Categories

### Input Handling Risk

User-controlled input may be accepted without strong validation.

### Authorization Logic Risk

Demo authorization logic may rely on request-controlled metadata.

### Security Header Risk

The application may not define explicit defensive HTTP headers.

### Rate Limit Risk

The application does not currently include rate limiting. This is documented as a theoretical local design gap only.

### Dependency Risk

The dependency manifest must be reviewed for unnecessary, outdated, vulnerable, or excessive packages.

## Out of Scope

- exploitation;
- payload testing against third parties;
- network scanning;
- credential attacks;
- malware;
- persistence;
- evasion;
- external targets.

## Defensive Goal

Reduce preventable risk through scoped remediation, human approval, and local validation.
