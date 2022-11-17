import Link from 'next/link';
import React from 'react';
import styles from './button.module.scss';

type Button = {
  type: any;
  onClick?: any;
  buttonStyle?: any;
  buttonSize?: any;
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
}: Button) {
  return (
    <>
      <Link href="/">
        <button
          className={`${styles[buttonStyle]} ${styles[buttonSize]}`}
          type={type}
          onClick={onClick}
        >
          {children}
        </button>
      </Link>
    </>
  );
}

Button.getLayout = function getLayout() {
  
}
