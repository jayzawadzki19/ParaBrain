---
name: ask-brain
description: Use when the user asks the vault a question or wants to find something in it.
---

# Ask the brain

`AGENTS.md` is the contract, including "Read first", "Who writes what", "Source lifecycle", "Content quality", "Page types" and "Every write". Sync first even for a read-only answer. Use the owner's language and check today's date from the system clock.

## Read and answer

Read `index.md` first to select relevant pages, then read those pages and any relevant project `Decisions.md` and `Log.md`. For a substantive question about a practice, follow its area page links to the relevant concept pages and include a short relevant explanation with a citation to each used concept, even if dated practice details are uncertain. Also inspect pending flat closed Daily notes and Inbox files for relevant recent information; do not move or edit them. Read `8-System/limits.md` before stating certainty. Answer the question with citations to the relevant wiki pages, including relevant area and concept pages when both inform the answer and distinguish information from unprocessed notes, citing their current paths and explicitly labelling it unprocessed. Explain gaps, uncertainty and contradictions without inventing facts.

Read relevant owner documents as defined in `AGENTS.md` as the owner's own views, not sourced facts. Label them as "your view in <document>" in the owner's language. Never edit them; cite or link them only where the contract permits.

A one-line lookup, such as a project's Linear URL, gets a one-line answer and no offer or operation write. Never call Linear. For a substantive answer, finish with one offer that bundles any useful new synthesis and gaps. In that same answer give a complete, approval-ready preview of the actual proposed text, destination, section and real citations, not an offer to prepare a preview later. Include exact `questions.md` lines for gaps in the format required by `AGENTS.md`. File project-specific synthesis in the project folder and other synthesis in Resources or Areas, using the classification test and templates. Use rule 5 conversation footnotes for filed synthesis of the owner's own statements, without a file in `sources:`, and other footnotes for their sources; follow the contract's source and reciprocal-link rules; do not link owner documents from synthesis unless the contract permits it. File nothing that rests on a pending Daily or Inbox file: it has no final path to cite yet, and `review-journal` or `process-inbox` would extract it a second time. Use it in the answer only, and instead offer to run that skill. If nothing is worth filing and no gap exists, say so without proposing a write.

## Write and finish

Order: sync -> read and answer with one preview and offer -> explicit approval -> write only approved synthesis and gaps -> update `index.md` if needed and append `log.md` -> pre-commit self-check -> stage explicit paths -> check staged paths -> one `ask-brain: <short description>` commit -> push if there is a remote -> post-commit self-check -> report.

Until explicit approval, write nothing beyond the initial sync, including `questions.md` and `log.md`. If declined, make no operation changes or commit. If approval is partial, write only the approved items; if ambiguous, ask. Re-read each page before changing it. Add approved gaps to `questions.md` as `- [ ] question - where it came from (link) - date`, with a real link and today's date, exactly as previewed. Append the `ask-brain` operation to the root log with sources and every page touched. Follow the contract for index entries, citations, links, staging and push. Leave pending source files where they are.

## Self-check

Before replying: relevant wiki pages and pending sources were checked; claims have citations whose sources and sections support them, pending information is labelled unprocessed, owner views are labelled, and gaps are named. A one-line lookup has no offer. For a substantive answer the single offer previews the content and destinations; no operation files were changed before approval.

Before staging: only approved items were written; nothing written cites or rests on a pending Daily or Inbox file; gaps have the exact format and sources, synthesis follows the contract and each footnote's source and section support its attached claim, owner documents and pending sources are untouched, and the index and `ask-brain` log reflect the changes. Check staged paths exactly match the operation.

After committing: verify one attribution-free operation commit and the push result; report what was written, what was left out and why, and the next step.
