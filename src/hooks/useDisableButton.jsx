import React, { useState } from "react";

const useDisableButton = () => {
  const [isDisableButton, setIsDisableButton] = useState(false);
  function handleButtonDisability() {
    setIsDisableButton(true);
  }
  function handleResetButton() {
    setIsDisableButton(false);
  }
  return { isDisableButton, handleButtonDisability, handleResetButton };
};

export default useDisableButton;
