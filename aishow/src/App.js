import "./App.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Particle from "./components/paritcles";
function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState(
    "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"
  );
  const [resultImg, setResultImg] = useState(
    "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"
  );

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData2 = new FormData();
    formData2.append("file", selectedFile, selectedFile.name);

    const requestOptions = {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" }, // DO NOT INCLUDE HEADERS
      body: formData2,
    };
    fetch("http://127.0.0.1:8000/predict/", requestOptions)
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        setResultImg(`data:image/png;base64,${body.image}`);
      });
  };
  return (
    <div className="page">
      <div className="logo">Colornet</div>
      <div className="top">
        <div className="navbar navbar-min-height">
          <div className="search"></div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          <h1 className="heading">Add Your Image</h1>
          <div className="img-holder">
            <img src={profileImg} alt="" id="img" className="img" />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className=""
              name="image-upload"
              type="file"
              id="input"
              onChange={changeHandler}
              accept=".jpeg, .png, .jpg"
            />
            <div className="label">
              <label htmlFor="input" className="image-upload">
                <i className="material-icons">add_photo_alternate</i>
                Choose Your Photo
              </label>
            </div>
            <div className="button">
              <Button className="submit-btn" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>

        <div className="container">
          <h1 className="heading">Result</h1>
          <div className="img-holder">
            <img src={resultImg} alt="" id="img" className="img" />
            <div className="button-download">
              <a className="btn-download" href={resultImg} download>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="particles">
        <Particle />
      </div>
    </div>
  );
}

export default App;
