import styles from "./Logo.module.css";
import React from "react";

export const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <span>M</span>
      <span>O</span>
      <span>V</span>
      <span>I</span>
      <span>E</span>
      <span>F</span>
      <span>I</span>
      <span>X</span>
    </div>
  );
};
