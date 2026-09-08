// Docusaurus declares `@docusaurus/*` and `@theme/*` here. A full `tsc` run reaches this package
// transitively through whichever source file happens to import `@theme/*`, but the `tsc-files`
// pre-commit hook builds a program from the staged files alone, so nothing guarantees that import
// is present. Referencing it directly makes the declarations unconditional in both.
/// <reference types="@docusaurus/module-type-aliases" />

declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

// CSS/SCSS module declarations. Docusaurus provides these ambiently via
// `@docusaurus/module-type-aliases` for the full `tsc` build, but the
// `tsc-files` pre-commit hook type-checks staged files in an isolated tsconfig
// that only includes this file, so components importing a `*.module.css`/`.scss`
// stylesheet fail with TS2307 unless the declaration is available here too.
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.mdx' {
  import type { ComponentType } from 'react'

  type MdxMediaContent = {
    type: 'image' | 'video' | 'youtube'
    url?: string
    youtubeId?: string
    alt?: string
    caption?: string
    poster?: string
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
  }

  const MDXComponent: ComponentType
  export default MDXComponent
  export const contentType: 'text' | 'media' | 'hybrid' | undefined
  export const mediaContent: MdxMediaContent | undefined
  export const frontMatter: Record<string, unknown> | undefined
}
