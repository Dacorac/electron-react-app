import { useContext, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import { Context } from '../store/Store';
import axios from 'axios';
import useAlert from './useAlert';
import useOnlineStatus from './useOnlineStatus';
import { useNavigate } from 'react-router-dom';

const useSendVisitorDetails = () => {
  const [state] = useContext(Context);
  const { setErrorDialog, setAlert } = useAlert();
  const { setLoader } = useLoading();
  const { localFilePath } = state;
  
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOnline !== undefined) {
      if (isOnline === false) {
        setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      }
    }
  }, []);

  const sendVisitorDetails = async (data, resetForm) => {
    setLoader(true);

    if (isOnline === false) {
      setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      setLoader(false);
      return;
    }

    const contact_data = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      mobile_phone: data.mobile_phone,
      opt_out_marketing: data.marketingUpdate ? 0 : 1,
    };

    let file_data = {
      file_path: localFilePath,
      first_name: data.first_name,
      last_name: data.last_name
    };

    try {
      const response = await axios.post(`http://localhost:8000/create_contact_with_image`, { contact_data, file_data });

      if (response.data) {
        navigate('/thank-you');
        resetForm();
      }
    } catch (error) {
      console.error(error);
      setErrorDialog({ message: error.message, code: error.code });
    } finally {
      setLoader(false);
    }
  };

  return { sendVisitorDetails };
};

export default useSendVisitorDetails;
