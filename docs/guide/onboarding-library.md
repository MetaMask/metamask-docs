# Onboarding Library

MetaMask now allows sites to register as onboarding the user, so that the user is redirected back to the initiating site after onboarding. This is accomplished through the use of the [metamask-onboarding library](https://github.com/MetaMask/metamask-onboarding).

At the end of onboarding, the text of the button will show the origin of the site the user is about to be redirected to. This is intended to help prevent phishing attempts, as it highlights that a redirect is taking place to an untrusted third party.

Here is a diagram of the interactions between the onboarding library, the forwarder, and the extension:

![Onboarding Library Diagram](https://user-images.githubusercontent.com/2459287/67541693-439c9600-f6c0-11e9-93f8-112a8941384a.png)
