import { useState } from "react";
import axios from "axios";

const useTransformPhoto = () => {
  const [loading, setLoading] = useState(false);
  const [transformedPhoto, setTransformedPhoto] = useState(null);

  const transformPhoto = async (image, backgroundId) => {
    console.log(backgroundId)
    setLoading(true);

    const body = JSON.stringify({
      image: image,
      background_id: backgroundId,
    });

    const options = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await axios.post(`http://localhost:8000/transform_image`, body, options);
      setTransformedPhoto(response.data);
    } catch (error) {
      console.error("Error transforming photo:", error);
    } finally {
      setLoading(false);
    }
  };

  return { transformedPhoto, transformPhoto, loading };
};

export default useTransformPhoto;
