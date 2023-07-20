import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  return (
    <>
      <div className="navWrapper">
        <div className="BottomNav">
          <Link
            to="/"
            className={location.pathname === '/' ? 'buttonActive' : ''}
          >
            All Spells
          </Link>
          <Link
            to="/spellbook"
            className={location.pathname === '/spellbook' ? 'buttonActive' : ''}
          >
            My Spells
          </Link>
          <Link
            to="/equippedspells"
            className={
              location.pathname === '/equippedspells' ? 'buttonActive' : ''
            }
          >
            Equpped Spells
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
