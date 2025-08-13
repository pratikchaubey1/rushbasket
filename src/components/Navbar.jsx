import React, { useRef, useState } from 'react';
import { navbarStyles } from '../assets/dummyStyles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navItems } from '../assets/Dummy';
import logo from '../assets/logo.png';
import { FiMenu, FiUser, FiX } from 'react-icons/fi';
import { FaOpencart } from 'react-icons/fa';
import { usecart } from '../CartContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartcount } = usecart();

  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isopen, setisopen] = useState(false);
  const [cartbounce, setcartbounce] = useState(false);
  const prevcartcountref = useRef(cartcount);

  const [isloggedin, setloggedin] = useState(
    Boolean(localStorage.getItem('authToken'))
  );

  const mobilemenuref = useRef(null);

  // login function
  const handlelogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.clear();
    window.dispatchEvent(new Event('authStateChanged'));
    navigate('/');
  };

  return (
    <nav
      className={`${navbarStyles.nav} ${
        scrolled ? navbarStyles.scrolledNav : navbarStyles.unscrolledNav
      }`}
    >
      <div className={navbarStyles.borderGradient} />
      <div className={navbarStyles.particlesContainer}>
        <>
          <div
            className={`${navbarStyles.particle} w-24 h-24 bg-emerald-500/5 -top-12 left-1/4 ${navbarStyles.floatAnimation}`}
          />
          <div
            className={`${navbarStyles.particle} w-32 h-32 bg-green-500/5 -bottom-16 left-2/3 ${navbarStyles.floatSlowAnimation}`}
          />
          <div
            className={`${navbarStyles.particle} w-16 h-16 bg-teal-500/5 -top-8 left-3/4 ${navbarStyles.floatSlowerAnimation}`}
          />
        </>
      </div>

      {/* logo */}
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          <Link to="/" className={navbarStyles.logoLink}>
            <img
              src={logo}
              alt="Rush basket logo"
              className={`${navbarStyles.logoImage} ${
                scrolled ? 'h-10 w-10' : 'h-12 w-12'
              }`}
            />
            <span className={navbarStyles.logoText}>RushBasket</span>
          </Link>

          {/* navbar */}
          <div className={navbarStyles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setActiveTab(item.path)}
                className={`${navbarStyles.navItem} ${
                  activeTab === item.path
                    ? navbarStyles.activeNavItem
                    : navbarStyles.inactiveNavItem
                }`}
              >
                <div className="flex items-center">
                  <span
                    className={`${navbarStyles.navIcon} ${
                      activeTab === item.path
                        ? navbarStyles.activeNavIcon
                        : navbarStyles.inactiveNavIcon
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                <div
                  className={`${navbarStyles.navIndicator} ${
                    activeTab === item.path
                      ? navbarStyles.activeIndicator
                      : navbarStyles.inactiveIndicator
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className={navbarStyles.iconsContainer}>
            {isloggedin ? (
              <button
                onClick={handlelogout}
                className={navbarStyles.loginLink}
              >
                <FiUser
                  className={navbarStyles.loginIcon}
                  aria-label="logout"
                />
                <span className="ml-1 text-white">Logout</span>
              </button>
            ) : (
              <Link to="/login" className={navbarStyles.loginLink}>
                <FiUser className={navbarStyles.loginIcon} />
                <span className="ml-1 text-white">Login</span>
              </Link>
            )}

            <Link to="/cart" className={navbarStyles.cartLink}>
              <div className="relative">
                <FaOpencart
                  className={`${navbarStyles.cartIcon} ${
                    cartbounce ? 'animate-bounce' : ''
                  }`}
                />
                {cartcount > 0 && (
                  <span className={navbarStyles.cartBadge}>{cartcount}</span>
                )}
              </div>
            </Link>

           <button
          onClick={() => setisopen(!isopen)}
         className={navbarStyles.hamburgerButton}
        aria-label={isopen ? 'close menu ' : 'open menu '}
      >
          {isopen ? (
         <FiX className="h-6 w-6 text-white" />
       ) : (
        <FiMenu className="h-6 w-6 text-white" />
        )}
         </button>

          </div>
        </div>
      </div>
         

    </nav>
  );
}

export default Navbar;
