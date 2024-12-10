import { useContext, useState, useEffect } from "react";
import axios from "axios";
import useAlert from "./useAlert";
import { Context } from "../store/Store";
import { StoreLocalFilePath } from "../actions/Actions";
import useOnlineStatus from "./useOnlineStatus";

const useTransformPhoto = () => {
  const [, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [transformedPhoto, setTransformedPhoto] = useState(null);
  const { setErrorDialog, setAlert } = useAlert();
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline !== undefined) {
      if (isOnline === false) {
        setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      }
    }
  }, []);

  const transformPhoto = async (image, backgroundId) => {
    setLoading(true);

    if (isOnline === false) {
      setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      setLoading(false);
      return;
    }

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
      setErrorDialog({ message: error.message, code: error.code });
    } finally {
      setLoading(false);
    }
  };

  return { transformedPhoto, transformPhoto, loading };
};

export default useTransformPhoto;
