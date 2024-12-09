import { useState } from "react";
import axios from "axios";
import useAlert from "./useAlert";
import { useNavigate } from "react-router-dom";

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const { setErrorDialog } = useAlert();
  const navigate = useNavigate();

  const uploadImage = async (body) => {
    setLoading(true);
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