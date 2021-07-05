import React from "react";
import logo_text from "../../assets/Instagram_text_logo.svg";
import "./header.styles.scss";

function Header() {
  return (
    <div className="header">
      <img src={logo_text} alt="" className="app__headerImage" />
    </div>
  );
}

export default Header;
