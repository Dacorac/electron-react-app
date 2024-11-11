import { useContext } from "react";
import { Context } from "../store/Store";
import { ResetStorage } from "../actions/Actions";

const useResetStore = () => {
  const [, dispatch] = useContext(Context);

  const resetState = () => {
    dispatch(ResetStorage({
      selectedBackground : null,
      originalPhoto : null,
      visitorDetails : null
    }));
  };

  return resetState;
};

export default useResetStore;
