import { useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import axios from 'axios';
import useAlert from './useAlert';
import useOnlineStatus from './useOnlineStatus';

const useSendVisitorDetails = () => {
  const { setErrorDialog, setAlert } = useAlert();
  const { setLoader } = useLoading();
  
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline !== undefined) {
      if (isOnline === false) {
        setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      }
    }
  }, []);

  const sendVisitorDetails = async (data) => {
    setLoader(true);

    if (isOnline === false) {
      setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      setLoader(false);
      return;
    }

    const body = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      mobile_phone: data.mobile_phone,
      opt_out_marketing: data.marketingUpdate ? 0 : 1,
    };

    try {
      const response = await axios.post(`http://localhost:8000/create_visitor_contact`, body);
      console.log(response.data);
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
