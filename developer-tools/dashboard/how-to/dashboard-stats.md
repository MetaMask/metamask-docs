---
description: View your Infura usage stats.
---

# View API request stats

The dashboard provides detailed analytics and real-time statistics about your API usage.
You can monitor the number of requests, track the most used methods, and identify any potential
issues or bottlenecks.
This data is crucial for optimizing your applications and ensuring they run smoothly.

## Specify stats to view

1. In the top menu of the [Infura dashboard](https://app.infura.io/), select **Stats**.
   The stats page displays the total volume of requests sent to Infura over the specified time period.
   By default, data is shown from the last 24 hours from all Web3 API keys.

2. To change the API key, make a selection from the API keys dropdown.

3. To change the stats time range, make a selection from the time dropdown.
   Time values are given in Coordinated Universal Time (UTC).
   For Web3 API usage, you can choose from the following options:

   - **Last 15 Minutes** - The last completed 15 minutes.
     This updates once a minute.
   - **Last 1 Hour** - The last fully completed hour, from 0 to 59 minutes and 59 seconds.
   - **Last 24 Hours** - The last fully completed 24 consecutive hours.
     This is the default.
   - **Last 7 Days** - The last fully completed seven consecutive days.
     A day appears once it has completed.
   - **Last 30 Days** - The last fully completed 30 days.
     A day appears once it has completed.

4. To view your IPFS usage, select **IPFS Usage** in the toggle in the top-right corner.
   You can choose to show data from the **Last 24 Hours** (default) or the **Last 7 Days**.

## Web3 stats charts

You can view your Web3 API usage stats in the following charts and tables.

### Requests Volume chart

This chart displays the total volume of requests sent to Infura using the selected API key(s) over
the selected time period.

### Product Request Volumes

This chart displays the aggregate request volumes for the top five API methods called using the
selected API key(s) over the selected time period.
To view stats for a particular product (network) instead of the default of all products, make a
selection from the products dropdown.
This change will impact what API methods are displayed in the
[Method Request Volumes](#method-request-volumes) chart.

### Method Request Volumes

This chart displays the aggregate request volumes for requests made on the top five networks using
the selected API key(s) over the selected time period.
To view stats for a particular method instead of the default of all methods, make a selection from
the methods dropdown.

### Requests Activity

This table displays the total request volumes and successful and failed requests, based on each
product (network) and method called using the selected API key(s) over the selected time period.

For more details about the failure status codes, select the two diagonal arrows to the right of the
**FAILED REQUESTS (%)** values.
This opens the Failed Requests Breakdown table, which displays an aggregated count of failed API
requests, grouped by the returned status codes.

### Eth_call activity

This table displays the activities made on the `eth_call` method, including contract addresses that
interacted with the selected API key(s).
This table only shows the `eth_call` activity for the last 30 minutes, and is not impacted by any
time period selection.

To view smart contract details on Etherscan, select any contract address.
A new tab opens with the details.

## IPFS stats charts

You can view your IPFS usage stats in the following charts.

### Data Transfer Up

This chart displays the amount of data sent to the IPFS service using the selected API key(s) over
the selected time period.

### Data Transfer Down

This chart displays the amount of data retrieved from the IPFS service using the selected API key(s)
over the selected time period.

### Total Storage

This chart displays the total amount of data stored by the selected API key(s) over the selected
time period.
