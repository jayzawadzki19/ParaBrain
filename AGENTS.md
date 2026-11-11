# ParaBrain - agent instructions

This is a personal second brain: an Obsidian vault organised by PARA that you maintain for its owner. The owner captures notes and clippings quickly, often on a phone. You compile them into a structured, interlinked wiki. The owner reads, questions and corrects that wiki, so what you write must be worth reading and safe to trust.

These instructions apply to every operation. The skills in `.agents/skills/` add the procedure for each operation; they do not replace this file.

## Read first

1. Read this file.
2. Read `8-System/about.md`: who the owner is, their language, their areas, how they like answers. If it is missing, tell the owner and offer to run `start-journey`; do not guess a profile.
3. Read `index.md` before any query and before any write. It is the map of the wiki. Use it to choose which wiki pages to open instead of reading the whole wiki. Beyond those pages, read whatever else the operation needs: pending Inbox and Daily files, raw sources, and project `Log.md` and `Decisions.md`.
4. Read `8-System/limits.md` before you tell the owner the vault is certain about something. It lists where this method breaks, and a tidy page is not evidence that a claim is true.
5. Check today's date from the system clock rather than assuming it. Several rules depend on what "today" is.

## Folders

```
AGENTS.md, CLAUDE.md        this contract (CLAUDE.md only imports AGENTS.md)
index.md                    map of every wiki page, one line each
log.md                      append-only log of operations
questions.md                running list of knowledge gaps
1-Journal/
  Daily/YYYY-MM-DD.md       daily notes not yet processed, flat
  Daily/YYYY/MM/            processed daily notes (immutable)
  Weekly/YYYY/YYYY-Www.md   weekly summaries, one folder per year
  Monthly/YYYY-MM.md        monthly summaries
2-Inbox/                    pasted and clipped material not yet processed, flat
3-Projects/<Project>/       one folder per project
  <Project>.md              project overview
  Decisions.md              append-only decisions with reasons
  Log.md                    what happened in the project, newest first
  (further pages)           knowledge that only matters to this project
4-Areas/<Area>/             one folder per ongoing responsibility
  <Area>.md                 area overview
  (further pages)
5-Resources/                concept and entity pages, and the owner's documents
  <Topic>/                  topic subfolder once a topic has 3 or more pages
6-Archive/                  finished projects (moved whole) and inactive areas
7-Raw/sources/              source cards for URL clips, full copies otherwise (immutable)
7-Raw/assets/               images and attachments (never renamed)
8-System/
  about.md                  owner profile
  limits.md                 where the method breaks
  templates/Daily.md        Obsidian daily note template
  templates/My document.md  Obsidian template for the owner's own documents
.agents/skills/             all skills
.agents/templates/          page templates (see Page types)
.claude/skills              symlink to ../.agents/skills
.obsidian/                  shipped Obsidian configuration
```

- Name vault files and folders as readable titles (`Zdrowie i sport.md`), not kebab-case: Obsidian shows the file name as the page title. Files inside dot-folders are kebab-case.
- The root `log.md` is the log of operations on the vault. `3-Projects/<Project>/Log.md` is one project's own log. Do not mix them up.
- Create a topic subfolder in `5-Resources/` when a topic reaches 3 pages, never for one or two. Folders created too early scatter pages that belong together.

## Who writes what

- The owner writes `1-Journal/Daily/` and `2-Inbox/`. You read them; you never edit their content.
- The owner also writes their own documents (articles, essays, views on a topic). A page with `type: my-document` is one. So is any other Markdown page in `3-Projects/`, `4-Areas/`, `5-Resources/` or `6-Archive/` that has none of your page types (`project`, `area`, `concept`, `entity`, `summary`), except a project's `Decisions.md` and `Log.md`: a document with no frontmatter is safe. Never edit its content or move it on its own; it moves unedited only with its whole project or area folder when that folder is archived. Add no link to it for the sake of a return link (rule 7 exempts it). Process it only when the owner asks (`process-inbox`), and list it in `index.md` under "My documents" when you do; it is a source of the owner's views, not of facts. Do not cite or link it otherwise.
- You write everything else: wiki pages, `1-Journal/Weekly/`, `1-Journal/Monthly/`, `index.md`, `log.md`, `questions.md`, `8-System/about.md` (from what the owner tells you).
- You write URL source cards in `7-Raw/sources/`, move other source files there and move daily notes into `1-Journal/Daily/YYYY/MM/`, and archive whole project or area folders as described above. Never edit, rename or delete a source file there afterwards: wiki pages cite these files, and the citations break if they change.
- The owner may edit any page in Obsidian, not only frontmatter. Setting `status: reviewed` is one such edit.
- Before rewriting a page, re-read it from disk. The owner may have changed it since you last saw it, and the sync service may have brought in a change from the phone.
- Never remove or reword text the owner wrote without showing the change in the preview. Silent rewrites are how the owner stops trusting the vault.

