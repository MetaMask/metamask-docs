import { Player } from '@lottiefiles/react-lottie-player'
import { useEffect, useState } from 'react'

const lottieUrl = require('../../utils/w3a-lottie.json')

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 400, height: 400 })

  useEffect(() => {
    setWindowDimensions(getWindowDimensions())

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default function ModalAnim() {
  const { width } = useWindowDimensions()
  let style = {}

  if (width > 700) {
    style = {
      width: 600,
    }
  }
  if (width < 700) {
    style = {
      width: width - 50,
    }
  }

  return (
    <div>
      <Player loop autoplay controls={false} src={lottieUrl} style={style} />
    </div>
  )
}
