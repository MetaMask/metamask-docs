---
description: Share your Infura API key
sidebar_position: 5
---

# Share your API key with Infura users

You can share access to your Infura API keys by inviting existing Infura account members.

## Share API key access

To share an API key:

1. In the Infura dashboard, select the API that you want to share.
1. Select the **API Key Sharing** tab.
1. Select **INVITE MEMBERS** in the top right.

   <div class="left-align-container">
     <div class="img-large">
       <img
         src={require('../../images/invite-member-button.png').default}
       />
     </div>
   </div>

1. Input one or more user emails, select the [user role](#user-roles), and select **SUBMIT**.
1. Confirm your email address and select **CONFIRM**.

:::note

- Infura blocks non-Infura account holders from collaborating on Infura API keys.

:::

## User roles

### Owner

- The Infura account owner who created the API key.

:::note

You cannot change ownership of an API key.

:::

### Admin

- Has read/write access to the API key name, security settings, and collaborator list.
- Can edit security settings, change someone’s role, and revoke and resend invites.
- Can view the API key statistics.
- Admins cannot:
  - Delete the API key or the owner.
  - View billing details.
  - View any other API key's stats.

### Contributor

- Has read-only access to the API key details and stats.
- Has limited access to the security settings and can only view the API key secret.
- Contributors cannot:
  - View the API key sharing settings.
  - View billing details
  - View any other API key's stats.

## Accept an invitation

You'll receive an email invitation to access an API key. In the email invitation, select **CONFIRM EMAIL ADDRESS**
and accept the invitation.

You can view all keys that you own, and all keys shared with you, by selecting **Key Sharing** in the **Settings** menu.

## Update user role or remove user

1. In the Infura dashboard, select the API key that the user is assigned to.
1. Select the **API Key Sharing** tab.
1. Select the vertical ellipsis icon next to the relevant user.

   - To remove a user, select **Remove Member**. They are removed immediately.
   - To update a user's role, select **Update Role**.

     <div class="left-align-container">
       <div class="img-large">
         <img
           src={require('../../images/update-role.png').default}
         />
       </div>
     </div>

1. Upgrade or downgrade accordingly and select **UPDATE ROLE**.

## Revoke or resend an invite

While invitations remain in a pending state, they can be revoked or sent again.

1. In the Infura dashboard, select the API key for the user.

1. Select the **API Key Sharing** tab.

1. Select the vertical ellipsis icon next to the relevant user and select
   **Revoke Invitation** or **Resend Invite** and follow the steps.
