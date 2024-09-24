

const StateReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_NEW_BACKGROUND':
      return { ...state, selectedBackground: action.payload };
    default:
      return state;
  }
}

export default StateReducer;