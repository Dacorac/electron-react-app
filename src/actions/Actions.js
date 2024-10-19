
const SELECT_NEW_BACKGROUND = 'SELECT_NEW_BACKGROUND';
const STORE_ORIGINAL_PHOTO = 'STORE_ORIGINAL_PHOTO';
const STORE_VISITOR_DETAILS = 'STORE_VISITOR_DETAILS';

const SelectNewBackground = (payload) => {
  return { type: SELECT_NEW_BACKGROUND, payload };
}

const StoreOriginalPhoto = (payload) => {
  return { type: STORE_ORIGINAL_PHOTO, payload };
}

const StoreVisitorDetails = (payload) => {
  return { type: STORE_VISITOR_DETAILS, payload };
}

export { 
  SelectNewBackground, 
  StoreOriginalPhoto,
  StoreVisitorDetails
};