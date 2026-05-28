# Polling Commands

In server wallet mode, signing and transaction commands return a `pollingId` instead of an immediate result. Use these commands to track and wait for results.

## `wallet requests list` Command

List all pending wallet requests.

### Syntax

```bash
mm-dev wallet requests list [--toon]
```

### Supported Flags

This command does not support any flags beyond `--toon`.

### Example

```bash
mm-dev wallet requests list
mm-dev wallet requests list --toon
```

## `wallet requests watch` Command

Wait for a specific wallet request to complete by its polling ID.

### Syntax

```bash
mm-dev wallet requests watch --polling-id <id> [--toon]
```

### Supported Flags

| Name           | Required | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| `--polling-id` | Yes      | Request polling ID returned by a previous command |

### Example

```bash
mm-dev wallet requests watch --polling-id abc-123
mm-dev wallet requests watch --polling-id abc-123 --toon
```
