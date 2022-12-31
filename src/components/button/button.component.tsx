import React from 'react';
import styles from './button.module.css';

type Button = {
  type: any;
  onClick?: any;
  buttonStyle?: any;
  buttonSize?: any;
  style?: any;
  disabled?: boolean;
  children?: React.ReactNode;
};

const STYLES = ['btnPrimary', 'btnOutline'];
const SIZES = ['btnMedium', 'btnLarge'];

export default function Button({
  children,
  type,
  onClick,
  buttonStyle = STYLES[0],
  buttonSize = SIZES[0],
  style = {},
  disabled = false,
}: Button) {
  return (
    <button
      disabled={disabled}
      className={`${styles.btn} ${styles[buttonStyle]} ${styles[buttonSize]}`}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
