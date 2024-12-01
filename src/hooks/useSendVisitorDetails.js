import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../store/Store';
import useAlert from './useAlert';

const useSendVisitorDetails = () => {
  const [loading, setLoading] = useState(false);
  const [state] = useContext(Context);
  const { visitorDetails } = state;
  const { setAlert } = useAlert();

  const sendVisitorDetails = async (data) => {
    setLoading(true);

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
      setAlert('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visitorDetails) {
      sendVisitorDetails(visitorDetails);
    }
  }, [visitorDetails]);

  return { sendVisitorDetails, loading };
};

export default useSendVisitorDetails;
