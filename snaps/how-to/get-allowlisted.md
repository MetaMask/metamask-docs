---
description: Submit your Snap for allowlisting on MetaMask extension.
sidebar_position: 7
---

# Get allowlisted

You have built your Snap, tested it, published it to npm, and now you are ready to make it available to MetaMask users. 
In the MetaMask Snaps Open Beta, an allowlist restricts which Snaps can be installed by users. 

:::note 
As part of the launch of MetaMask Snaps, individual Snaps must be put on an allowlist before they can be installed by users. This means that at this time, only selected, reviewed Snaps can be installed. In the future, this system will be opened up. By including a Snap on the allowlist, Consensys is not endorsing, recommending, or guaranteeing the safety of this Snap for your use or use for any reason. Always do your own research before installing any Snap.
:::

## Pre-requisites

To be added to the allowlist, a Snap must: 

- Make the source code publicly available. This does not mean that the Snap source code has to be published with an open-source license, but users should be able to read the source code of the Snap package. 
- Be published to npmjs.com. 
- Not impair our compliance with laws or regulations. 

Furthermore, any Snap that uses any of the following permissions pertaining to key management must also provide evidence of a third-party audit from an approved auditor, covering the Snap source code itself that is to run within the Snaps system along with any modules used for key management, with evidence of the commit hash that was audited and the commit that has any fixes documented in the audit report: 

- `snap_getBip32Entropy`
- `snap_getBip32PublicKey`
- `snap_getBip44Entropy`
- `snap_getEntropy`
- `snap_manageAccounts`

A list of approved third-party auditors and details about the audit process are available on the MetaMask Snaps Builder Engagement Program: 
[Approved Auditors](https://consensys.notion.site/Audit-process-1acbc67819dc4631b7a3d6c664e387a3). 

## Submit your Snap

When you are ready to submit your Snap, you should fill out the 
[MetaMask Snaps Directory Information Form](https://go.metamask.io/snaps-directory-request). 
You will need to provide the following information: 

- Email
    - So we can get in touch with you if we have any questions.
- Snap name
    - The name of your Snap. This **must** match the `proposedName` field from the Snap manifest.
    - You cannot use these words in the name: MetaMask, Snap, Meta, Mask.
- Snap builder name and URL
    - This should match the company, project, or personal site for your brand, where users can learn more about you.
- Snap website URL
    - This is a website where users can interact with your Snap. If your Snap does not require a website to be used, this can be left blank.
    - If your Snap works with multiple websites, you can include the URLs of additional websites in the _long description_, but this URL should be specifically for an "official" website designed to interact with your Snap.
- Snap short description
    - Brief description of the snap, 1 or 2 sentences long.
    - Try not to say "is a MetaMask Snap" -- users already know this!
- Snap long description
    - Description of the snap features and how to use them. You can use line breaks, lists, and even URLs here. You cannot use HTML.
    - If applicable, you should also describe quick steps to onboard and use the Snap. For example: `After installing the Snap, visit the companion dapp at https://voyager-snap.linea.build to connect an account and track your Linea Voyage progress.`
- Link to the public GitHub repo and npm package
    - If your Snap is hosted on a different site, like GitLab, you can link to that instead.
    - Please ensure that you have [correctly published the Snap package itself](../how-to/publish-a-snap.md).
- Snap version number to be allowlisted
    - Make sure that the version number in `package.json` and `snap.manifest.json` match, and that the Snap has been built with the correct `shasum`.
- Snap auditor and audit report
    - If your Snap uses one or more of the permissions listed above, please provide a PDF or link to where the audit report has been published. Otherwise, leave this field blank.
    - Please note: the audit report will be made public. You may ask your auditor to publish the report on their website and provide the link to us.
- Customer support details
    - To ensure a smooth user experience, we require customer support details for your Snap. This allows us to escalate any issues that the user is facing with your Snap. You can find more details [here](https://consensys.notion.site/Providing-User-Support-Information-cff79a7d896e4da6a2f8a17ce074e585). The Escalation Contact will be kept confidential between our teams, the rest of the information will be public. You must provide an Escalation Contact and at least one of the remaining items.
- Images
    - Here's your opportunity to provide compelling previews of your Snap! These can be screenshots or promotional images to help users get an idea of what your Snap can do. 
    - Please provide 3 images with the following dimensions: 960w x 540h. PNG or JPG are allowed.
- Demo video
    - This will help our team review your Snap. It may also be used by our marketing team.

## Allowlist review

Your Snap will be reviewed by the MetaMask Snaps team to ensure it is functional and well-designed. 
If the Snap requires an audit, the audit report will be reviewed to ensure that all vulnerabilities with "medium" or higher risk have been addressed. 
All Snaps will require at least 2 approvals to be allowlisted.

## Directory listing

Once your Snap is on the allowlist, it will appear in the [MetaMask Snaps Directory](https://snaps.metamask.io). 
You can direct users to the directory to find and install your Snap. 

## Distribute your Snap

You should deploy a companion dapp where users can learn about your Snap and install it, or
integrate with your existing dapp.

If your Snap is designed to communicate with dapps, you can encourage other dapp developers to
[connect to your Snap](connect-to-a-snap.md).

:::note
While testing your Snap, you may have designed your dapp to require MetaMask Flask. 
Once your Snap is allowlisted, you should update your dapp to support any flavor of MetaMask, 
and show the orange MetaMask logo instead of the purple Flask logo. 
:::

## Updating your Snap 

The allowlist uses strict versioning for all Snaps. When you have a new version of your Snap published to npm, you will need to submit it for allowlisting again. Users will not be able to install new versions until they are allowlisted. 

Please submit the [Directory Information Form](https://go.metamask.io/snaps-directory-request) again for any new version of your Snap. You can also update any information about your Snap with this form. For any fields that do not need to be changed, you can leave them blank or enter "n/a." When providing the version to be allowlisted, please also let let us know if previous versions of your Snap can remain allowlisted or should be replaced with this new version. 

If you need to update information about your Snap in the [Snaps Directory](https://snaps.metamask.io) without submitting a new version to the allowlist, [get in touch with our Builder Engagement Program](https://consensys.notion.site/Connect-with-us-7ffcbcc7981b4a4da7f1a1d39f6c127b).
