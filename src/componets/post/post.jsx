import React from "react";
import "./Post.styles.scss";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <header className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </header>
      <div className="post__imageContainer">
        <img className="post__image" src={imageUrl} alt="" />
      </div>
      <footer className="post__footer">
        <span>{username}: </span>
        <p>{caption}</p>
      </footer>
    </div>
  );
}

export default Post;
