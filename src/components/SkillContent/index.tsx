import React from 'react'
import { usePluginData } from '@docusaurus/useGlobalData'
import CodeBlock from '@theme/CodeBlock'

const SKILL_KEY = 'Web3Auth/web3auth-mcp/refs/heads/main/skills/web3auth/SKILL.md'

export default function SkillContent(): JSX.Element {
  const files = usePluginData('docusaurus-plugin-virtual-files') as Record<string, string>
  const skill = files?.[SKILL_KEY] ?? ''

  return (
    <CodeBlock language="markdown" title="SKILL.md">
      {skill}
    </CodeBlock>
  )
}
