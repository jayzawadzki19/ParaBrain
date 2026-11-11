# Limits

What this method does badly. Read it once, then read it again the first time the vault tells you something confidently wrong. Agents read it before telling the user the vault is certain about something.

The method works. It is also a young pattern, not a finished product. These are the five ways it breaks.

## Error compounding

The biggest risk, by a distance.

The agent writes a page with a subtle mistake. You ask a question and the answer inherits the mistake. You file the answer back, and now two pages agree on the wrong thing. Two months later five pages reinforce it and it reads like consensus.

Checking the vault helps, but the agent running `check-health` has the same blind spots as the agent that made the error. It catches structural failures, not its own reasoning failures.

What to do:

- Run `check-health` monthly. Put it in the calendar rather than relying on memory.
- `status: reviewed` means you read the page. It does not mean the agent is satisfied with it. Set it yourself, and only when you mean it, or the field is worthless.
- Before any decision that costs money or time, open the raw source in `7-Raw/` or the processed day in `1-Journal/Daily/YYYY/MM/` and check the claim yourself.

## Hallucination does not disappear

Grounding answers in your own sources reduces invention. It does not remove it. The agent can still synthesise a connection that exists in none of the sources.

The danger is the packaging. A page with clean markdown, path citations and cross-links looks authoritative, so you check it less than you would check a chat reply. A citation proves the agent wrote a file path next to a claim. It does not prove the source says it.

Citations of your own documents are weaker still. A processed source is immutable in `7-Raw/`; your documents stay where you wrote them and stay editable. After you rewrite one, a "My position" passage that cites it can describe a version that no longer exists.

What to do:

- Spot-check citations against the raw files at random, especially on pages you are about to act on.
- After you rewrite one of your documents, ask for it to be processed again, and read a "My position" passage as a snapshot from the day it was written.
- Treat a page with one source as one author's opinion, because that is what it is.
- Pay extra attention to claims marked as knowledge from outside the vault: no raw file backs them.

Spot-check claims against the source card, the URL, or the full clip in Git history (`git log -- "2-Inbox/<file>"`); the sync commit captured the Inbox file before processing.

## Navigation as the vault grows

ParaBrain has no page limit and does not ask for one vault per domain. A personal vault spans many areas of life, and splitting it would cut the links that make it useful. What changes with size is how much it costs to find things.

Navigation is index-first: the agent reads `index.md`, then the pages it points to. That works while the index is a map you can read in one pass. Once `index.md` passes roughly 150 to 200 entries, reading it costs more and each answer starts to pull in whole pages, so cost and latency go up while answer quality goes down. Long inputs also degrade in the middle: things buried mid-document get less attention, so some query results will have blind spots.

What to do:

- Keep every `index.md` line to one line. It is a map, and a map you have to read in full is not a map.
- Group Resources pages into topic subfolders once a topic reaches 3 pages.
- When `index.md` passes roughly 150 to 200 entries, consider per-section indexes so a query reads only the section it needs.

## Cost

Every `process-inbox`, `review-journal`, `ask-brain` and `check-health` run spends tokens. A single source that properly touches ten pages is not a cheap operation, and doing it right costs more than doing it badly.

What to do:

- Use a frontier model for `process-inbox`, `review-journal` and hard questions. A cheaper model is fine for mechanical updates and reformatting.
- Do not process a backlog in one rushed pass. A rushed pass is cheaper and produces thinner pages; keep the full treatment for sources you care about.

## Single-model blind spot

The whole vault is one model's reading of your sources, with that model's tendencies baked in. You will not see the bias, because everything you read has been through the same filter.

What to do:

- For a decision that matters, ask the same question of a second model against the same vault, and compare. Where they disagree is where to look.

## Why it is still worth it

People abandon wikis because maintenance grows faster than value. Agents do not get bored, do not forget to update a cross-reference, and will touch fifteen files in one pass. That is the whole trade. Just do not confuse a tidy vault with a correct one.

Adapted from Super Brain (MIT), github.com/superhero-tech/super-brain.
