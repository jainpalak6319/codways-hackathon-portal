import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <Logo size={40} />
          <div className="navbar-brand-text">
            <span className="brand-name">CODWAYS</span>
            <span className="brand-tagline">Hackathon Portal</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/hackathons"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Hackathons
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/resources"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Resources
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          <Link to="/login" className="btn-login">
            Login
          </Link>

          <Link to="/signup" className="btn-signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;