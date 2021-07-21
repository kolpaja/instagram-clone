import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./Image-Upload.styles.scss";

import firebase from "firebase";
import { db, storage } from "../../database/firebaseUtils";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.byteTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (e) => {
        //error function
        console.log(e);
        alert(e.message);
      },
      //complited fnc
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post the image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              captin: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  // console.log(caption);
  return (
    <div className="image-upload">
      <h3>Add a post:</h3>
      <progress value={progress} max="100" />
      <label htmlFor="image-upload__caption">Caption</label>
      <input
        id="image-upload__caption"
        type="text"
        placeholder="Type a caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Post</Button>
    </div>
  );
}

export default ImageUpload;
