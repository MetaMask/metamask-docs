import React from "react";
import styles from "./YoutubeEmbed.module.css";

interface YoutubeEmbedProps {
  url: string;  
}

export default function YoutubeEmbed(props: YoutubeEmbedProps) {
  return (
    <div className={styles.wrapper}>
      <iframe src={props.url} allowFullScreen></iframe>
    </div>
  );
}