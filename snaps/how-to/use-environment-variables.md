---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

2. Specify the environment variables in your Snap's
    [configuration file](../learn/about-snaps/files.md#configuration-file) using the `environment` option.
    For example:

    <Tabs>
    <TabItem value="JavaScript">

    ```javascript title="snap.config.js"
    require("dotenv").config();
    
    module.exports = {
        environment: {
            SNAP_ENV: process.env.SNAP_ENV,
            PUBLIC_KEY: process.env.PUBLIC_KEY,
        },
        // Other options
    };
    ```
   
    </TabItem>
    <TabItem value="TypeScript">

    ```typescript title="snap.config.ts"
    import type { SnapConfig } from "@metamask/snaps-cli";
    import * as dotenv from "dotenv";
    dotenv.config();
    
    const config: SnapConfig = {
        environment: {
            SNAP_ENV: process.env.SNAP_ENV,
            PUBLIC_KEY: process.env.PUBLIC_KEY,
        },
        // Other options
    };
    
    export default config;
    ```
   
    </TabItem>
    </Tabs>

3. You can also use environment variables directly in your Snap.
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
