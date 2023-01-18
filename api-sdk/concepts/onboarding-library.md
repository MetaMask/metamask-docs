# Onboarding library

As an Ethereum enabled site developer, sending users offsite to install MetaMask presents challenges.
Most notably, you must inform the user to return to your site and refresh their browser after the
installation.
Your site detects the user's newly installed MetaMask extension only after that refresh.

MetaMask now provides an [onboarding library](https://github.com/MetaMask/metamask-onboarding)
designed to improve and simplify the onboarding experience.
The new library exposes an API to initiate the onboarding process.
In the process, it registers your site as the origin of the onboarding request.
MetaMask checks for this origin after the user completes the onboarding flow.
If it finds an origin, the final confirmation button of the MetaMask onboarding flow indicates that
the user will be redirected back to your site.

Learn how to [use the onboarding library](../how-to/use-onboarding-library.md).

The following is a diagram of the interactions between the onboarding library, the forwarder, and
the extension:

![Onboarding Library Diagram](https://user-images.githubusercontent.com/2459287/67541693-439c9600-f6c0-11e9-93f8-112a8941384a.png)
