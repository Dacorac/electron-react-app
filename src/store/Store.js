import React, { useReducer, createContext, useEffect } from 'react';
import StateReducer from '../reducers/reducers';

const initialState = {
  selectedBackground : 1,
  originalPhoto : null,
  visitorDetails : null,
  localFilePath: null
};

const Store = ({ children }) => {

  const [state, dispatch] = useReducer(StateReducer, initialState);
  
  useEffect(() => {
    console.log(state)
  }, [state])

  return ( 
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
}
 
export const Context = createContext(initialState);
export default Store;