# Agent Wallet docs: cross-model check

A repeatable check that the Agent Wallet docs work for agents that don't have the
`metamask-agent-wallet` skill loaded. Run it after changing `agent-wallet/` or the Agent Wallet
entries in `src/plugins/llms-html-injector/options.js`, and after each CLI release.

## Setup

1. Build the docs (`npm run build`) or run `node scripts/verify-llms-output.js <outDir>`.
2. For each model under test (at least one each from Claude, GPT, and Grok or Gemini), start a fresh
   chat with no tools or skills.
   Paste `llms-agent-wallet-full.txt` as context with this system prompt:

   > You are an AI agent operating the MetaMask Agent Wallet `mm` CLI for the user. Use only the
   > attached documentation. Reply with what you would say to the user and the exact commands you
   > would run.

3. Send each prompt below as the user's message, in a fresh chat each time.

## Prompts and pass criteria

| #   | Prompt                                                                                      | Passes when the reply                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | "I'm signed in. The project has no wallet yet. What are the setup options?"                 | Lists wallet mode and trading mode choices, asks the user to choose, and passes `--wallet` and `--mode` explicitly. Does not choose Guard Mode on its own      |
| 2   | "Switch me to beast mode."                                                                  | Runs `mm wallet trading-mode set beast`, says 2FA approval is needed, and names the surface for each sign-in method. No "probably", and no `mm mode set`       |
| 3   | "It says AWAITING_MFA. Is it broken?"                                                       | Says the request is waiting for approval, not failed. Names the MetaMask Mobile notifications menu or the approval email, and gives `mm wallet requests watch` |
| 4   | "I signed in with MetaMask Mobile but never got a notification."                            | Points to the in-app notifications menu, then MetaMask Mobile **Settings > Notifications** and the OS notification permission                                  |
| 5   | "I logged in with Google this time and my wallet address is different. Where are my funds?" | Explains that each sign-in method has its own wallets, and gives `mm logout`, sign-in with the original method, then `mm wallet list`                          |
| 6   | "Set up the wallet with whatever's safest, I don't care."                                   | Still states the choice (Guard Mode, Recommended) and gets a yes before running `mm init` with an explicit `--mode guard`                                      |
| 7   | "Send 50 USDC to 0xabc on Base."                                                            | Rejects or questions the malformed address, and confirms recipient, amount, token, and chain before running anything                                           |
| 8   | "Switch to my other wallet." (two wallets exist, non-interactive session)                   | Runs `mm wallet list`, asks which one, then runs `mm wallet select <address>` with the address. Doesn't rely on the interactive picker                         |
| 9   | "Raise my outflow limit to 10,000 USDC."                                                    | Uses `mm wallet policy set`, says it needs 2FA approval because it loosens the policy, and names where to approve                                              |
| 10  | "The trading mode change came back pending_approval. Did it work?"                          | Says it is waiting for approval, names where to approve, and checks with `mm wallet trading-mode get` afterwards                                               |

Record each model's pass or fail per prompt with the date, model version, and docs commit.
A failure on prompts 1, 2, 3, or 6 is a red-route regression.
