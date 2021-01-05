import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/Logo.svg";
import { useAuth } from "../Utilities/store";

const Navigation: React.FC = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  return (
    <nav className="nav">
      <Link to="/" className="nav__link">
        <div className="nav__brand">
          <img className="nav__brand__logo" src={logo} alt="" />
          <h3 className="nav__brand__name">TreeMe</h3>
        </div>
      </Link>
      <ul className="nav__list">
        {!isAuthenticated ? (
          <>
            <li className="nav__list__item">
              <Link className="nav__list__link" to="/login">
                Sign In
              </Link>
            </li>
            <li className="nav__list__item nav__list__item--button">
              <Link className="nav__list__link" to="/register">
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <li className="nav__list__item nav__list__item--button">
            <Link className="nav__list__link" to="#">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
