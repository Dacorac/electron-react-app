import { useContext, useState } from "react";
import axios from "axios";
import useAlert from "./useAlert";
import { Context } from "../store/Store";
import { StoreLocalFilePath } from "../actions/Actions";

const useTransformPhoto = () => {
  const [, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [transformedPhoto, setTransformedPhoto] = useState(null);
  const { setAlert } = useAlert();

  const transformPhoto = async (image, backgroundId) => {
    setLoading(true);

    const body = JSON.stringify({
      image: image,
      background_id: backgroundId,
    });

    const options = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(`http://localhost:8000/transform_image`, body, options);
      setTransformedPhoto(data.file);
      dispatch(StoreLocalFilePath(data.file_path));
    } catch (error) {
      console.error("Error transforming photo:", error);
      setAlert('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return { transformedPhoto, transformPhoto, loading };
};

export default useTransformPhoto;
