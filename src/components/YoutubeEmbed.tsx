import React from "react"
import styles from "./YoutubeEmbed.module.css"

interface YoutubeEmbedProps {
  url: string
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ url }) => {
  return (
    <div className={styles.wrapper}>
      {" "}
      {}
      <iframe src={url} allowFullScreen></iframe>
    </div>
  )
}

export default YoutubeEmbed
