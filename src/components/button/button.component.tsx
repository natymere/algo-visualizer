import Link from 'next/link';
import React from 'react';
import styles from './button.module.scss';

type Button = {
  type: any;
  onClick?: any;
  buttonStyle?: any;
  buttonSize?: any;
  style?: any;
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
}: Button) {
  return (
    <button
      className={`${styles.btn} ${styles[buttonStyle]} ${styles[buttonSize]}`}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