## PARA rules

- **Projects** have an end state. One folder is one Linear project.
- **Areas** are ongoing responsibilities with no end date. An area page holds current practice, standards, dated changes, and links to the Resources knowledge it applies.
- **Resources** hold reusable topic knowledge as concept and entity pages. Concept pages carry the argument. Entity pages (person, company, tool, product) are short hubs that point to concepts. An entity gets a page when it appears in 2 or more sources or is central to one; a name mentioned once in passing gets a citation, not a page, because one page per name produces dozens of orphans.
- **Archive** receives finished projects, moved whole, and inactive areas.
- **Classification test:** "Would this still be useful if the project were cancelled tomorrow?" Yes: Areas or Resources. No: the project. Ask the owner only when the answer is unclear, and then ask one question.
- **Promotion:** when an insight from a project generalises, keep it in the project and also propose it for Resources (if it is about a topic) or an Area (if it is about how the owner operates there), linking back to the project. The project keeps its own complete record, and the general page gets the reusable part.
- Cross-cutting themes are concept pages in Resources. Do not use tags.

## Linear

- Tasks and statuses live only in Linear. Never copy them into the vault, and never add a progress-status field to a project overview.
- The vault holds what Linear does not: goal, audience, definition of done, decisions with reasons, project knowledge, and a log of what happened.
- The `linear:` field in a project overview holds the URL of the Linear project. It is optional: the vault works without Linear, and a missing link is not a defect.
- Skills never call Linear. Record what the owner tells you. Reading Linear is the job of a separate tool.

## Source lifecycle

- **Pending** means every closed day lying flat in `1-Journal/Daily/` (its date is before today) and every file in `2-Inbox/`. Today's daily note is never processed or moved, because the owner is still writing it.
- When an operation succeeds and the owner approved it, the processed files move: daily notes move whole to `1-Journal/Daily/YYYY/MM/`; Inbox items without a URL move whole to `7-Raw/sources/`, while URL clips become source cards there and their Inbox files are removed after pages and card are written. Images need no move: Obsidian saves attachments directly into `7-Raw/assets/`, and existing assets stay where they are. The owner's documents are not moved by source processing: they stay editable where the owner put them, so a citation of one can drift (`8-System/limits.md`). Location is the only record of what has been processed; there is no manifest, and Git is not used to detect pending content.
- A source moves or its Inbox file is removed only after the pages built from it are written. A URL source card contains only frontmatter (title, author, published, clipped, url, kind of source) and short verbatim excerpts of at most a few sentences under a heading for each cited source section. If more is needed later, re-read the URL or Git history, never edit the card. An item for which no page was approved stays where it is.
- Raw is immutable: do not edit, rename or delete anything in `7-Raw/` or `1-Journal/Daily/YYYY/MM/` after the move. Never rename an asset, because embeds in other pages would break.
- **Late edits.** Obsidian's calendar recreates a processed day as a flat file (`1-Journal/Daily/2026-10-30.md`) because it does not know about the subfolders. When a closed day lying flat already has a processed counterpart, treat the flat file as an addendum: process it like any pending day and store it as `1-Journal/Daily/2026/10/2026-10-30 (addendum 1).md`, numbering further addenda 2, 3 and so on. Leave the original file untouched.
- `#hashtags` in daily notes are hints about where something belongs. Turn them into links to the right page and do not copy them into wiki pages.
- Weekly summaries use ISO weeks and the ISO week-year (`1-Journal/Weekly/2026/2026-W44.md`); the week-year can differ from the calendar year around 1 January. Monthly summaries are `YYYY-MM`.

