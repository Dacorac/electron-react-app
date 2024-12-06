

const StateReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_NEW_BACKGROUND':
      return { ...state, selectedBackground: action.payload };
    case 'STORE_ORIGINAL_PHOTO':
      return { ...state, originalPhoto: action.payload };
    case 'STORE_VISITOR_DETAILS':
      return { ...state, visitorDetails: action.payload };
    case 'STORE_LOCAL_FILE_PATH': 
      return { ...state, localFilePath: action.payload };
    case 'RESET_STORE':
      return { ...action.payload };
    default:
      return state;
  }
}

export default StateReducer;