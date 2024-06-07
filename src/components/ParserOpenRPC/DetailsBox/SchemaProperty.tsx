import React from "react";
import { MDContent } from "./MDContent";
import styles from "./styles.module.css";

interface SchemaPropertyProps {
  title: string;
  type?: string;
  required?: boolean;
  description?: string;
}

interface TagProps {
  name: string;
}

export const renderEnum = (enumValues: string[]) => (
  <div className={styles.enumWrapper}>
    <div className="padding--md">Possible enum values</div>
    {enumValues.map((value, index) => (
      <div key={index} className={styles.enumItem}>
        <div className={styles.enumTitle}>{value}</div>
      </div>
    ))}
  </div>
);

export const SchemaProperty = ({ title, type, required, description }: SchemaPropertyProps) => {
  return (
    <div className="padding-vert--md">
      <div
        className="row row--align-center row--no-gutters padding-bottom--sm"
        style={{ justifyContent: "space-between" }}
      >
        <div>
          <strong>{title}</strong>
          <span className={styles.textAltColor}> {type} </span>
        </div>
        {required && <span className={styles.textErrorColor}>required</span>}
      </div>
      <p className="margin--none">
        <MDContent content={description} />
      </p>
    </div>
  );
};

export const Tag = ({ name }: TagProps) => {
  const bgStyle = {
    "MetaMask": "#4DB6AC",
    "Restricted": "#FFECB3",
    "Deprecated": "#7E57C2",
  };
  return (
    <div
      className={styles.tagItem}
      style={{ backgroundColor: `${bgStyle[name] ? bgStyle[name] : "#FFCDD2"}` }}
    >
      {name}
    </div>
  );
};
