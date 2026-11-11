---
name: manage-project
description: Use when the user starts, updates or finishes a project.
---

# Manage a project

`AGENTS.md` is the contract, including "Read first", "Who writes what", "PARA rules", "Linear", "Content quality", "Page types" and "Every write". Sync first. Use the owner's language and shared templates. For every mode show one preview, obtain explicit approval, write only approved changes, update the index and root log, make one `manage-project: <short description>` commit and push if a remote exists. Never call Linear or copy task lists or progress statuses into the vault.

## Start

Ask a short interview for the goal, for whom, and an observable definition of done. Accept an optional Linear project URL; do not require one. Choose a readable project title and preview the folder and all three files, their contents and the index and log changes. Use `.agents/templates/project.md`, `.agents/templates/decisions.md` and `.agents/templates/log.md`, translating headings as the contract requires. Set `linear:` to the supplied URL, or leave it empty when none was given. Cite the owner's conversational statements in the overview using rule 5 conversation footnotes and no file in `sources:`. Initialise the project overview and the two logs without inventing decisions or events. Do not create task lists or a progress-status field; the template's `status: draft` is the page review status.

Order: interview -> preview -> approval -> write `3-Projects/<Project>/<Project>.md`, `Decisions.md` and `Log.md` -> update `index.md` and root `log.md` -> pre-commit self-check -> stage -> check staged paths -> commit -> push if there is a remote -> post-commit self-check -> report.

## Update

Identify the project through `index.md` and read its overview, `Decisions.md` and `Log.md`. Preview the actual proposed entries and overview change. Append each decision to Decisions with Decision, Why, Rejected alternatives and Source; record an explicitly displaced option as a rejected alternative and its stated reason; do not invent alternatives or a raw source. Translate entry labels as well as headings into the owner's language. Add events newest first to Log with What changed, Why, Next and Source; omit unknown details or say they were not supplied. Use rule 5 footnotes for raw sources and owner statements in conversation; each new Decisions or Log entry has unique labels and definitions directly under it, without moving or renumbering old definitions. Refresh the overview's one-line Current state from the log. Apply the classification test and offer promotion of general insights to Resources or an Area, retaining the project's record and linking both ways as the contract requires. Include any such pages in the same preview and write only what is approved.

Order: read and classify -> preview -> approval -> write project pages and approved promotions -> update `index.md` and root `log.md` -> pre-commit self-check -> stage -> check staged paths -> commit -> push if there is a remote -> post-commit self-check -> report.

## Archive

Identify the finished project and inspect the whole folder and links to it. Preview the destination, any page edits and link fixes, and name every owner document that will move with the folder. Do not edit owner documents or add links to them. Move the whole project folder to `6-Archive/<Project>/` with `git mv`, preserving its contents, including owner documents. Preview and fix full-path links to the old location, including links to moved owner documents, in mutable wiki pages and My documents lines in `index.md` (name-only links keep resolving); never edit owner documents to fix links. In `index.md` the overview's line stays in the Projects section, because index sections follow page type and an archived overview is still `type: project`; start its description with the archive date in the owner's language (for example `zarchiwizowany 2026-12-29:`) and add no new section. Never rewrite past entries in the root `log.md` or the project logs, even when the move breaks a path link in them: the history records where pages were then, and this operation's log entry names the old and new folder. If a destination already exists, resolve the collision with the owner before writing.

Order: inspect -> preview -> approval -> `git mv` the whole folder and the approved page edits and link fixes, in any order -> update `index.md` and root `log.md` -> pre-commit self-check -> stage (the new path of any moved file you edited) -> check staged paths -> commit -> push if there is a remote -> post-commit self-check -> report.

## Self-check

Before staging: preview and approval preceded writes; only approved changes were made. Start has all three templates, the supplied or empty `linear:`, and no task list or progress-status field. Updates preserve append-only decisions, give reasons and truthful sources, put events newest first, refresh Current state and offer applicable promotion. Archive moves the whole folder, preserves owner documents unedited, adds no links to them, fixes previewed full-path links in wiki pages and My documents index lines, keeps the overview under Projects with the archive date, and leaves past log entries unchanged. Each footnote's source and section support its attached claim, and new log entries have unique local definitions without changing old ones. Links, index and root log follow the contract; the operation is `manage-project` and the log names every page touched. Check staged paths exactly match the operation.

After committing: verify one attribution-free operation commit and the push result; report what the commit contains, what was left out and why, and the next step.
