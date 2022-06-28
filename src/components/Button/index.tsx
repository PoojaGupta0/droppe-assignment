import React from "react";

import styles from "../../styles/button.module.css";

interface Props {
  children: string;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({ children, onClick }) => (
  <button data-testid="button" className={styles.button} onClick={onClick}>
    {children}
  </button>
);
