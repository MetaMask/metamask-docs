import React, { useState, useEffect, useRef, useCallback } from 'react'
import classNames from 'classnames'
import { IntegrationStep } from '../interfaces'
import styles from './MediaStep.module.css'

interface MediaStepProps {
  step: IntegrationStep
  className?: string
  isVisible?: boolean // Add visibility prop for lazy loading
}

const MediaStep: React.FC<MediaStepProps> = ({ step, className, isVisible = true }) => {
  const [isLoading, setIsLoading] = useState(true) // Start loading immediately
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  if (!step.mediaContent) {
    return (
      <div className={classNames(styles.mediaContainer, className)}>
        <div className={styles.mediaError}>
          <p>No media content available</p>
        </div>
      </div>
    )
  }

  const {
    type,
    url,
    youtubeId,
    alt,
    caption,
    poster,
    autoplay = false,
    loop = false,
    muted = true,
  } = step.mediaContent

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    setHasError(false)
  }, [])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
  }, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  // Reset when URL changes
  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setIsPlaying(false)
  }, [url])

  const renderMedia = () => {
    if (type === 'youtube') {
      const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&showinfo=0${autoplay ? '&autoplay=1' : ''}${muted ? '&mute=1' : ''}`

      return (
        <iframe
          className={styles.youtubePlayer}
          src={youtubeUrl}
          title={`${type === 'youtube' ? 'YouTube video' : 'Video'} - ${caption || 'Media content'}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
        />
      )
    }

    if (type === 'video') {
      return (
        <video
          ref={videoRef}
          className={styles.videoPlayer}
          src={url}
          poster={poster}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          controls
          playsInline
          preload="metadata" // Load metadata immediately
          onLoadedData={handleLoad}
          onError={handleError}
          onPlay={handlePlay}
          onPause={handlePause}>
          Your browser does not support the video tag.
        </video>
      )
    }

    if (type === 'image') {
      return (
        <img
          ref={imageRef}
          className={styles.imageDisplay}
          src={url}
          alt={alt || 'Image content'}
          loading="eager" // Load immediately
          onLoad={handleLoad}
          onError={handleError}
        />
      )
    }

    return null
  }

  return (
    <div className={classNames(styles.mediaContainer, className)}>
      {/* Loading State */}
      {isLoading && !hasError && (
        <div className={styles.mediaLoading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading {type === 'youtube' ? 'YouTube video' : type}...</p>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className={styles.mediaError}>
          <div className={styles.errorIcon}>⚠️</div>
          <p>Failed to load {type === 'youtube' ? 'YouTube video' : type}</p>
          <button
            className={styles.retryButton}
            onClick={() => {
              setIsLoading(true)
              setHasError(false)
            }}>
            Retry
          </button>
        </div>
      )}

      {/* Media Content */}
      <div
        className={classNames(styles.mediaContent, {
          [styles.hidden]: isLoading || hasError,
          [styles.playing]: isPlaying,
        })}>
        {renderMedia()}

        {/* Caption */}
        {caption && !isLoading && !hasError && (
          <div className={styles.mediaCaption}>
            <p>{caption}</p>
          </div>
        )}

        {/* Video Play Status Indicator */}
        {type === 'video' && !isLoading && !hasError && (
          <div
            className={classNames(styles.playStatus, {
              [styles.visible]: isPlaying,
            })}>
            <div className={styles.playIndicator}>▶️ Playing</div>
          </div>
        )}
      </div>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default React.memo(MediaStep)
