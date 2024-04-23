import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import PopUp from "./PopUp";
import ImgCrop from "./ImageCrop";
function VideoPlayer() {
  const [openPopUp, setOpenPopUp] = useState(false);
  const player = useRef(null);
  const [images, setImages] = useState([]);
  const [currentImgUrl, setCurrentImgUrl] = useState(null);
  var videoId = "video";
  var scaleFactor = 1.25;
  var snapshots = [];

  const captureImage = () => {
    var video = document.getElementById(videoId);
    const imgUrl = capture(video, scaleFactor);
    // setImages((prev) => [...prev, imgUrl]);
    setOpenPopUp(true);
  };
  function capture(video, scaleFactor) {
    if (scaleFactor == null) {
      scaleFactor = 1;
    }
    var w = video.videoWidth * scaleFactor;
    var h = video.videoHeight * scaleFactor;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);
    let imgUrl;
    // Extract Blob data from the canvas
    canvas.toBlob(
      function (blob) {
        console.log(blob, "blobblobblob");
        imgUrl = URL.createObjectURL(blob);
    setCurrentImgUrl(imgUrl);

      },
      "image/jpeg",
      1
    );
    return imgUrl;
  }
  useEffect(() => {
    setOpenPopUp(false);
  }, [setOpenPopUp]);
  return (
    <>
      <div className="wrap">
        <video id="video" width="560" controls={true} crossOrigin="anonymous">
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" />
        </video>
        <br />
        <button
          onClick={() => {
            captureImage()
          }}
          className="button"
        >
          Capture
        </button>
        <br />
        {images &&
          images.length > 0 &&
          images.map((item, index) => (
            <figure key={index}>
              <img
                src={item}
                alt={`image ${index + 1}`}
                width={320}
                height={180}
              />
            </figure>
          ))}
      </div>
      {openPopUp && (
        <PopUp show={openPopUp}  close={setOpenPopUp} >
            <ImgCrop imgUrl={currentImgUrl} setImages={setImages} close={setOpenPopUp} />
        </PopUp>
      )}
    </>
  );
}

export default VideoPlayer;
