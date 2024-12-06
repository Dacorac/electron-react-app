import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { Context } from '../store/Store';
import { StoreVisitorDetails } from '../actions/Actions';
import useSendVisitorDetails from './useSendVisitorDetails';
import useUploadImage from './useUploadImage';

const useVisitorForm = () => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isValid } } = useForm({ mode: 'all' });
  const [state, dispatch] = useContext(Context);
  const { sendVisitorDetails } = useSendVisitorDetails();
  const { uploadImage } = useUploadImage();
  const { localFilePath, visitorDetails } = state;

  const onSubmit = (formData) => {
    dispatch(StoreVisitorDetails(formData));
    sendVisitorDetails(formData);
    
    resetForm();
  };

  const resetForm = () => {
    reset();
  };

  useEffect(() => {
    if (visitorDetails !== null && localFilePath !== null) {
      let body = {
        file_path: localFilePath,
        first_name: visitorDetails.first_name,
        last_name: visitorDetails.last_name
      }
      uploadImage(body);
    }
  }, [visitorDetails]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    setValue,
    errors,
    isValid,
    resetForm,
  };
};

export default useVisitorForm;
