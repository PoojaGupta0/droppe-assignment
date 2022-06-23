import * as React from "react";
import styles from "../../styles/button.module.css";

interface Props {
  children: string;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({ children, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);
