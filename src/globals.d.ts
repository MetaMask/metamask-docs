declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

// Declare Docusaurus virtual files module
declare module '@site/.docusaurus/docusaurus-plugin-virtual-files/default/files.json' {
  const files: Record<string, string>
  export default files
}

// Alternative path that might be used
declare module '../../../.docusaurus/docusaurus-plugin-virtual-files/default/files.json' {
  const files: Record<string, string>
  export default files
}
