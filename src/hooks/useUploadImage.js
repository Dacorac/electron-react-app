import { useState } from "react";
import axios from "axios";
import useAlert from "./useAlert";

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();

  const uploadImage = async (body) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/create_content_version_record`, body);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setAlert('error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return { uploadImage, loading };
}
 
export default useUploadImage;