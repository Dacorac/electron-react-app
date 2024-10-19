import React, { useEffect, useState, useContext } from 'react';
import withHeaderFooter from "../../hoc/withHeaderFooter";
import CustomInput from '../customized/CustomInput/CustomInput';
import CustomCheckbox from '../customized/CustomCheckbox/CustomCheckbox';
import { Context } from "../../Store/Store";

import { StoreVisitorDetails } from '../../actions/Actions';
import { useForm } from 'react-hook-form';

import axios from 'axios';

import "./StepThree.css";

const StepThree = () => {
  const { register, 
    handleSubmit, 
    reset, 
    watch,
    setValue,
    formState: { errors, isValid } 
  } = useForm({ mode: 'all' });

  const [state, dispatch] = useContext(Context);
  const { visitorDetails } = state;
  const [marketingChecked, setMarketingChecked] = useState(true);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  useEffect(() => {
    register("marketingUpdate");
  }, [register]);

  useEffect(() => {
    setValue("marketingUpdate", marketingChecked);
  }, [marketingChecked]);

  useEffect(() => {
    sendVisitorDetails(visitorDetails);
  }, [visitorDetails])

  const sendVisitorDetails = async (data) => {
    let body = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      mobile_phone: data.mobile_phone,
      opt_out_marketing: data.marketingUpdate ? 0 : 1 
    }
    console.log(body)
    try {
      let response = await axios.post(`http://localhost:8000/create_visitor_contact`, body);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }
             
  const marketingUpdateChange = () => {
    setMarketingChecked((prev) => !prev);
  };

  const privacyPolicyCheckboxChange = () => {
    setPrivacyPolicyChecked((prev) => !prev);
  }

  const marketingCheckboxValue = watch("marketingUpdate");

  const resetForm = () => {
    reset();
    setMarketingChecked(true);
    setPrivacyPolicyChecked(false);
  }

  const onSubmit = (formData) => {
    dispatch(StoreVisitorDetails(formData));
    resetForm();
  }

  const isDisabled = () => {
    let hasErrors = Object.keys(errors).length !== 0;
    let isChecked = privacyPolicyChecked ? true : false;

    return hasErrors || !isChecked || !isValid;
  }

  return ( 
    <div className='step-three-container'>
      <div className='step-three-form'>
        <h1>Get your photo emailed to you</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='step-three-form-group'>
            <label className="step-three-form-label">First Name</label>
            <CustomInput 
              type='text' 
              placeholder='Your First Name'
              name="first_name"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'Enter first name.'
              }} 
            />
          </div>
          <div className='step-three-form-group'>
            <label className="step-three-form-label">Last Name</label>
            <CustomInput 
              type='text' 
              placeholder='Your Last Name'
              name="last_name"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'Enter last name.'
              }} 
            />
          </div>
          <div className='step-three-form-group'>
            <label className="step-three-form-label">Phone</label>
            <CustomInput 
              type='text' 
              placeholder='Phone number'
              name="mobile_phone"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'Enter phone number.'
              }} 
            />
          </div>
          <div className='step-three-form-group'>
            <label className="step-three-form-label">Email</label>
            <CustomInput 
              type='text' 
              placeholder='Your Email'
              name="email"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'Enter email address.',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid email address.',
                }
              }}
            />
          </div>
          <div className='step-three-form-group'>
            <label className="step-three-form-label">Postcode</label>
            <CustomInput 
              type='text' 
              placeholder='Your postcode'
              name="postcode"
              errors={errors}
              register={register}
              validationSchema={{
                required: 'Enter postcode.'
              }} 
            />
          </div>

          <div className="step-three-form-group checkbox">
            <CustomCheckbox 
              id="marketingCheckbox"
              label="Stay up to date with LifeFlight news and appeals"
              checked={marketingChecked}
              value={marketingCheckboxValue}
              handleChange={marketingUpdateChange}
            />
          </div>

          <div className="step-three-form-group checkbox">
            <CustomCheckbox 
              id="privacyPolicyCheckbox"
              label="I agree with the Privacy Policy"
              checked={privacyPolicyChecked}
              handleChange={privacyPolicyCheckboxChange}
            />
          </div>

          <div className="step-three-note">
            <p>Note: Your green screen photos are for personal use only and won’t be used for any other purpose. We may reach out to provide more information about LifeFlight.</p>
          </div>

          <div>
            <button type='submit' disabled={isDisabled()}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default withHeaderFooter(StepThree);