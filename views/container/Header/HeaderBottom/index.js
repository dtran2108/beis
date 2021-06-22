import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function HeaderBottom(props) {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname === '/en' ? 'home' : window.location.pathname);
  }, []);

  const checkActive = (paths) => {
    return paths.includes(currentPath.split('/')[currentPath.split('/').length - 1]);
  };

  return (
    <div id="wide-nav" className="header-bottom wide-nav flex-has-center hide-for-medium">
      <div className="flex-row container">
        <div className="flex-col hide-for-medium flex-center" style={{ height: '100%' }}>
          <ul className="nav header-nav header-bottom-nav nav-center nav-uppercase" style={{ height: '100%' }}>
            {props.menu.map((item) => (
              <li
                key={item.key}
                className={`d-flex align-items-center menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-2 current_page_item ${
                  checkActive(item.paths) && 'active'
                } ${item?.submenu?.length > 0 && 'has-dropdown'}`}>
                <Link href={item.link} aria-current="page">
                  <span className="nav-top-link">
                    {item.title}
                    {item?.submenu?.length > 0 && (
                      <FontAwesomeIcon icon={faChevronDown} style={{ width: '0.7rem', height: '0.7rem', marginLeft: '.5rem' }} />
                    )}
                  </span>
                </Link>
                {item?.submenu?.length > 0 && (
                  <ul className="sub-menu nav-dropdown nav-dropdown-default">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.key} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-33">
                        <Link href={subItem.link}>{subItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
