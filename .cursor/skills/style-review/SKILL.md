---
name: style-review
description: >-
  Review MetaMask documentation for editorial compliance (voice, terminology, formatting, content
  type, frontmatter, workflow). Use before submitting a PR or when asked to audit existing pages.
---

# Style review

## When to use

- You want to check existing content for style, terminology, formatting, or content-type issues.
- You are preparing to submit a PR and want a structured editorial pass.

## Inputs

The user provides a file path or directory to review. If not provided, ask what to review.

## Step 1: Identify the product and content type

Read the file path to determine:

1. **Product area** - which product folder the file lives in (for example, `metamask-connect/`,
   `services/`, `snaps/`). Load the corresponding product rule from `.cursor/rules/product-*.mdc`.
2. **Content type** - which subfolder determines the expected structure (for example, `concepts/`,
   `how-to/`, `reference/`). Use `.cursor/rules/content-types.mdc` for the mapping.

## Step 2: Run Vale (if available)

Try running Vale on the target file:

```bash
vale <file-or-directory>
```

If Vale is not installed, skip this step and note it in the report. Continue with the manual review.

## Step 3: Review against editorial rules

Read the file fully. The following points are quick reminders; use the linked `.mdc` files as the
source of truth for full criteria, examples, and edge cases.

### Voice and tone (editorial-voice.mdc)

- Active voice and present tense used throughout.
- Second person ("you"), not "the developer" or "users."
- Contractions used naturally.
- No marketing language, superlatives, or promotional tone.
- No em dashes or en dashes; use commas, parentheses, or semicolons.
- First sentence of each section gets to the point.
- No slang, figures of speech, or culturally specific idioms.

### Terminology (terminology.mdc)

- Product names match the required forms (dapp, MetaMask, smart account, web3, etc.).
- Standards spelled out on first use with identifier in parentheses (for example,
  "Chain Agnostic Improvement Proposal 25 (CAIP-25)"), short form on subsequent references.
- Product-specific terminology matches the corresponding `product-*.mdc` rule file.

### Markdown formatting (markdown-formatting.mdc)

- Lines wrapped at roughly 100 columns.
- Each sentence on its own line.
- Code blocks have a language tag.
- Links use relative paths within the product, absolute paths across products.
- Descriptive link text; no "click here" or bare URLs.
- Admonitions use Docusaurus syntax and are not nested.
- Tables are aligned in source Markdown.
- No duplicate H1 if frontmatter contains a `title` field.

### Content type compliance (content-types.mdc)

- Page structure matches the expected content type for its folder.
- Concept pages: no step-by-step instructions, ends with "Next steps."
- How-to pages: goal stated first, prerequisites listed, numbered steps.
- Reference pages: parameter format matches surrounding pages in the same product section.
- Quickstart pages: complete, copy-paste-and-run code.
- Troubleshooting pages: symptom/error first, then fix.

### Frontmatter

- `description` field present (one sentence for SEO).
- `sidebar_label` only when needed (default nav label would be too long or wordy); otherwise omit.
- No duplicate H1 if `title` is set in frontmatter.

### Contributor workflow (contributor-workflow.mdc)

- If the file is new, verify it has been added to the correct sidebar file.
- If the file was moved or renamed, verify a redirect exists in `vercel.json`.
- Cross-product links use absolute URL paths.

## Step 4: Generate the report

Present findings as a structured report grouped by category. For each issue:

1. **Line number** - approximate location in the file.
2. **Category** - Voice/Tone, Terminology, Formatting, Content Type, Frontmatter, or Workflow.
3. **Issue** - what is wrong.
4. **Suggestion** - how to fix it.

### Report format

```
## Style review: <file>

### Product: <product name> | Content type: <type>

### Summary
- X issues found (Y from Vale, Z from manual review)
- Severity: A critical, B suggestions

### Voice and tone
- Line 12: Passive voice - "The block number can be specified..." → "Specify the block number..."

### Terminology
- Line 8: "smart contract account" → Use "smart account" per terminology.mdc.

### Formatting
- Line 45: Code block missing language tag.
- Line 22: Em dash found - replace with comma or period.

### Content type
- Page is in `concepts/` but contains numbered step-by-step instructions. Move steps to a
  how-to page and link to it.

### Frontmatter
- Missing `description` field.
```

If reviewing a directory, produce one report per file, then a summary at the end showing totals
across all files.

If no issues are found, say so explicitly.
