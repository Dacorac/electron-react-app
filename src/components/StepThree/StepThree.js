import React, { useEffect, useState, useContext } from 'react';
import withHeaderFooter from "../../hoc/withHeaderFooter";
import CustomInput from '../customized/CustomInput/CustomInput';
import CustomCheckbox from '../customized/CustomCheckbox/CustomCheckbox';
import NextButton from "../customized/NextButton/NextButton";
import BackButton from "../customized/BackButton/BackButton";
import useVisitorForm from '../../hooks/useVisitorForm';
import { useNavigate } from "react-router-dom";
import { Context } from '../../store/Store';
import { StoreOriginalPhoto } from '../../actions/Actions';

import "./StepThree.css";

const StepThree = () => {
  const { register, handleSubmit, setValue, watch, errors, isValid } = useVisitorForm();
  const [, dispatch] = useContext(Context);
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

  const isDisabled = () => {
    let hasErrors = Object.keys(errors).length !== 0;
    let isChecked = privacyPolicyChecked ? true : false;

    return hasErrors || !isChecked || !isValid;
  }

  const goBack = () => {
    navigate('/step-two');
    dispatch(StoreOriginalPhoto(null));
  }

  return (
    <div className='step-three-container'>
      <p className='step-three-title large-title'>Get your photo emailed <br/>to you</p>
      <form onSubmit={handleSubmit}>
        <div className='step-three-form'>
          <div className='step-three-form-group'>
            <label className="step-three-form-label small-text">First Name</label>
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
            <label className="step-three-form-label small-text">Last Name</label>
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
            <label className="step-three-form-label small-text">Phone</label>
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
            <label className="step-three-form-label small-text">Email</label>
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
            <label className="step-three-form-label small-text">Postcode</label>
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

          <div className="step-three-note x-small-text">
            <p>Note: Your green screen photos are for personal use only and won’t be used for any other purpose. We may reach out to provide more information about LifeFlight.</p>
          </div>
        </div>
        <div className='btn-container'>
          <BackButton type='button' handleClick={goBack} />
          <NextButton type='submit' isDisabled={isDisabled()} />
        </div>
      </form>
    </div>
  );
}

export default withHeaderFooter(StepThree);