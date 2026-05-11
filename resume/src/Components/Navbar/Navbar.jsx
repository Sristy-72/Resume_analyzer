import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { AuthContext } from "../../utils/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, isLogin, setLogin, setUserInfo } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const closeMenus = () => {
    setShowMenu(false);
    setShowMobileMenu(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return false;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };

  const handleLogout = () => {
    closeMenus();
    navigate("/home", { replace: true });

    setTimeout(() => {
      localStorage.clear();
      setLogin(false);
      setUserInfo(null);
    }, 0);
  };

  const handleAnalyzeClick = (event) => {
    closeMenus();

    if (!isLogin) {
      event.preventDefault();      
      navigate("/login");
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/home" onClick={closeMenus}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <button
        type="button"
        className={styles.hamburger}
        onClick={() => {
          setShowMobileMenu(!showMobileMenu);
          setShowMenu(false);
        }}
        aria-label="Toggle navigation"
        aria-expanded={showMobileMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`${styles.navContent} ${
          showMobileMenu ? styles.navContentOpen : ""
        }`}
      >
        <div className={styles.links}>
          <Link
            to="/home#how-it-works"
            className={
              location.pathname === "/home" && location.hash === "#how-it-works"
                ? styles.active
                : ""
            }
            onClick={() => {
              closeMenus();
              if (location.pathname === "/home") {
                scrollToSection("how-it-works");
              }
            }}
          >
            How it works
          </Link>

          <Link
            to="/analyze"
            className={location.pathname === "/analyze" ? styles.active : ""}
            onClick={handleAnalyzeClick}
          >
            Analyze
          </Link>

          <Link
            to="/home#features"
            className={
              location.pathname === "/home" && location.hash === "#features"
                ? styles.active
                : ""
            }
            onClick={() => {
              closeMenus();
              if (location.pathname === "/home") {
                scrollToSection("features");
              }
            }}
          >
            Features
          </Link>

          <Link
            to="/home#faqs"
            className={
              location.pathname === "/home" && location.hash === "#faqs"
                ? styles.active
                : ""
            }
            onClick={() => {
              closeMenus();
              if (location.pathname === "/home") {
                scrollToSection("faqs");
              }
            }}
          >
            FAQs
          </Link>
        </div>

        <div className={styles.auth}>
          {isLogin && userInfo?.photoUrl ? (
            <div className={styles.profileWrapper}>
              <div
                className={styles.profileBox}
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className={styles.profileCircle}>
                  <img src={userInfo?.photoUrl} alt={userInfo?.name || "User"} />
                </div>

                <div className={styles.profileName}>{userInfo?.name}</div>

                <div className={styles.arrow}>▾</div>
              </div>

              {showMenu && (
                <div className={styles.dropdownMenu}>
                  <Link
                    to="/history"
                    className={styles.menuItem}
                    onClick={() => {
                      navigate("/history");
                      closeMenus();
                    }}
                  >
                    My History
                  </Link>

                  {userInfo?.role === "admin" && (
                    <Link
                      to="./admin"
                      className={[
                        styles.menuItem,
                        location.pathname === "/admin" ? styles.menuItem : null,
                      ].join(" ")}
                      onClick={() => {
                        navigate("/admin");
                        closeMenus();
                      }}
                    >
                      <div>Admin</div>
                    </Link>
                  )}

                  <div className={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn} onClick={closeMenus}>
                Login
              </Link>

              <Link to="/home#how-it-works" className={ styles.getStartedBtn } onClick={() => {
              closeMenus();
              if (location.pathname === "/home") {
                scrollToSection("how-it-works");
              }
            }}>
                Get Started
              </Link>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
