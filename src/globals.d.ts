declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}
