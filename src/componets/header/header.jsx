import React from "react";
import logo_text from "../../assets/Instagram_text_logo.svg";
import "./Header.styles.scss";

function Header() {
  return (
    <div className="header">
      <img src={logo_text} alt="" className="app__headerImage" />
      <div className="header_search">
        <i className="fas fa-search"></i>
        <input placeholder="Search" />
      </div>
      <div className="header__links">
        <i className="fas fa-home"></i>
        <i className="fab fa-facebook-messenger"></i>
        <i className="far fa-heart"></i>
        <i className="far fa-user-circle"></i>
      </div>
    </div>
  );
}

export default Header;
