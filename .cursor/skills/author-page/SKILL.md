---
name: author-page
description: >-
  Scaffold or draft new MetaMask documentation to editorial standards. Use when creating a new
  page, writing a first draft, or helping a non-writer meet the documentation team's expectations.
---

# Author a new documentation page

Help create a new documentation page that follows MetaMask editorial standards from the start.

## When to use

- You need to scaffold a new page or write a first draft.
- You are helping someone who is not a writer produce content that meets team expectations.

## Inputs

Ask the user for any information they have not already provided:

1. **Product area** - which product is this for? (MetaMask Connect, Embedded Wallets,
   Smart Accounts Kit, Services, Snaps, Developer Tools)
2. **Content type** - what kind of page? (concept/explanation, how-to guide, quickstart,
   reference, tutorial, troubleshooting)
3. **Topic** - what is the page about?
4. **File path** - where should the file live? (Suggest one based on product and content type
   if the user doesn't specify.)

## Step 1: Determine conventions

Based on the product and content type, load the relevant rules:

- `.cursor/rules/content-types.mdc` - structural expectations for the content type.
- `.cursor/rules/product-*.mdc` - product-specific terminology and conventions.
- `.cursor/rules/editorial-voice.mdc` - tone and voice.
- `.cursor/rules/markdown-formatting.mdc` - formatting conventions.
- `.cursor/rules/terminology.mdc` - required terms and casing.

Check how existing pages in the same folder are structured. Match their conventions for headings,
front-matter fields, intro style, and parameter formats.

## Step 2: Scaffold the page

Create the file with the correct structure for its content type.

### Frontmatter

Follow **Frontmatter** in `.cursor/rules/markdown-formatting.mdc` (required `description`,
recommended `keywords`, optional `sidebar_label` only when the nav label would otherwise be too
long or wordy, and the `title` vs duplicate H1 rule). Do not repeat or contradict that rule here.

### Structure by content type

**Concept / Explanation** (for `concepts/` or `learn/` folders):

```markdown
---
description: <one sentence>
---

# <Topic name>

<Opening paragraph: what this is and why it matters. 2-3 sentences. Get to the point.>

## <First concept section>

<Explain the concept. No step-by-step instructions.>

## <Second concept section>

...

## Next steps

- [<Related how-to guide>](<relative link>)
- [<Related reference>](<relative link>)
```

**How-to guide** (for `guides/` or `how-to/` folders):

```markdown
---
description: <one sentence>
---

# <Action-oriented title: "Send a transaction" not "Sending transactions">

<Opening paragraph: what the reader will accomplish. 1-2 sentences.>

## Prerequisites

- <Requirement 1>
- <Requirement 2>

## Steps

### 1. <First action>

<Instruction. One action per step.>

### 2. <Second action>

...

## Next steps

- [<Related content>](link)
```

**Quickstart** (for `quickstart/` or `get-started/` folders):

```markdown
---
description: <one sentence>
---

# <What the reader will build or achieve>

<Opening paragraph: what the reader will have at the end. 1-2 sentences.>

## Prerequisites

- <Requirement>

## Steps

### 1. <First step>

<Complete, copy-paste-ready code.>

### 2. <Second step>

...

## Next steps

- [<Extend this with a how-to guide>](link)
```

**Reference** (for `reference/` folders):

```markdown
---
description: <one sentence>
---

# <API or method name>

<One sentence describing what the method or API does.>

## Parameters

<Match the parameter format used in surrounding reference pages in the same product. Use tables
or nested bulleted lists depending on the established convention.>

## Returns

<Describe the return value.>

## Example

<Working code example.>
```

**Tutorial** (for `tutorials/` folders):

```markdown
---
description: <one sentence>
---

# <What the reader will learn>

<Opening paragraph: what the reader will build, what they will learn, and why it matters.
2-3 sentences.>

## Prerequisites

- <Requirement - assume no prior knowledge>

## Steps

### 1. <First step>

<Explain every step. Include expected output.>

...

## Complete code

<Full working code sample the reader can download or copy.>

## Next steps

- [<More advanced guide>](link)
```

**Troubleshooting** (for `troubleshooting/` folders):

```markdown
---
description: <one sentence>
---

# <Symptom or error message>

## Problem

<Describe the symptom. Include the exact error text if available.>

## Solution

<Steps to fix the issue.>
```

## Step 3: Write the content

Fill in the scaffold with content based on what the user provides. Follow these rules:

- **Voice**: active, present tense, second person ("you"). Use contractions naturally.
- **First sentence**: get to the point. Answer "what" or "why" immediately.
- **No em/en dashes**: use commas, parentheses, or semicolons.
- **Sentence case** for all headings.
- **One sentence per line**, wrapped at roughly 100 columns.
- **Code blocks**: always include a language tag. Use `bash npm2yarn` for install commands.
- **Terminology**: use the required forms from `terminology.mdc`.
- **No marketing language**: no "powerful," "seamless," "best-in-class."
- **No invented API behavior**: if you are not certain about a parameter, return value, or
  behavior, add a `:::note` admonition flagging it for review rather than stating it as fact.

## Step 4: Verify the file is complete

Before finishing, check:

- [ ] Frontmatter has `description`; add `sidebar_label` only when the default nav label would be
      too long or wordy (see `markdown-formatting.mdc`).
- [ ] Opening paragraph answers "what" and "why" in the first 1-2 sentences.
- [ ] Structure matches the content type.
- [ ] Terminology matches `terminology.mdc` and the product rule file.
- [ ] Code blocks have language tags.
- [ ] No em dashes, en dashes, or marketing language.
- [ ] File name uses lowercase and dashes (`send-transactions.md`, not `sendTransactions.md`).
- [ ] File is placed in the correct product and content-type folder.

## Step 5: Remind the contributor

After creating the page, remind the user to:

1. Add the page to the correct sidebar file (see `contributor-workflow.mdc` for the mapping).
2. If any page was moved, renamed, or removed in the same change set, add redirects in
   `vercel.json` (see `contributor-workflow.mdc`).
3. Preview locally with `npm start`.
4. Check that the CI linter passes before requesting review.
