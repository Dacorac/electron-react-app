import React from 'react';
import withHeaderFooter from "../../hoc/withHeaderFooter";
import CustomInput from '../customized/CustomInput/CustomInput';

import { useForm } from 'react-hook-form';

import "./StepThree.css";
import CustomCheckbox from '../customized/CustomCheckbox/CustomCheckbox';

const StepThree = () => {
  const { register, 
    handleSubmit, 
    reset, 
    watch,
    setValue,
    formState: { errors } 
  } = useForm({ mode: 'all' });

  return ( 
    <div className='step-three-container'>
      <div className='step-three-form'>
        <h1>Get your photo emailed to you</h1>
        <form>
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
              name="phone"
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

          <div className="step-three-form-group">
            <CustomCheckbox 
              id="marketingCheckbox"
              label="Stay up to date with LifeFlight news and appeals"
              checked={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default withHeaderFooter(StepThree);