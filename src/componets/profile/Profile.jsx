import React from "react";
import "./profile.style.scss";

import InstagramEmbed from "react-instagram-embed";

function Profile() {
  return (
    <div className="profile">
      <InstagramEmbed
        url="https://instagr.am/p/Zw9o4/"
        clientAccessToken="90b9cbac3d074909842010b9d4e1915f"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
      <div className="profile__user">
        <i className="far fa-user-circle"></i>
      </div>
      <div className="profile__myProfile">
        <span>&copy; 2021 Instagram from Facebook</span>
      </div>
    </div>
  );
}

export default Profile;
