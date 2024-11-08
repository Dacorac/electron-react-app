import { useState, useEffect, useContext } from "react";
import { SelectNewBackground } from "../actions/Actions";
import { Context } from "../Store/Store";

const useBackgroundSelection = () => {
  const [, dispatch] = useContext(Context);
  const [backgroundSelected, setBackgroundSelected] = useState(null);

  const backgroundList = [
    { id: 1, url: "../assets/background_01.png", caption: "Canarvan Gorge" },
    { id: 2, url: "../assets/background_02.png", caption: "Famous Bottle Tree" },
    { id: 3, url: "../assets/background_03.png", caption: "Flying high in the sky" },
  ];

  useEffect(() => {
    if (backgroundSelected !== null) {
      dispatch(SelectNewBackground(backgroundSelected));
    }
  }, [backgroundSelected]);

  const selectBackground = (id) => setBackgroundSelected(id);

  return {
    backgroundList,
    backgroundSelected,
    selectBackground,
  };
};

export default useBackgroundSelection;
