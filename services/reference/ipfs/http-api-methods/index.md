# HTTP API methods

The IPFS documentation lists the [IPFS HTTP API methods](https://docs.ipfs.io/reference/http/api/).

Infura supports a subset of these which are detailed in this section.

:::info

All Infura IPFS methods require including your [API key](../../../../../developer-tools/dashboard/get-started/create-api/) and
[API key secret](../../../../../developer-tools/dashboard/how-to/secure-an-api/api-key-secret) in the request.

:::

## Arguments

Arguments are added through the special query string key `arg`:

```bash
curl -X POST -u "<API_KEY>:<API_KEY_SECRET>" "https://ipfs.infura.io:5001/api/v0/cat?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn"
```

Note that `arg` can be used multiple times to signify multiple arguments.

## Flags

Flags commonly used with the IPFS CLI are added through the query string. For example, the `--encoding=json` flag is the `&encoding=json` query parameter below:

```bash
> curl -X POST -u "<API_KEY>:<API_KEY_SECRET>" "https://ipfs.infura.io:5001/api/v0/object/get?arg=QmaaqrHyAQm7gALkRW8DcfGX3u8q9rWKnxEMmf7m9z515w&encoding=json"
{
  "Links": [
    {
      "Name": "index.html",
      "Hash": "QmYftndCvcEiuSZRX7njywX2AGSeHY2ASa7VryCq1mKwEw",
      "Size": 1700
    },
    {
      "Name": "static",
      "Hash": "QmdtWFiasJeh2ymW3TD2cLHYxn1ryTuWoNpwieFyJriGTS",
      "Size": 2428803
    }
  ],
  "Data": "CAE="
}
```

:::info

Some arguments may belong only to the CLI but appear here too. These usually belong to client-side processing of input, particularly in the `add` command.

:::

## HTTP status codes

Status codes used at the RPC layer are simple:

- `200` - The request was processed or is being processed (streaming)
- `500` - RPC endpoint returned an error
- `400` - Malformed RPC, argument type error, etc
- `403` - RPC call forbidden
- `404` - RPC endpoint doesn't exist
- `405` - HTTP Method Not Allowed

Status code `500` means that the requested RPC function _does_ exist, but IPFS was not able to fulfill the request because of an error. To know the reason, you have to look at the error message that is usually returned with the body of the response (if no error, check application logs).

Streaming endpoints fail as above, unless they have started streaming. That means they will have sent a `200` status code already. If an error happens during the stream, it will be included in a `Trailer` response header (some endpoints may additionally include an error in the last streamed object).

A `405`error may mean that you are using the wrong HTTP method (i.e. GET instead of POST), or that you are not allowed to call that method (i.e. due to CORS restrictions when making a request from a browser).

## NDJSON responses

<!-- markdown-link-check-disable -->

When a bunch of objects are requested, IPFS returns them in the Newline Delimited JSON, [NDJSON](http://ndjson.org/), format.

<!-- markdown-link-check-enable-->

This is because the calls are asynchronous and the responses are processed one object at a time.

:::warning

Response JSON includes `\n` separators which must be dealt with.

:::
