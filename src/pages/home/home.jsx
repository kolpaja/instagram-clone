import React, { useState, useEffect } from "react";
import "./home.styles.scss";
import logo_text from "../../assets/Instagram_text_logo.svg";
import { auth, db } from "../../database/firebaseUtils";

import Post from "../../componets/post/post";
import StoryLine from "../../componets/story-line/story-line";
// import logo_text from "../../assets/Instagram_text_logo.svg";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Home() {
  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //when user is logged in
        console.log("user: ", authUser);
        setUser(authUser);

        // displayName
        if (authUser.displayName) {
          //dont update username
        } else {
          //if we just created a new user
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        //when user is logged out
        setUser(null);
      }
    });

    return () => {
      //perform some clean up
      unsubscribe();
    };
  }, [user, username]);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };
  return (
    <div className="home">
      <StoryLine />

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={`${classes.paper} modal__body`}>
          <div className="modal__logo">
            <img src={logo_text} alt="" className="modal__logoImage" />
          </div>
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>

          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>

          <Button onClick={signUp}>Sign Up</Button>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={`${classes.paper} modal__body`}>
          <div className="modal__logo">
            <img src={logo_text} alt="" className="modal__logoImage" />
          </div>

          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>

          <Button onClick={signIn}>Log In</Button>
        </div>
      </Modal>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="modal__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Login</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

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
