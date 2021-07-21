import React, { useState, useEffect } from "react";
import "./Home.styles.scss";
import logo_text from "../../assets/Instagram_text_logo.svg";
import { auth, db } from "../../database/firebaseUtils";

import Post from "../../componets/post/Post";
import StoryLine from "../../componets/story-line/Story-Line";
import Header from "../../componets/header/Header";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "../../componets/image-upload/Image-Upload";
import Profile from "../../componets/profile/Profile";

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
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
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
      <Header />
      <div className="home__container">
        <div className="home__body">
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

          {user?.displayName ? (
            <ImageUpload username={user.displayName} />
          ) : (
            <div className="home__login_need">
              <h3>Sorry you have to login to post</h3>
              <img
                alt=""
                src="https://www.sorryimages.love/images/quotes/english/general/sorry-cartoon-52650-14795.jpg"
              />
            </div>
          )}
        </div>
        <Profile />
      </div>
    </div>
  );
}

export default Home;
