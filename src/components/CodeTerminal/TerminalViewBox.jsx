import React, { useMemo } from "react"
import Icon from "../Icon/Icon"
import { API_URL } from "../../lib/constants"
import Link from "@docusaurus/Link"
import CodeBlock from "@theme/CodeBlock"

const TerminalViewBox = ({
  url = "{network}",
  id = "{ID}",
  method = "method",
  params = [],
  logged = false,
  hideFooter = false,
  response,
  isExpansionNetwork = false,
}) => {
  const exampleRequest = useMemo(() => {
    const prepareParams =
      params.length === 0
        ? ""
        : params.map((param) => {
            if ("boolean" === typeof param) return `${param}`
            return `"${param}"`
          })
    if (isExpansionNetwork) {
      return `curl -X 'GET' \\\n'https://${url}'`
    }
    return `curl https://${url}/v3/${id} \\\n  -X POST \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "jsonrpc": "2.0",\n    "method": "${method}",\n    "params": [${params.length === 0 ? "" : prepareParams}],\n    "id": 1\n  }'`
  }, [url, id, method, params, isExpansionNetwork])

  return (
    <div className="terminal-wrapper">
      <CodeBlock language="cURL">{exampleRequest}</CodeBlock>
      {!hideFooter && (
        <div style={{ marginTop: "-20px" }}>
          {logged && (
            <div className="code-terminal-footer">
              {response && (
                <pre style={{ backgroundColor: "#292A35" }}>{response}</pre>
              )}
            </div>
          )}
          <div className="code-terminal-footer bg-light-gray">
            {logged ? (
              <div className="btn-row">
                <button className="submit-btn" type="submit">
                  <span>Send Request</span>
                  <Icon name="arrow-right" />
                </button>
              </div>
            ) : (
              <p className="description-row">
                <Link target="_blank" to={`${API_URL}/login`} rel="noreferrer">
                  Sign in
                </Link>{" "}
                or{" "}
                <Link
                  target="_blank"
                  to={`${API_URL}/register`}
                  rel="noreferrer"
                >
                  create an account
                </Link>{" "}
                and reload the page to edit real requests
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TerminalViewBox
