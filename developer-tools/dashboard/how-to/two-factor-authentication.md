---
description: Set up two-factor authentication
sidebar_position: 4
---

# Set up two-factor authentication

Two-factor authentication (2FA) is a security measure that adds an extra layer of protection to
your online accounts. It requires you to provide two types of identification factors to verify your
identity before you can access your accounts.

## Enable 2FA on your account

To enable 2FA authentication on your account, on the dashboard go to **Settings** -> **Account**, and
select **Enable**.

<img src={require("../../images/enable2fa.png").default} />

Scan the QR code with your authenticator, and enter the initial six-digit token. Select **Verify** to proceed.

<p align="center">
  <img src={require("../../images/enter_token.png").default} />
</p>

:::warning Important

**Save your backup code to a secure location.**
If you ever lose access to your device, you can use this code to verify your identity.

:::

Select **Continue** to finish the process.

<p align="center">
  <img src={require("../../images/backup_code.png").default} />
</p>

:::info

Most password managers allow you to add secure notes to an entry; you can add the backup code to the
Infura login entry. Alternatively, write it down and store it somewhere safe.

:::

Next time you log in to Infura, you'll be asked for your 2FA token in addition to your username and password.

## Disable 2FA on your account

To disable 2FA on your account, on the dashboard go to **Settings** -> **Account**, and select **Disable 2FA**.

<img src={require("../../images/disable2fa.png").default} />

## Lost your 2FA device?

If you lose your 2FA device, you can still log in using your backup code. Alternatively, you can recover your account by raising a support request with Infura.

:::warning Important

**Keep your backup code safe!**
If you raise a support request to recover your account, Infura support must confirm that you're the owner of the account.

:::

To log in without a 2FA device, log in to Infura with your username and password, and when confronted with the 2FA screen, select **Backup Code.** If you can't find it, your only option is to select **Recover your Account** and open a support case.

<p align="center">
  <img src={require("../../images/login2FA.png").default} />
</p>

:::info

If you lose your 2FA device and must recover your account or log in using the backup code, then 2FA authentication is automatically disabled, and you must enable it again.

:::
