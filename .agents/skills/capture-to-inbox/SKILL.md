---
name: capture-to-inbox
description: Use when the user asks to save, capture or send a conversation, note, decision or artifact to their second brain (the ParaBrain vault Inbox), from any project or thread.
---

# Capture to the second brain Inbox

Write one new file into the vault's `2-Inbox/`. Do not process it: `process-inbox` in the vault compiles it later, with the owner's approval.

## Vault path

The vault is at: `<VAULT_PATH>`

The owner sets this path at installation (README, "Setup: local"). If it still reads `<VAULT_PATH>`, or the folder has no `2-Inbox/`, stop and ask the owner to finish the installation. Never guess the path.

## Rules

- Write only a new file, flat in `2-Inbox/`. Never read, edit, move or delete anything else in the vault, except `8-System/about.md`, which you may read for the writing style.
- Never stage, commit or push. The next vault operation commits the file as `sync: human edits`.
- The owner's request is the approval: write without a preview, unless the owner asks to see it first.
- Never overwrite. If the name exists, add ` (2)`, ` (3)` and so on.
- Leave out secrets, tokens, passwords and credentials, even when they appeared in the conversation.
- Write in the language of the conversation, in the writing style from `8-System/about.md` when it has one.

## File

Name: `<Readable title>.md`, the topic as the owner would name it, not "Conversation summary".

Frontmatter:

```yaml
captured: YYYY-MM-DD                  # from the system clock
captured_by: "<model> via <client>"   # the model and the app or bot that wrote the capture
origin: "<project, thread title or link>"
kind: conversation                    # conversation | artifact | note
derived_from_vault: false             # true when the content came from vault pages, e.g. an ask-brain answer
urls: []                              # original web addresses mentioned, if any
```

Body:

- `## Context` - one or two sentences: what the conversation was about and why.
- `## Content` - compile, do not summarise: claims, decisions with their reasons and rejected alternatives, numbers, examples, caveats. Mark the owner's views as the owner's and the agent's suggestions as the agent's.
- `## Open questions` - what stayed unresolved.
- `## Artifacts` - code, lists, prompts and links, verbatim. Omit the section when there are none.

## Report

Give the path of the written file and one line on what it holds.

## Self-check

- The vault path was set, and exactly one new file was written, flat in `2-Inbox/`; no existing file was overwritten and nothing else in the vault changed.
- Nothing was staged, committed or pushed.
- The frontmatter has all six keys with real values, and `captured` comes from the system clock.
- `derived_from_vault` is `true` whenever the content repeats vault pages.
- No secret, token, password or credential is in the file.
- Decisions keep their reasons and rejected alternatives; the owner's views and the agent's suggestions are marked as such.
- The report gives the path of the written file.
