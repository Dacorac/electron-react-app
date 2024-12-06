import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useAlert from './useAlert';

const useSendVisitorDetails = () => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const navigate = useNavigate();

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
      if (response.data) {
        navigate('/thank-you');
      }
    } catch (error) {
      console.error(error);
      setAlert('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendVisitorDetails, loading };
};

export default useSendVisitorDetails;
