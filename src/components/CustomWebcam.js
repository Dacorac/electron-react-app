import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    // console.log(imgSrc)
  }, [imgSrc])

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    // Use the Electron IPC to save the image
    if (imageSrc) {
      window.electron.saveImage(imageSrc).then((filePath) => {
        console.log('Image saved to:', filePath);
      }).catch((error) => {
        console.error('Failed to save image:', error);
      });
    }
  }, [webcamRef]);

  return ( 
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} screenshotFormat="image/jpeg"/>
      )}
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
}
 
export default CustomWebcam;