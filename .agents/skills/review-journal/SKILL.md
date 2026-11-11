---
name: review-journal
description: Use when the user asks to review their week, a specific day, or a month of daily notes.
---

# Review the journal

`AGENTS.md` is the contract, including "Read first", "Who writes what", "PARA rules", "Source lifecycle", "Content quality", "Page types" and "Every write". Sync first. Use the owner's language, the shared templates and the write protocol: one preview, explicit approval, then write, index and log, one `review-journal: <short description>` commit and push if a remote exists.

## Choose the review

- **Weekly:** Read every pending closed flat day, including late addenda, and the already processed days needed for each finished ISO week. Extract only pending days. For each finished week without a summary, draft `1-Journal/Weekly/YYYY/YYYY-Www.md`, using the ISO week-year. Already processed days inform the summary but are not extracted again. Cover pending days even when their week already has a summary; do not overwrite an existing summary merely because of an addendum.
- **Day:** Process only the requested closed day or days with the same extraction and preview, without a weekly summary. Never process today or a future day.
- **Monthly:** Draft `1-Journal/Monthly/YYYY-MM.md` from the month's weekly summaries and that month's root `log.md` entries. For a week crossing a month boundary, read its daily notes to separate the month's evidence. Cite the days and pages used. Propose wiki changes only for a pattern spanning weeks that no individual weekly summary showed, and name the pattern.

For weekly and monthly summaries use `.agents/templates/summary.md`: What happened, Patterns and observations, Carry-forward, translated into the owner's language, without personas. Cite exact days and pages with footnotes as in rule 5, not unsupported generalisations. Read reflection lines as private notes for Patterns and observations in weekly and monthly summaries; do not turn them into wiki claims unless the owner asks.

## Read, classify and preview

Read the selected days and relevant pages via `index.md`, including project `Decisions.md` and `Log.md`. For each useful claim apply the classification test in `AGENTS.md`: project-only knowledge stays in the project; an insight that generalises is also proposed for an Area or Resources, linked back to the project. Capture decisions with Decision, Why, Rejected alternatives and Source, project events newest first in Log, and dated practice changes under the area's Changes. Cite the exact day for each claim with a footnote as in rule 5; move daily notes whole, never as cards. Flag contradictions and show both sides as the contract requires. Treat hashtags as routing hints and turn them into page links, never copy hashtag text into wiki pages.

For weekly reviews also identify owner documents as defined in `AGENTS.md` "Who writes what". Compare each document's latest Git change with the last root `log.md` entry listing it: propose processing documents created or changed since that entry, including never-processed documents. Use Git history of the document and log to establish the order, not file timestamps. This is an offer to run `process-inbox` on request, not permission to process, move, edit or link the document now.

Present one preview in the owner's language, with each proposed destination and section, its actual claims and exact day citations, contradictions, and the full weekly or monthly summary draft where applicable. Show any proposed changes to owner text. Name the days and addendum paths to move, and any owner documents offered for later processing. Then stop for explicit approval; write only approved items. If any extraction from a day is declined, ask whether to move the day and discard those items, warning they will be lost to future reviews, or keep the day pending and write nothing from it now; never move it while declined items remain unresolved.

## Write and finish

Order: write the pages and summaries -> `index.md`, `log.md`, `questions.md` -> move the days -> pre-commit self-check -> stage -> check what is staged -> commit -> push if there is a remote -> post-commit self-check -> report. Days move last because location is the only record of what was processed: a day moved before its pages exist is lost from pending if the run stops.

Use the appropriate project, decisions, log, area, concept and summary templates under `.agents/templates/`. Use entry-unique footnote labels with definitions directly under each new Decisions or Log entry, preserving old definitions as in rule 5. Cite each day at its final path, including a numbered addendum path when its archived original already exists. Leave archived originals untouched. Move approved days to `1-Journal/Daily/YYYY/MM/` with `git mv`; a day with nothing worth extracting may still be included in an approved summary and moved. Never move or edit today. Update `index.md` and append a root `log.md` entry with operation `review-journal`, sources and every page touched. Complete the commit and report per `AGENTS.md`.

## Self-check

Before staging: all pending closed days are accounted for in weekly mode, and each finished unsummarised ISO week has a draft; on-demand days are not extracted twice. Monthly evidence is limited to its month and any new wiki pattern spans weeks. Preview and approval preceded all writes; only approved changes were made, with no unpreviewed substantive claim, example, procedure, number or recommendation. A day with declined extractions was either explicitly approved for moving after warning of their loss, or kept pending with nothing written from it. Each footnote's source and section support its attached claim; append-only entries have unique local definitions and old definitions remain untouched. Each claim cites its final day path, decisions retain reasons and alternatives, area changes are dated, promotion has a project return link, and hashtags are absent from wiki text. Today and archived originals are untouched; addenda are numbered without collision. Owner documents were only offered for `process-inbox`, never edited or moved. Summary sections, sources, links, index and log follow the contract. Check staged paths exactly match the operation.

After committing: verify one attribution-free operation commit and the push result, and report only what the commit contains, what was left out and why, and the next step.