## Every write

Step 1 applies to every operation, including one that only reads and answers. Steps 2 to 7 apply to every operation that changes the vault; an operation that writes nothing stops after step 1.

1. **Sync first (every operation).** Run `git status`. Commit any change you did not make (the owner's edits, new captures) as its own commit with the message `sync: human edits`, staging those paths explicitly. This puts the owner's work in history before you touch anything, and keeps it out of your operation's commit. If there is nothing to commit, go on.
2. **Preview.** Show what you would write: for each item, what it says and where it goes (see content quality rule 8). Write nothing yet.
3. **Explicit approval.** Wait for the owner to say yes. If they approve part of the preview, write only that part. If their reply is ambiguous, ask again rather than write. Elaboration that changes no approved meaning is allowed; show and obtain approval for any substantive claim, example, procedure, number or recommendation absent from the preview before writing it.
4. **Write.** Re-read each page from disk immediately before you rewrite it.
5. **Update `index.md` and `log.md`.**
   - `index.md`: one line per page, `[[Page]] - what it holds`, under the section for its type (Projects, Areas, Concepts, Entities, Summaries; the owner's documents under My documents). Keep each line to one line. For a project, list only its overview. Add new pages and refresh the lines of pages whose subject changed.
   - `log.md`: append one entry at the bottom: `## [YYYY-MM-DD] operation | sources | pages touched`. `operation` is the name of the skill that ran. A repair applied after `check-health` is logged as `update`. `sources` lists the raw files used. `pages touched` lists every page you created or changed, not only the main one.
   - `questions.md`: add each gap you found as `- [ ] question - where it came from (link) - date`.
6. **One commit, explicit paths.** Move files with `git mv <old> <new>`: it stages both paths, so never name the old path of a move in `git add` (it no longer exists and the command fails). Stage everything else with `git add -- <path> <path> ...`, naming each file you wrote or deleted, and the new path of a moved file you also edited. Never use `git add .` or `git add -A`: a change from the owner may have arrived while you worked, and it must not enter your commit. Run staging and the commit as separate commands. Before committing, check that `git diff --cached --name-status` lists exactly the paths you expect and nothing else; if a staging command failed, fix it and re-check, and never commit after a failure. Make one commit. Its message starts with the skill name followed by a short description. It has no `Co-Authored-By` line or any other attribution trailer: the vault history is the owner's.
7. **Push if there is a remote.** If `git remote` lists one, push. If there is none, say so in your report and finish; a missing remote is not a failure. Never force-push. If a push is rejected, report it and stop.

Finish by telling the owner what you wrote, what you left out and why, and what the next step is.

## Content quality

This section decides whether the vault is worth having. The failure to avoid is the thin page: a short, tidy summary that restates what a source is about and could be replaced by reading the first paragraph. A good page lets the owner use an idea without opening the source. Hold every page you write or change to these rules.

Thin, for contrast: "The article discusses spaced repetition and explains why it helps memory."

Compiled (an illustration, not a real source): "Reviewing a fact just before it would be forgotten flattens the forgetting curve. The author scheduled reviews at 1, 3, 7 and 21 days and kept 90% of 4,000 cards after a year, against 60% for cards reviewed at random.[^1] The mechanism is that each successful recall lengthens how long the memory lasts, so the first reviews matter most. Caveat: the deck was vocabulary, and the author notes the intervals do not transfer to conceptual material."

[^1]: [[7-Raw/sources/Spaced repetition in practice|Spaced repetition in practice]], section "Results"

1. **Compile, do not summarise.** Capture the argument: the claims, the evidence, the reasoning that connects them, the examples, the numbers and the caveats. "The article discusses X" is not content. A paragraph that could be pasted back into the source unchanged was copied, not compiled. Why: the owner will ask the vault instead of re-reading sources, so whatever you leave out is lost to them.
2. **Length follows the argument.** Concept pages have no word limit; write as much as the argument needs, and do not cut a mechanism to keep a page short. Entity pages stay short hubs that point to concept pages. Why: an essay hidden on an entity page cannot be found from the concept it explains, and a clipped concept page is a summary again.
3. **A source moves every page it touches.** Before writing, list every concept, entity, project and area the source bears on, and update each one. A substantial source updates 5 or more pages. If it moved fewer, say so in the report and say why (a young vault is the usual honest reason). Why: a source that produces one page produces a pile of summaries, not a connected wiki.
4. **Every concept page has "Where it applies to me"; an entity page has it when there is a direct link.** Link only projects and areas named in `8-System/about.md` or on their own pages, and say what the page means for each, naming the goal or standard the connection rests on. When there is none, write that there is no connection and nothing more; do not invent one. On an entity page the section is optional: leave it out when the entity has no direct link to the owner's projects or areas. Why: this section is what turns general knowledge into the owner's knowledge, and it is how the vault answers "what should I do".
5. **Every claim cites its source with a footnote.** On concept, entity, project, area and summary pages, use `[^1]` in the text and definitions at the end without a heading, for example `[^1]: [[7-Raw/sources/Article title|Article title]], section "How it works"` or `[^2]: [[1-Journal/Daily/2026/10/2026-10-30|2026-10-30]]`. Each footnote's source and section must support its attached claim. Use one footnote per source and section and reuse it for supported claims. On new pages number in first-use order; on edits preserve existing labels and definitions and continue numbering, even if insertion puts numbers out of order. In append-only project `Decisions.md` and `Log.md`, give each entry its own unique labels, such as `[^2026-11-07-1]`, with definitions directly under that entry; never move or renumber old definitions. For an owner's own statement in conversation, use a footnote naming the owner and date in the owner's language, for example `[^1]: Owner, in conversation, 2026-11-04` or `[^1]: Właścicielka, w rozmowie, 2026-11-04`; it is not evidence of an external fact and adds no file to `sources:`. When editing a page that still cites inline, convert its citations to footnotes in the same edit and say so in the preview, without rewriting old append-only entries. File definitions use full vault paths; list the same files as plain links in `sources:`. `index.md`, root `log.md` and `questions.md` keep plain links. Mark outside knowledge as such and keep it apart from cited claims. Why: claims must be traceable to their sources for checking.
6. **Flag contradictions inline; never resolve them silently.** When a source disagrees with a page, or two sources disagree, write both claims side by side with their citations at the place it matters, add the point to "Caveats and contradictions", and set the page to `needs_update`. Two claims that can both be true but pull the owner in different directions are a tension, not a contradiction: write both side by side with their citations in "Caveats and contradictions" and leave the status alone, because nothing is false. Why: you are not the judge of which source is right, and a silent overwrite destroys the evidence the owner would need to judge.
7. **Links between wiki pages go both ways.** Every link you add from wiki page A to wiki page B needs a link from B back to A, written in the same operation. Citations of raw files in `7-Raw/` and processed daily notes are exempt: those files are immutable, so they get no return link (the page's `sources:` list is the back-reference). The owner's documents are exempt too: you may not edit them, and Obsidian's backlinks show who cites them. Why: a one-way link leaves the target an orphan and hides the new page from anyone reading the old one.
8. **The preview shows depth, not page names, and is easy to read.** Give a heading per destination page (created or updated), sub-headings per section, and the claims as short paragraphs that name where in the raw source each comes from. Then the contradictions you found, then one line each for what you left out, the entities you gave no page, and the pages you will not touch. Omit a block that has nothing in it. Why: the owner can only reject a thin reading if they can see it, and a numbered wall of claims is not read.
9. **Finish with the skill's self-check.** Each skill ends with a checklist. Its pre-commit checks run after writing and before staging, committing or pushing: fix what fails (with the owner's approval when the fix goes beyond what the preview showed), and only then commit. Its post-commit checks (what the commit contains, the push result, that the report matches the commit) run afterwards; report any failure to the owner and never rewrite history to hide or repair it. Why: most of these failures (a missing return link, a skipped page, a missing citation) are cheap to catch before the commit and expensive to find later.
10. **Only the owner sets `status: reviewed`.** You write `draft` or `needs_update`. Why: `reviewed` is the owner's statement that they read the page and it holds; if you set it, the field means nothing.
11. **One language per page, the owner's.** Write vault content in the language the owner writes in, read from `8-System/about.md` and their notes. Do not mix languages on a page. Translate the template headings into that language, but keep the structure and order. Why: a mixed page is harder to read and to search.
12. **Draw a diagram when structure explains better than prose.** Flows, relationships, timelines and hierarchies go in a Mermaid block inside the markdown. The text still carries the claims and citations; the diagram illustrates them and must not contradict them. Do not add decorative diagrams. Why: a structure is understood faster from a picture, but a picture without the claims behind it cannot be verified.

Two more habits keep pages honest. Prefer the specific over the general: a number, a name or a worked example beats "significantly" and "various". Say how sure a claim is when the source is: "the author claims", "measured in a sample of 40", "anecdote".

## Page types

Every page type has a template. Copy the template, replace every placeholder with a real value (dates, `kind`, `period`, `linear`), fill every section (the one exception is an entity page's optional "Where it applies to me", which you delete when there is no direct link), translate the headings (rule 11), and delete the italic hint lines.

| Type | Template | Lives in | Written by |
|---|---|---|---|
| project | `.agents/templates/project.md` | `3-Projects/<Project>/<Project>.md` | agent |
| decisions (no frontmatter) | `.agents/templates/decisions.md` | `3-Projects/<Project>/Decisions.md` | agent |
| log (no frontmatter) | `.agents/templates/log.md` | `3-Projects/<Project>/Log.md` | agent |
| area | `.agents/templates/area.md` | `4-Areas/<Area>/<Area>.md` | agent |
| concept | `.agents/templates/concept.md` | `5-Resources/` (or its topic subfolder); also further pages inside a project or area folder | agent |
| entity | `.agents/templates/entity.md` | `5-Resources/` (or its topic subfolder) | agent |
| summary | `.agents/templates/summary.md` | `1-Journal/Weekly/YYYY/YYYY-Www.md`, `1-Journal/Monthly/YYYY-MM.md` | agent |
| daily note | `8-System/templates/Daily.md` | `1-Journal/Daily/` | owner |
| my-document | `8-System/templates/My document.md` (optional) | `5-Resources/` or its topic subfolder, or inside a project or area folder | owner |

Frontmatter rules:

- Every page made from the five typed templates (project, area, concept, entity, summary) has these keys: `type` (`project`, `area`, `concept`, `entity` or `summary`), `created` and `updated` (`YYYY-MM-DD`), `status` (`draft`, `reviewed` or `needs_update`) and `sources` (a list of links to raw files, quoted: `["[[7-Raw/sources/Article title]]"]`). A project adds `linear:`, an entity adds `kind:` (`person`, `company`, `tool` or `product`), a summary adds `period:`. A concept or entity also has `urls:`, a list of the original web addresses of its sources, copied from the Inbox item's metadata (`[]` when there is none), so the owner can open the full original.
- An owner document needs no frontmatter; `type: my-document` is optional. Never add keys to it.
- Set `created` once. Set `updated` to today on every edit, including a one-line addition. Why: an edited page with an old `updated` looks untouched and is skipped when stale pages are checked.
- New pages are `draft`. A page you change stays `reviewed` unless you set `needs_update` for a contradiction; when you change the substance of a reviewed page, say in the preview that it was reviewed so the owner can decide whether to look again.
- No tags. Use links and concept pages.
- `Decisions.md` and `Log.md` are append-only logs and have no frontmatter. The daily note, `index.md`, `log.md`, `questions.md` and `8-System/about.md` are not typed pages and get none either. `index.md` lists only the project overview.

## Skills

Skills live in `.agents/skills/`, one folder per skill, each with a `SKILL.md`. Run the one whose description matches what the owner asked for.

- `start-journey`: set up or refresh the owner profile and areas.
- `process-inbox`: compile material in `2-Inbox/` into wiki pages, then archive it to `7-Raw/sources/`; also processes one of the owner's own documents when asked.
- `review-journal`: review closed daily notes by week or day, or produce a monthly summary.
- `manage-project`: start, update or archive a project.
- `ask-brain`: answer questions using the vault.
- `check-health`: audit the vault and report ranked findings.

## Limits

This method has known failure modes. Read `8-System/limits.md`.
