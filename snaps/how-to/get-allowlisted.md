---
description: Submit your Snap for allowlisting on MetaMask extension.
sidebar_position: 7
---

# Get allowlisted

You have built your Snap, tested it, published it to npm, and now you are ready to make it available to MetaMask users. 
In the MetaMask Snaps Open Beta, an allowlist restricts which Snaps can be installed by users. 

:::note 
As part of the launch of MetaMask Snaps, individual Snaps must be put on an allowlist before they can be installed by users. This means that at this time, only selected, audited Snaps can be installed. In the future, this system will be opened up. By including a Snap on the allowlist, Consensys is not endorsing, recommending, or guaranteeing the safety of this Snap for your use or use for any reason. Always do your own research before installing any Snap.
:::

## Pre-requisites

To be added to the allowlist, a Snap must: 

- Make the source code publicly available. This does not mean that the Snap source code has to be published with an open-source license, but users should be able to read the source code of the Snap package. 
- Be published to npmjs.com. 
- Not impair our compliance with laws or regulations. 

Furthermore, any Snap that uses any of the following permissions pertaining to key management must also provide evidence of a third-party audit from an approved auditor covering the Snap source code itself that is to run within the Snaps system along with any modules used for key management, with evidence of the commit hash that was audited and the commit that has any fixes documented in the audit report: 

- `snap_getBip32Entropy`
- `snap_getBip32PublicKey`
- `snap_getBip44Entropy`
- `snap_getEntropy`
- `snap_manageAccounts`

A list of approved third-party auditors and details about the audit process are available on the 
[MetaMask Snaps Builder Team Space](https://consensys.notion.site/Audit-process-1acbc67819dc4631b7a3d6c664e387a3). 

## Submit your Snap

When you are ready to submit your Snap, you should navigate to the 
[MetaMask Snaps Registry](https://github.com/MetaMask/snaps-registry) 
repository and open a new issue with "Add Snap Request." 
You will need to provide the following information: 

- Title: the name of your Snap. This must match the `displayName` from the Snap manifest.
- Snap ID: the npm ID of your published Snap. Example: `npm:@metamask/simple-snap-keyring`
- Description: a detailed explanation of what your Snap does and how to use it. This can be multiple lines and can contain URLs.
- Summary: a brief explanation of what the Snap does, no more than two sentences.
- Category
- Website: if your Snap has an official companion dapp that is required to interact with your Snap, provide the URL here.
- Repository: the URL where your source code is hosted.
- Open Source: check this box if your Snap is published with an open source license.
- Author: the name of the company, team, or individual that developed the Snap.
- Author Website
- Support URL: an email, Discord channel, Telegram channel, or website where users can get support.
- FAQ: a webpage with frequently asked questions.
- Knowledge Base

If your Snap has an audit report, you should link to the audit report from the README of your repository or include the audit report file in your repository. 
You can also upload the audit report in a comment on the issue after creating the issue. 

## Allowlist review

Your Snap will be reviewed by the MetaMask Snaps team to ensure it is functional and well-designed. 
If the Snap requires an audit, the audit report will be reviewed to ensure that all vulnerabilities with "medium" or higher risk have been addressed. 
All Snaps will require at least 3 approvals to be allowlisted. 

## Directory listing

Once your Snap is on the allowlist, it will appear in the [MetaMask Snaps Directory](https://snaps.metamask.io). 
You can direct users to the directory to find and install your Snap. 

## Distribute your Snap

You should deploy a companion dapp where users can learn about your Snap and install it, or
integrate with your existing dapp.

If your Snap is designed to communicate with dapps, you can encourage other dapp developers to
[connect to your Snap](connect-to-a-snap.md).
