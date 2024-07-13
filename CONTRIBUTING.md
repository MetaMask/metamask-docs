# Contribute to the documentation

Thank you for your interest in contributing to the MetaMask developer documentation!
These docs generally follow the [Consensys docs guide](https://docs-template.consensys.net/).
This page describes contribution guidelines specific to MetaMask, and refers to the Consensys docs
guide in some places.

## Table of contents

- [Contribution workflow](#contribution-workflow)
- [Preview locally](#preview-locally)
- [Style guide](#style-guide)
- [Add images](#add-images)
- [Format Markdown and MDX](#format-markdown-and-mdx)
  - [Live code blocks](#live-code-blocks)

## Contribution workflow

The MetaMask documentation contribution workflow involves proposing changes by creating
[branches](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches)
and
[pull requests (PRs)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
on this repository.
This facilitates open contributions, testing, and peer review.

To contribute changes:

1. Search for an [existing issue](https://github.com/MetaMask/metamask-docs/issues) to work on, or
   [create a new issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue)
   describing the content issue you'd like to address.
   Make sure no one else is assigned to the issue, and assign yourself to it.
   If you don't have permission to assign yourself to it, leave a comment on the issue.

2. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
   this repository to your computer and navigate into it.

   ```bash
   git clone https://github.com/MetaMask/metamask-docs.git
   cd metamask-docs
   ```

   > **Note**: If you don't have write access to this repository, you must [fork the
   > repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository)
   > to your personal account and clone your forked repository instead.
   > [Add an upstream remote](https://docs.github.com/en/get-started/quickstart/fork-a-repo#configuring-git-to-sync-your-fork-with-the-upstream-repository)
   > to be able to pull from and push to the original repository.
   >
   > ```bash
   > git clone https://github.com/<YOUR-USERNAME>/metamask-docs.git
   > cd metamask-docs
   > git remote add upstream https://github.com/MetaMask/metamask-docs.git
   > ```

3. [Create and checkout a topic branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging),
   naming it appropriately.
   We recommend including the issue number and a short description in the branch name (for example,
   `183-doc-cli-option`), which is a reminder to fix only one issue in a PR.

   ```bash
   git checkout -b <ISSUE-NUM>-<ISSUE-DESC>
   ```

   > **Tip:** You can use a Git client such as [Fork](https://fork.dev/) instead of the command line.

4. Open this repository in a text editor of your choice (for example,
   [VS Code](https://code.visualstudio.com/)) and make your changes.
   Make sure to [follow the style guidelines](https://docs-template.consensys.net/contribute/style-guide)
   and [format your Markdown correctly](https://docs-template.consensys.net/contribute/format-markdown).

   > **Notes:**
   >
   > - All documentation content is located in the `wallet` and `snaps` directories.
   > - If you add a new documentation page, make sure to edit `wallet-sidebar.js` or
   >   `snaps-sidebar.js` to add the page to the
   >   [sidebar](https://docs-template.consensys.net/contribute/configure-docusaurus#sidebar).
   > - If you delete, rename, or move a documentation file, make sure to add a
   >   [redirect](https://docs-template.consensys.net/contribute/configure-docusaurus#redirects).

5. [Preview your changes locally](https://docs-template.consensys.net/contribute/preview) to check
   that the changes render correctly.

6. Add and commit your changes, briefly describing your changes in the commit message.
   Push your changes to the remote origin.

   ```bash
   git add .
   git commit -m "<COMMIT-MESSAGE>"
   git push origin
   ```

7. On [this repository on GitHub](https://github.com/MetaMask/metamask-docs), you’ll see a banner
   prompting you to create a PR with your recent changes.
   Create a PR, describing your changes in detail.
   [Link the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
   that your PR fixes by adding `fixes #<ISSUE-NUM>` to the PR description.

8. Specific reviewers are automatically requested when you submit a PR.
   You can request additional reviewers in the right sidebar of your PR – for example, the original
   issue raiser.
   Make any required changes to your PR based on reviewer feedback, repeating steps 5–7.

9. After your PR is approved by two reviewers, all checks have passed, and your branch has no
   conflicts with the main branch, you can merge your PR.
   If you don't have merge access, a maintainer will merge your PR for you.
   You can delete the topic branch after your PR is merged.

## Preview locally

[Preview the docs locally using npm or Yarn.](https://docs-template.consensys.net/contribute/preview)

## Style guide

Refer to the [Consensys documentation style guide](https://docs-template.consensys.net/contribute/style-guide).

## Add images

All images are located in the `wallet/assets` and `snaps/assets` directories.
When adding a new image, such as a screenshot or diagram, make sure the image has a white or
`#1b1b1d` color background in order for it to be compatible with the site's light and dark modes.

Additionally, follow the [Consensys guidelines on adding images](https://docs-template.consensys.net/contribute/add-images).

## Format Markdown and MDX

The documentation is built using [Docusaurus](https://docusaurus.io/), which is powered by
[MDX](https://mdxjs.com/), an extension to [Markdown](https://www.markdownguide.org/) that allows
you to use [React JSX](https://www.w3schools.com/react/react_jsx.asp) in your Markdown content.

Follow the [Consensys guidelines on formatting Markdown](https://docs-template.consensys.net/contribute/format-markdown).
The MetaMask docs also use a plugin to implement [live code blocks](#live-code-blocks).

### Live code blocks

The [`remark-codesandbox`](https://github.com/kevin940726/remark-codesandbox/) plugin allows you to
define a code block to be loaded live in a CodeSandbox iframe.
This enhances the documentation by keeping the code blocks versioned and in the codebase, while
using CodeSandbox to showcase any example with any dependency.

Define a live code block by adding a `codesandbox` key to the code block.
For example:

````jsx
```javascript codesandbox=vanilla
// JavaScript live code block
```
````

`remark-codesandbox` allows for simple code blocks where the content of the block replaces the
CodeSandbox entry point, and more complex code blocks that can be loaded directly from the
filesystem.
See the
[`remark-codesandbox` documentation](https://github.com/kevin940726/remark-codesandbox/#documentation)
for more information.

## Analytics

The [`docusaurus-plugin-segment`](https://github.com/xer0x/docusaurus-plugin-segment) plugin enables simple usage analytics to inform documentation improvements that may be needed.

If you need to test analytics events in your local development environment be sure to export the appropriate key for the environment you are testing against before building and running the project:

```bash
export SEGMENT_ANALYTICS_KEY="<your key>"
```

Then build the project in production mode using the following command:

```bash
yarn build && yarn serve
```
