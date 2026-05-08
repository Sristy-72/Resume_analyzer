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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return false;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };

  const handleLogout = () => {
    setShowMenu(false);
    navigate("/home", { replace: true });

    setTimeout(() => {
      localStorage.clear();
      setLogin(false);
      setUserInfo(null);
    }, 0);
  };

  const handleAnalyzeClick = (event) => {
    setShowMenu(false);

    if (!isLogin) {
      event.preventDefault();
      alert("Please login first");
      navigate("/login")
    }
  };

  return (
    <div className={styles.navbar}>
      {/* LOGO */}
      <div className={styles.logo}>
        <Link
          to="/home"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <img src={logo} alt="logo" />
        </Link>
      </div>

      {/* LINKS */}
      <div className={styles.links}>
        <Link
          to="/home#how-it-works"
          className={
            location.pathname === "/home" && location.hash === "#how-it-works"
              ? styles.active
              : ""
          }
          onClick={() => {
            setShowMenu(false);
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
            setShowMenu(false);
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
            setShowMenu(false);
            if (location.pathname === "/home") {
              scrollToSection("faqs");
            }
          }}
        >
          FAQs
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.auth}>
        {isLogin && userInfo?.photoUrl ? (
          <div className={styles.profileWrapper}>
            {/* PROFILE BUTTON */}
            <div
              className={styles.profileBox}
              onClick={() => setShowMenu(!showMenu)}
            >
              <div className={styles.profileCircle}>
                <img src={userInfo?.photoUrl} alt={userInfo?.name || "User"} />
              </div>

              <div className={styles.profileName}>{userInfo?.name}</div>

              <div className={styles.arrow}>▼</div>
            </div>

            {/* DROPDOWN */}
            {showMenu && (
              <div className={styles.dropdownMenu}>
                <Link
                  to="/history"
                  className={styles.menuItem}
                  onClick={() => {
                    navigate("/history");
                    setShowMenu(false);
                  }}
                >
                  My History
                </Link>
                {userInfo?.role === "admin" && (
                  <Link
                    to={"./admin"}
                    className={[
                      styles.menuItem,
                      location.pathname === "/admin" ? styles.menuItem : null,
                    ].join(" ")} onClick={()=>{
                      navigate("/admin");
                      setShowMenu(false);
                    }
                    }
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
            <Link to="/login" className={styles.loginBtn}>
              Login
            </Link>

            <Link to="/" className={styles.getStartedBtn} >
              Get Started
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
