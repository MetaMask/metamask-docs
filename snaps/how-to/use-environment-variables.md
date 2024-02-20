---
sidebar_position: 3
---

# Use environment variables

You can use environment variables to compile your Snap.
This is useful if you want to use different variables for testing your Snap locally and publishing
your Snap.
You can use environment variables [on the command line](#use-environment-variables-on-the-command-line)
or [in a `.env` file](#use-environment-variables-in-a-env-file).

## Use environment variables on the command line

1. Specify environment variables on the command line.
    For example:

    ```bash
    PUBLIC_KEY=abc123 SNAP_ENV=dev
    ```

2. Build your Snap using the [Snaps CLI](../reference/cli/subcommands.md):

    ```bash
    yarn mm-snap build
    ```

## Use environment variables in a `.env` file

1. Specify environment variables in a `.env` file.
    For example:
    
    ```text title=".env"
    PUBLIC_KEY=abc123
    SNAP_ENV=dev
    ```

2. Install the [`envify`](https://github.com/hughsk/envify) package using Yarn or npm:

    ```bash
    yarn add envify
    ```
    
    or
    
    ```bash
    npm install envify
    ```

3. Use the environment variables in your Snap's
    [configuration file](../learn/about-snaps/files.md#configuration-file) by modifying the bundler object.
    For example:

    ```javascript title="snap.config.js"
    const envify = require("envify/custom");
    require("dotenv").config();
    
    module.exports = {
        cliOptions: {
            src: "./src/index.ts",
            port: 8080,
        },
        bundlerCustomizer: (bundler) => {
            bundler.transform(
                envify({
                    SNAP_ENV: process.env.SNAP_ENV,
                    PUBLIC_KEY: process.env.PUBLIC_KEY,
                }),
            );
        },
    };
    ```

4. You can also use environment variables directly in your Snap.
    For example:

    ```typescript title="index.ts"
    import { panel, text, heading } from '@metamask/snaps-ui';
    
    await snap.request({
        method: "snap_dialog",
        params: {
            type: "Alert",
            content: panel([
                heading("This custom alert is just for display purposes."),
                text("SNAP_ENV is ${process.env.SNAP_ENV}, PUBLIC_KEY is ${process.env.PUBLIC_KEY}"),
            ]),
        },
    });
    ```
