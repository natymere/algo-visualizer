import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import navStyle from './nav.module.scss';

export default function Nav() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
  }, []);

  return (
    <nav className={navStyle.navbar}>
      <div className={navStyle.navbarContainer}>
        <Link href="/">
          <a className={navStyle.navbarLogo}>CS50 Algo Visualizer</a>
        </Link>

        <div className={navStyle.menuIcon} onClick={handleClick}>
          {click ? (
            <FontAwesomeIcon icon={faTimes} className={navStyle.faTimes}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faBars} className={navStyle.faBars}></FontAwesomeIcon>
          )}
        </div>
        {/*This is a comment*/}
        <ul className={click ? clsx(navStyle.navMenu, navStyle.active) : navStyle.navMenu}>
          <li className={navStyle.navItem}>
            <Link href="/sort">
              <a className={navStyle.navLinks} onClick={closeMobileMenu}>
                Sort
              </a>
            </Link>
          </li>
          <li className={navStyle.navItem}>
            <Link href="/pathfinding">
              <a className={navStyle.navLinks} onClick={closeMobileMenu}>
                Path Finding
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
