declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
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
