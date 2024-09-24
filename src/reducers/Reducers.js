

const StateReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_NEW_BACKGROUND':
      return { ...state, selectedBackground: action.payload };
    case 'STORE_ORIGINAL_PHOTO':
      return { ...state, originalPhoto: action.payload };
    default:
      return state;
  }
}

export default StateReducer;