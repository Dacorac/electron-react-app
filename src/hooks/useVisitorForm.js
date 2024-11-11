import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { Context } from '../store/Store';
import { StoreVisitorDetails } from '../actions/Actions';
import useSendVisitorDetails from './useSendVisitorDetails';

const useVisitorForm = () => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isValid } } = useForm({ mode: 'all' });
  const [, dispatch] = useContext(Context);
  const { sendVisitorDetails } = useSendVisitorDetails();

  const onSubmit = (formData) => {
    dispatch(StoreVisitorDetails(formData));
    sendVisitorDetails(formData);
    resetForm();
  };

  const resetForm = () => {
    reset();
  };

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
