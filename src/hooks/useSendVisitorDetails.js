import { useState, useEffect } from 'react';
import axios from 'axios';
import useAlert from './useAlert';
import useOnlineStatus from './useOnlineStatus';

const useSendVisitorDetails = () => {
  const [loading, setLoading] = useState(false);
  const { setErrorDialog, setAlert } = useAlert();
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline !== undefined) {
      if (isOnline === false) {
        setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      }
    }
  }, []);

  const sendVisitorDetails = async (data) => {
    setLoading(true);

    if (isOnline === false) {
      setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      setLoading(false);
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
      setLoading(false);
    }
  };

  return { sendVisitorDetails, loading };
};

export default useSendVisitorDetails;
