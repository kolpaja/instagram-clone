import React, { useState, useEffect } from "react";
import "./home.styles.scss";
import Post from "../../componets/post/post";
import StoryLine from "../../componets/story-line/story-line";

import { db } from "../../database/firebaseUtils";

function Home() {
  const [posts, setPosts] = useState([]);
  //useEffect => runs a piece of code based on a specific condition

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    );
  }, [posts]);

  return (
    <div className="home">
      <StoryLine />
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.post.username}
          caption={post.post.caption}
          imageUrl={post.post.imageUrl}
        />
      ))}
    </div>
  );
}

export default Home;
