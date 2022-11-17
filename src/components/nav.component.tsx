import { faBars, faHamburger, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from './button.component';
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

{
  /* <nav className={navStyle['navbar']}>
      <div className={navStyle['container']}>
        <div className={navStyle['navbar-header']}>
          <button
            className={navStyle['navbar-toggler']}
            data-toggle="open-navbar1"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <a href="/">
            <h4>
              <span>CS50</span> Algo Visualizer
            </h4>
          </a>
        </div>

        <div className={navStyle['navbar-menu']} id="open-navbar1">
          <ul className={navStyle['navbar-nav']}>
            <li className={navStyle['active']}>
              <a href="#">Home</a>
            </li>
            <li
              className={navStyle['navbar-dropdown']}
              id="my-dropdown-id"
              onClick={() => {
                console.log('dasda');
                setDropdown(!dropdown);
              }}
            >
              <a
                href="#"
                className={navStyle['dropdown-toggler']}
                data-dropdown="my-dropdown-id"
              >
                Sorting Algorithms <FontAwesomeIcon icon={faAngleDown} />
              </a>
              <ul
                className={
                  dropdown
                    ? navStyle['dropdown']
                    : `${navStyle['dropdown']} ${navStyle['show']}`
                }
              >
                <li>
                  <a href="#">Actions</a>
                </li>
                <li>
                  <a href="#">Something else here</a>
                </li>
                <li className={navStyle['separator']}></li>
                <li>
                  <a href="#">Seprated link</a>
                </li>
                <li className={navStyle['separator']}></li>
                <li>
                  <a href="#">One more seprated link.</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Path Finding</a>
            </li>
          </ul>
        </div>
      </div>
    </nav> */
}
