# GitHub Rulesets Setup

## Purpose

This guide defines the conservative GitHub branch ruleset for this public sanitized defensive portfolio lab.

The goal is to protect the default branch without claiming external review, CI coverage, GitHub endorsement, OpenAI affiliation, Daybreak access, Trusted Access for Cyber acceptance, or any security guarantee.

## Recommended Ruleset

Ruleset name:

```text
protect-main-defensive-lab
```

Primary target:

```text
default branch
```

Fallback target when GitHub does not show a default-branch selector:

```text
main
```

Initial enforcement status:

```text
Disabled
```

Final enforcement status after local review:

```text
Active
```

If GitHub offers an evaluation mode, use it before switching to active enforcement.

## O que fazer agora na tela da imagem

Use esta ordem na tela `Rulesets / New branch ruleset`:

1. Preencha `Ruleset Name` com `protect-main-defensive-lab`.
2. Mantenha `Enforcement status` como `Disabled` enquanto configura.
3. Deixe `Bypass list` vazio.
4. Em `Target branches`, clique em `Add target`.
5. Escolha `Include default branch`.
6. Se `Include default branch` nao aparecer, escolha `Include by pattern` e use `main`.
7. Role ate as regras de branch.
8. Ative apenas as protecoes minimas descritas neste guia.
9. Nao ative status checks obrigatorios enquanto nao existir CI configurado no GitHub.
10. Revise a tela inteira antes de salvar.
11. Salve inicialmente em `Disabled` ou modo de avaliacao, se disponivel.
12. Mude para `Active` somente depois de confirmar que a regra mira a branch correta.

## Minimum Protections

Enable these protections for the default branch:

- require a pull request before merging;
- require at least one approval before merging;
- dismiss stale pull request approvals when new commits are pushed, if available;
- require conversation resolution before merging, if available;
- block force pushes;
- block branch deletion.

These controls preserve a human review gate without inventing a CI or external validation process that does not exist yet.

## Bypass List

Do not add users, teams, apps, deploy keys, or roles to the bypass list for the initial ruleset.

Reason:

- this is a small public defensive lab;
- the purpose is to prove review discipline;
- bypass entries weaken the evidence value of the ruleset;
- there is no documented operational need for bypass access in the current repository state.

If a bypass is ever needed, document it in the human approval log before enabling it.

## Target Branches

Preferred target:

```text
Include default branch
```

Fallback target:

```text
Include by pattern: main
```

Do not target every branch for this initial setup. The control objective is to protect the publication branch first, then expand only if the repository workflow requires it.

## Required Status Checks

Required status checks may now be enabled only after explicit human approval.

Reason:

- the repository has local tests;
- GitHub CI has now been configured with the `App Tests` workflow;
- the `App Tests / test (pull_request)` check has executed successfully on PR #2;
- requiring the exact observed check can add merge-time assurance;
- changing ruleset enforcement still requires a separate human approval step.

If approved, require this exact status check:

```text
App Tests / test (pull_request)
```

Do not require any additional status checks unless they have first run successfully on GitHub and are separately approved.

## Recommended Future CI Gate

The current minimum CI gate runs:

```text
npm test
```

The command runs from the app/ working directory in the GitHub Actions workflow.

## Review Before Activating

Before changing enforcement to `Active`, confirm:

- the ruleset name is `protect-main-defensive-lab`;
- the target is only the default branch or the `main` branch pattern;
- the bypass list is empty;
- pull request review is required;
- force pushes are blocked;
- branch deletion is blocked;
- required status checks use only the observed `App Tests / test (pull_request)` check;
- no external scan or affiliation claim was added to the repository documentation.

## Safe Configuration Summary

Use this compact configuration when reviewing the screen:

```text
Ruleset Name: protect-main-defensive-lab
Enforcement status while configuring: Disabled
Bypass list: empty
Target branches: Include default branch
Fallback target: Include by pattern -> main
Required PR review: enabled
Required approvals: 1
Block force pushes: enabled
Block deletion: enabled
Required status checks: App Tests / test (pull_request), after CI exists and has passed
```

## What This Ruleset Does Not Claim

This ruleset does not claim:

- that vulnerabilities do not exist;
- that external scanning was performed;
- that GitHub CI is configured;
- that a pull request was opened by any external scanner;
- that an automatic fix was applied;
- that the repository is affiliated with OpenAI, Daybreak, or Trusted Access for Cyber;
- that the branch protection replaces human review.

## Evidence Boundary

The ruleset is a repository hygiene control. It should be described as a branch protection step, not as security validation.

Security and remediation evidence remain limited to the sanitized documentation already present in this repository.

## Next Documentation Update

After the ruleset is created in GitHub, update the human approval log with a concise sanitized entry that records:

- branch ruleset created;
- default branch targeted;
- bypass list left empty;
- PR review required;
- required status check enabled only after the matching GitHub Actions check passed;
- no external scan or affiliation claim added.
