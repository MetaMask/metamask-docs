import { ReactNode } from 'react'

export interface IntegrationStep {
  content?: ReactNode // Make optional for media-only steps
  contentType?: 'text' | 'media' | 'hybrid' // Default: 'text'
  mediaContent?: {
    type: 'image' | 'video' | 'youtube'
    url?: string // For images or regular videos
    youtubeId?: string // For YouTube videos (just the video ID)
    alt?: string
    caption?: string
    poster?: string // For videos
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
  }
  pointer?: {
    filename: string
    variableName: string
    fileContent: string
    range: string
  }
}

export interface Integration {
  filenames: string[]
  files: Record<string, string>
  steps: IntegrationStep[]
  stepIndex: number
  embedLink: string
  sourceCodeLink: string
}

export interface DisplayChoice {
  key: string
  displayName: string
}

export interface IntegrationBuilder {
  displayName: string
  options: Record<
    string,
    {
      displayName: string
      default: string
      type: 'dropdown' | 'product_selection'
      choices: DisplayChoice[]
    }
  >

  build(values: Record<string, string>, files: Record<string, any>, stepIndex: number): Integration
}
