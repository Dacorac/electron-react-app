import { useState, useEffect } from "react";
import axios from "axios";
import useAlert from "./useAlert";
import useOnlineStatus from "./useOnlineStatus";
import { useNavigate } from "react-router-dom";

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const { setErrorDialog, setAlert } = useAlert();
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOnline !== undefined) {
      if (isOnline === false) {
        setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      }
    }
  }, []);

  const uploadImage = async (body) => {
    setLoading(true);

    if (isOnline === false) {
      setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/create_content_version_record`, body);
      if (response.data) {
        navigate('/thank-you');
      }
    } catch (error) {
      console.error(error);
      setErrorDialog({ message: error.message, code: error.code });
    } finally {
      setLoading(false);
    }
  }

  return { uploadImage, loading };
}
 
export default useUploadImage;