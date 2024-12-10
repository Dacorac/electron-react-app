import React from 'react';
import './Loader.css';
import useTransformPhoto from '../../../hooks/useTransformPhoto';
import useSendVisitorDetails from '../../../hooks/useSendVisitorDetails';
import useUploadImage from '../../../hooks/useUploadImage';

const Loader = () => {
  const { loading: loadingVisitorDetails } = useSendVisitorDetails();
  const { loading: loadingPhotoTransformation } = useTransformPhoto();
  const { loading: loadingimageUpload } = useUploadImage();

  const isLoading = loadingVisitorDetails || loadingPhotoTransformation || loadingimageUpload;

  return (  
    <>
     {isLoading ? <span className="loader"></span> : null}
    </>
  );
}
 
export default Loader;