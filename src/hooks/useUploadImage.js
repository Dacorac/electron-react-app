import {  useEffect } from "react";
import axios from "axios";
import useAlert from "./useAlert";
import useOnlineStatus from "./useOnlineStatus";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";

const useUploadImage = () => {
  const { setErrorDialog, setAlert } = useAlert();
  const { setLoader } = useLoading();

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
    setLoader(true);

    if (isOnline === false) {
      setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      setLoader(false);
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
      setLoader(false);
    }
  }

  return { uploadImage };
}
 
export default useUploadImage;