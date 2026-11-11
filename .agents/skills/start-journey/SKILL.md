---
name: start-journey
description: Use when the vault has no 8-System/about.md or the user wants to set up or refresh their profile or areas.
---

# Start journey

`AGENTS.md` is the contract, including Read first, Who writes what, Page types and Every write. Sync first, read `index.md` and use the system clock. When `8-System/about.md` is missing, this skill creates it instead of guessing a profile. Read `references/about.md` and `references/questions.md`. Use the owner's language for conversation and vault content, translating template headings. Do not invent practices, standards or personal details.

## Set up

Offer an interview or a pasted assessment, or both. Extract only information useful to working with the owner, not the full assessment. Ask the follow-up questions in `references/questions.md`, including the owner's Areas, writing style and grammatical gender preferences. Accept answers already given; ask only for missing information. An owner may skip a question: record only what they provided.

Inspect existing folders and index. Translate the headings and prompts in `8-System/templates/Daily.md` into the owner's language during setup and preview the complete translated template like any other file. Show the complete proposed profile, each area overview and its destination, missing skeleton folders, and the index and log changes. Use `references/about.md` for the profile and `.agents/templates/area.md` for each `4-Areas/<Area>/<Area>.md`, with today's dates, `status: draft` and `sources: []` for conversation. Cite the owner's conversation statements on area pages with rule 5 footnotes; `about.md` is not a typed page and needs none. Fill sections only with supplied information; say when none was supplied. Create missing skeleton folders from the folder map in `AGENTS.md` without overwriting existing content. Empty directories need no placeholder files.

## Refresh

Read the profile and relevant area pages. Ask what changed if the request does not say. Propose only the requested delta: add new areas using the area template, update profile lines only when a profile change is requested, and offer to archive removed areas. An area-only request changes only the Areas section of `8-System/about.md`, so that it lists the current areas: other skills link only areas the profile names, and a stale list would send them to an archived one. Do not repeat the interview or recreate existing areas.

For removal, inspect the whole `4-Areas/<Area>/` folder and links. Preview moving it whole to `6-Archive/<Area>/`, naming owner documents that move with it. Treat an area folder like a project folder: owner documents move with it unedited, never individually. Preview and fix affected full-path links in mutable wiki pages and My documents lines in `index.md`, including links to moved owner documents; never edit owner documents; name-only links still resolve. Keep the overview's index line under Areas, as `manage-project` does for projects: `[[Area]] - archived YYYY-MM-DD: description`, with the prefix in the owner's language, after the link. Leave historical log entries unchanged. Resolve a destination collision with the owner before writing.

## Apply

Show the exact proposed text for every new or changed page, index line and log entry, not a summary of what they will say. Show destinations for all changes, including archive moves and link fixes. Wait for explicit approval; if approval is partial, apply only the approved parts. Re-read each page immediately before rewriting it. Follow the contract's write protocol, including `git mv` for a whole folder, explicit staging and staged-path inspection. Append a root log entry in the required format with operation `start-journey`, conversation as the source when applicable, and every page touched. Commit once as `start-journey: <short description>` without attribution; push if a remote exists and report the result. Tell the owner what changed, what was left out and why, and the next step. Mention that `8-System/templates/My document.md` is the Obsidian template for their own documents.

Order: sync -> inspect and interview or assessment -> preview -> explicit approval -> write approved changes -> update index and root log -> pre-commit self-check -> stage explicit paths -> check staged paths -> one commit -> push if a remote exists -> post-commit self-check -> report.

## Self-check

Before staging: no operation writes preceded approval; only approved changes were made; profile and area headings use the owner's language and contain no invented details; new areas use the template; reruns change only the requested delta, and the profile's Areas section matches the current areas; archived areas move whole with owner documents unedited, previewed wiki links, My documents lines and Areas index updated, history preserved. Each footnote's source and section support its attached claim. The index and `start-journey` log name the changes and staged paths are exact. After committing: verify one attribution-free operation commit and push result; report changes, omissions and next step.
