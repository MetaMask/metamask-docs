---
name: agent-friendly-docs-review
description: Review pull requests to the MetaMask docs (or any Docusaurus docs site) for Agent Score / AFDocs and SEO regressions. Use this skill whenever reviewing a PR that touches llms.txt, per-page .md generation, the llms-html-injector plugin, docusaurus.config.js routing, vercel.json redirects/headers, sitemap output, robots.txt, RPC/explorer URL formatting in chain pages, or anything described as "Agent Score", "AFDocs", "GEO", "SEO", "orphan routes", or "agent discoverability". Apply it even when the PR author has not explicitly asked for an agent-friendliness review.
---

# Agent-Friendly Docs PR Review

This skill encodes the review patterns from MetaMask docs PRs #2926 and #2929, which
implemented the Agent-Friendly Documentation Spec (AFDocs). Use it to review PRs for
regressions against the same spec, plus the SEO/orphan-route and editorial-URL rules
that shipped alongside it.

The underlying standard is AFDocs (https://agentdocsspec.com, CLI: `npx afdocs check`).
It runs 21–23 checks across 8 categories. The single highest-impact check is
`llms-txt-exists`: if it fails, the whole score is capped at D (59) regardless of
everything else, so guard it first.

## How to run a review

1. Identify which of the five concern areas below the PR touches (most touch several).
2. Walk the matching checklist sections. For each item, either confirm it holds or flag it.
3. For anything you cannot verify by reading the diff (live behavior, scores), ask for the
   AFDocs run against the PR's Vercel preview URL, or run it yourself if you have the URL:
   `npx afdocs check <preview-url> --verbose`
4. Summarize as: (a) blocking issues, (b) non-blocking suggestions, (c) what you could not verify.

Prefer concrete file/line references. Distinguish "this regresses the Agent Score" (blocking)
from "this is a style nit" (non-blocking).

## 1. llms.txt coverage and size

- [ ] Root `static/llms.txt` exists and is served same-host (not via cross-host redirect).
      A cross-host redirect downgrades `llms-txt-exists` to a warning.
- [ ] Root index stays under the **50,000-character** AFDocs threshold. If content grew,
      it should link to per-section indexes (`llms-<product>.txt`, `llms-<product>-full.txt`)
      rather than inlining everything. Reject re-introduction of a monolithic `llms-full.txt`.
- [ ] `llms.txt` follows llmstxt.org structure: H1 title on line 1, a `>` blockquote summary,
      then `[name](url): description` links under heading-delimited sections.
- [ ] Every link in `llms.txt` resolves to a **200** and points at **markdown** content.
      No links to pages that 301/redirect (the sitemap-normalization step in #2929 exists
      precisely to prevent pointing agents at redirecting pages).
- [ ] If a new top-level section was added, confirm BOTH: a line in `static/llms.txt` AND a
      matching `customLLMFiles` entry in `src/plugins/llms-html-injector/options.js` (required by
      `docusaurus.config.js`). These must stay in sync.
- [ ] `llms*.txt` is served with `text/markdown; charset=utf-8` (check `vercel.json` headers).

## 2. Markdown parity and discoverability

- [ ] Every doc HTML page has a sibling `.md` URL that returns 200 (`generateMarkdownFiles`
      / the injector's regenerate step). New page types should not silently lack a `.md`.
- [ ] Each HTML page injects `<link rel="alternate" type="text/markdown">` in the head AND a
      visible/sr-only directive in the body pointing at `llms.txt`. Serving `.md` without a
      discovery hint still FAILS AFDocs (`llms-txt-directive`).
- [ ] UI chrome (breadcrumbs, TOC, footer, paginator, copy-page button, KaTeX MathML spans)
      is wrapped in `data-markdown-ignore` so HTML→MD parity checks ignore UI-only markup.
      A new themed component that renders visible text should usually be marked too.
- [ ] HTML→MD conversion preserves `<details>`/`<summary>` and does not duplicate KaTeX math.
- [ ] On preview/branch deploys, generated artifacts rewrite absolute hosts to the preview
      origin (so AFDocs link checks pass on previews, not just production).

## 3. Orphan routes and routing/SEO

- [ ] No new content-less standalone routes. Watch for: empty `blog`/`docs`/`search` slots,
      and imported-but-not-routed fragment trees (e.g. quickstart `builder/**`, `commonSteps/**`)
      that the `pages` plugin would turn into empty routes. These need explicit `exclude` patterns.
- [ ] Removed pages have a redirect in `vercel.json` (e.g. deleted `docs/whats-new.md` → `/`).
      A deletion without a redirect creates a 404 / lost inbound link.
- [ ] No duplicate routes for the same content (the `/quickstart` dedup in #2929: plugin route
      is canonical; `pages` plugin must not auto-generate a second module-less route; no splat
      route that produces malformed `/quickstart/*/` sitemap entries).
- [ ] If the classic preset `docs` slot is OFF, any new non-product page must live under a
      product `plugin-content-docs` instance or `src/pages/`, NOT `docs/<name>.md`.
- [ ] `sitemap.xml` only lists 200 URLs; redirect targets and dotted-segment trailing slashes
      are normalized out before indexes are generated.
- [ ] `robots.txt` Content-Signal line is present/intact (search=yes, ai-input=yes, ai-train=yes)
      if the team's policy is to allow AI access.

## 4. Editorial URL formatting (chain pages)

- [ ] On `Public RPC URL`, `Public RPC URL 2`, and `Block Explorer Link` lines, the URL token
      is wrapped in inline-code backticks — not a bare `http...`, not a `[url](url)` self-link,
      not a `<CopyableNoFollow url="..." />` wrapper. This matches `editorial-voice.mdc`.
- [ ] Trailing prose guidance (e.g. "Avoid using public rpcTarget in production") stays plain
      prose; only the URL token is backticked.
- [ ] If a `<CopyableNoFollow>` was the only consumer in a file, its import was removed; but the
      component itself must remain in the repo if still used elsewhere (e.g. Unity partials).
- [ ] Stale external links are refreshed (watch for dead RPC endpoints, moved library docs).

## 5. Build pipeline correctness

- [ ] The `llms-html-injector` wrapper spreads the upstream plugin so existing/future lifecycle
      hooks are forwarded, overrides only `name` + `postBuild`, and calls the upstream `postBuild`
      via `.call(inner, props)` BEFORE running post-processing. Docusaurus runs `postBuild` hooks
      concurrently, so post-processing must not race generation.
- [ ] File moves use an existence probe (`fs.access`) before `fs.rename` so genuine I/O errors
      (permissions, locks) propagate instead of being swallowed as "target missing."
- [ ] Preview URL resolution prefers `VERCEL_BRANCH_URL`, falls back to `VERCEL_URL`.
- [ ] `non-root baseUrl` is handled when rewriting `llms*.txt` URLs and alternate hrefs.
- [ ] New dependencies were reviewed by the supply-chain bot (Socket) and are pinned.
- [ ] `node scripts/verify-llms-output.js` was run against a fresh `npm run build` and passes
      (sizes under threshold, every page has a `.md` sibling, alternate link on every HTML page).

## Verification you should always request or run

These cannot be confirmed from the diff alone:

- `npx afdocs check <preview-url> --verbose` — the live agent surface and score.
- A manual fetch of 2–3 changed pages' `.md` siblings returning 200.
- Confirmation that no `Public RPC URL` / `Block Explorer Link` line still contains a bare
  `http`, a markdown self-link, or a `CopyableNoFollow` wrapper (a repo-wide grep).

## Output format

Produce a review with three clearly separated buckets:

**Blocking (Agent Score / SEO regressions):** items that fail an AFDocs check, create an orphan
route, break a redirect, or push `llms.txt` over the size limit.

**Non-blocking suggestions:** style, naming, defensive coding, doc clarity.

**Could not verify from the diff:** anything needing the live preview or an AFDocs run, with the
exact command to produce the evidence.
