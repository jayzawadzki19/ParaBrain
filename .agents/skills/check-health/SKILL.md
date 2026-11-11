---
name: check-health
description: Use when the user asks to check the health of the vault, audit its wiki or find problems in it.
---

# Check health

`AGENTS.md` is the contract, including Read first, Who writes what, Content quality, Page types and Every write. Sync first, even for a report. Use the owner's language and the system clock. Read the whole vault for this audit, including index, wiki pages, project logs, sources and pending files; read limits before expressing certainty. Do not treat unprocessed material as established wiki knowledge.

## Audit and report

Rank findings by potential harm to answers, not by ease of repair. Give the specific paths, claims or links and evidence for each finding, explain uncertainty, and report all findings in chat only:

1. Compare related pages and sources for unflagged contradictions; quote both claims and cite their locations. Accept rule 5 conversation footnotes as provenance for the owner's own statements without a file in `sources:`; do not report those statements as uncited, but report external facts supported only by a conversation as uncited. Find factual claims without a supporting footnote or link. Report footnote references without definitions, unused definitions, broken links in definitions, and cited sections missing from source cards; a source card is a valid raw file. For each page with only one real source, compare broad or absolute rules with that source and explicitly report any overgeneralisation, even when it also contradicts another page. Distinguish a possible contradiction from a proven one.
2. Check missing raw files referenced in `sources:` and citations, broken wiki links, and wiki citations to flat pending Daily or Inbox paths that will break on processing. Resolve name-only links as Obsidian does, and check full paths and aliases. Do not report broken links in historical root `log.md` entries or propose rewriting that history.
3. Find stale or `needs_update` pages, missing concept or entity pages, orphan pages and missing reciprocal wiki links, and index drift (missing pages, deleted targets, wrong sections or descriptions). For orphan detection count incoming links from other wiki pages independently of index entries and outgoing source citations; explicitly name each page with none as an orphan. A project has only its overview in the index; archived project overviews remain under Projects with an archive-date prefix. An index link may use `[[full/path|Name]]`. Missing `linear:` is not a defect.
4. Check agent-authored page frontmatter, required sections and templates against the contract. Concept and entity pages require `urls:`, including an empty list. `index.md`, `log.md` and `questions.md` keep their English headings in every vault language; that is not a language finding. Count closed dates lying flat in Daily, excluding today and future dates; report a backlog if more than 14 await review. Cosmetic findings come last.

Identify owner documents by the contract, including untyped pages. Do not check their templates, sections or frontmatter, propose edits to them, or report a missing return link to one. Check that each owner document named in a `process-inbox` root log entry is listed under My documents in the index. Do not infer processing merely from its presence. Exclude project Decisions and Log from owner documents and index page counts as specified by the contract.

Report only, without writing a report file, log entry, index or other operation changes, and without an operation commit. The initial sync is still required if there are human changes. Offer repairs without applying them. Never invent a replacement target or evidence: ask when the intended repair is unclear.

## Repair on request

Limit the repair to what the owner requests and approves. Preview exact changes and destinations, including the root log and any needed index update; wait for explicit approval. Do not edit owner documents, raw sources, pending files or historical root log entries. Re-read each file immediately before changing it. Follow the full write protocol in `AGENTS.md`; log the repair as `update` and commit as `update: <short description>`. Push if a remote exists and report the result.

Order: sync -> inspect -> ranked chat report -> requested repair preview -> explicit approval -> write approved repair -> update index if needed and append root log -> pre-commit self-check -> stage explicit paths -> check staged paths -> one update commit -> push if a remote exists -> post-commit self-check -> report.

## Self-check

Before reporting: inspected all relevant content and ranked contradictions and uncited claims above orphan and index drift; checked each category and exceptions; gave evidence and uncertainty; wrote no operation files. Before staging a repair: only approved changes, each footnote's source and section support its attached claim, no protected content changed, index and update log correct, staged paths exact. After committing: verify one attribution-free update commit and push result; report what changed, what was left out and why, and next step.
