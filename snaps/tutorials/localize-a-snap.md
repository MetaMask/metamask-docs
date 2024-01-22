---
description: Display your Snap's UI and metadata in your users' language.
sidebar_position: 3
---

# Localize a Snap

This tutorial walks you through localizing your Snap. This is done in two places:

- in your Snaps's code, by building upon the [`snap_getLocale`](../reference/rpc-api.md#snap_getlocale) function
- in the manifest, where fields like title and description can be shown in the user's language

## Localize the Snap UI

In your Snap code, you can determine the user's language by using the [`snap_getLocale`](../reference/rpc-api.md#snap_getlocale) function. To call the `snap_getLocale` function in your Snap code, first request the required permission by adding it to the `initialPermissions` field in your `snap.manifest.json` file.

```json
{
  "version": "1.1.0",
  //...
  "initialPermissions": {
    // ...
    "snap_getLocale": {}
  }
}
```

With this permission granted, your Snap code can call `snap_getLocale` to obtain a language code (such as "en" or "es"). You can then decide how to use this language code to customize the functionality of your Snap's UI.

For example, you can create files named `snap/locales/<language_code>.json with the language of your choice in the following manner:

```json
{
  "locale": "en",
  "messages": {
    "hello": {
      "message": "Hello, world!",
      "description": "The message that is returned when the `hello` method is called."
    }
  }
}
```

You can use these files with a localization module. The following is an example of a working module:

```ts
import da from '../locales/da.json';
import en from '../locales/en.json';
import nl from '../locales/nl.json';

// Fallback language, to be used if there is not a valid translation in
// the requested locale.
const FALLBACK_LANGUAGE: Locale = 'en';

export const locales = {
  da: da.messages,
  en: en.messages,
  nl: nl.messages,
};

export type Locale = keyof typeof locales;

export async function getMessage(id: keyof (typeof locales)[Locale]) {
  const locale = (await snap.request({ method: 'snap_getLocale' })) as Locale;
  const { message } = locales[locale]?.[id] ?? locales[FALLBACK_LANGUAGE][id];

  return message;
}
```

The `getMessage` function can then be used anywhere in your Snap code to localize a message, falling back to english if the user's locale wasn't found.

Here's an example of usage in a Snap's RPC request handler:

```ts
import { rpcErrors } from '@metamask/rpc-errors';
import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';

import { getMessage } from './locales';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'hello':
      return await getMessage('hello');

    default:
      throw rpcErrors.methodNotFound({
        data: { method: request.method },
      });
  }
};
```

## Localize the Snap's manifest

In addition to containing purely technical metadata like `version` or `shasum`, the Snap manifest also contains textual data such as `proposedName` and `description`. These manifest fields can be localized as well.

Here's an example of a localized manifest file:

```json
{
  "version": "1.1.1",
  "description": "{{ description }}",
  "proposedName": "{{ name }}",
  // ...
  "source": {
    "shasum": "XXX",
    // ...
    "locales": [
      // ...
      "locales/da.json",
      "locales/en.json",
      "locales/nl.json"
    ]
  },
  "initialPermissions": {
    // ...
    "snap_getLocale": {}
  },
  "manifestVersion": "0.1"
}
```

The first step is adding all available locales to the `source.locales` section. This will point to the files we created in the previous section. The example locale file we provided above is exactly in the format that MetaMask needs to localize the manifest.

Then, for any field that needs to be localized, simply replace the text of the field with `{{ fieldName }}`.

MetaMask will look for an appropriate locale from the files you provided, and replace the template string with its translation in the UI. If the user's locale is not found, it will fallback to `"en"`.