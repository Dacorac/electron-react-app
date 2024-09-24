
const SELECT_NEW_BACKGROUND = 'SELECT_NEW_BACKGROUND';
const STORE_ORIGINAL_PHOTO = 'STORE_ORIGINAL_PHOTO';

const SelectNewBackground = (payload) => {
  return { type: SELECT_NEW_BACKGROUND, payload };
}

const StoreOriginalPhoto = (payload) => {
  return { type: STORE_ORIGINAL_PHOTO, payload };
}

export { SelectNewBackground, StoreOriginalPhoto };