---
title: Simple Math
description: A simple math example
toc_min_heading_level: 2
toc_max_heading_level: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<details>
<summary>

## addition
 <small></small>

</summary>

### Params (2) 

1. _a_: `integer`


2. _b_: `integer`

### Result

_c_: `integer`


### Example 

<Tabs>

<TabItem value="json" label="JSON">

#### Request

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "addition",
    "params": [
        2,
        2
    ]
}
```
#### Response

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": 4
}
```

</TabItem>
<TabItem value="javascript" label="Javascript">

#### Request

```javascript
const result = await ethereum.request({
  method: "addition",
  params: [
    2,
    2
  ]
});
```
#### Response

```javascript
console.log(result);
/**
 * Outputs:
 * 4
 */
```
</TabItem>
</Tabs>

</details>
<details>
<summary>

## subtraction
 <small></small>

</summary>

### Params (2) 

1. _a_: `integer`


2. _b_: `integer`

### Result

_c_: `integer`


### Example 

<Tabs>

<TabItem value="json" label="JSON">

#### Request

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "subtraction",
    "params": [
        4,
        2
    ]
}
```
#### Response

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": 2
}
```

</TabItem>
<TabItem value="javascript" label="Javascript">

#### Request

```javascript
const result = await ethereum.request({
  method: "subtraction",
  params: [
    4,
    2
  ]
});
```
#### Response

```javascript
console.log(result);
/**
 * Outputs:
 * 2
 */
```
</TabItem>
</Tabs>

</details>
