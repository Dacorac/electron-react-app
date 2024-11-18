import React, { useEffect, useState, useContext } from 'react';
import withHeaderFooter from "../../hoc/withHeaderFooter";
import CustomInput from '../customized/CustomInput/CustomInput';
import CustomCheckbox from '../customized/CustomCheckbox/CustomCheckbox';
import NextButton from "../customized/NextButton/NextButton";
import BackButton from "../customized/BackButton/BackButton";
import useVisitorForm from '../../hooks/useVisitorForm';
import { useNavigate } from "react-router-dom";

import "./StepThree.css";

const StepThree = () => {
  const { register, handleSubmit, setValue, watch, errors, isValid, resetForm } = useVisitorForm();
  const [marketingChecked, setMarketingChecked] = useState(true);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    register("marketingUpdate");
  }, [register]);

  useEffect(() => {
    setValue("marketingUpdate", marketingChecked);
  }, [marketingChecked]);

  
  const marketingUpdateChange = () => {
    setMarketingChecked((prev) => !prev);
  };

  const privacyPolicyCheckboxChange = () => {
    setPrivacyPolicyChecked((prev) => !prev);
  }

  const marketingCheckboxValue = watch("marketingUpdate");

  const reset = () => {
    resetForm();
    setMarketingChecked(true);
    setPrivacyPolicyChecked(false);
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
        <form onSubmit={handleSubmit}>
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

          <div className='btn-container'>
            <BackButton type='button' handleClick={() => navigate('/step-two')} />
            <NextButton type='submit' handleClick={() => navigate('/step-three')} isDisabled={isDisabled()}/>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default withHeaderFooter(StepThree);