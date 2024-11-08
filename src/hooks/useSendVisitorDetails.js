import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../Store/Store';

const useSendVisitorDetails = () => {
  const [state] = useContext(Context);
  const { visitorDetails } = state;

  const sendVisitorDetails = async (data) => {
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
    }
  };

  useEffect(() => {
    if (visitorDetails) {
      sendVisitorDetails(visitorDetails);
    }
  }, [visitorDetails]);

  return { sendVisitorDetails };
};

export default useSendVisitorDetails;
