import { useState } from "react";

const usePassValidation = (minLength: number=10) => {
  const [isPassValid, setIsPassValid] = useState(false);
  const regPass = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{${minLength},})`);

  const checkIsPassValid = (value: string) => {
    if (regPass.test(value)) {
      setIsPassValid(true);
    } else {
      setIsPassValid(false);
    }
  };

  return { isPassValid, checkIsPassValid };
};

export default usePassValidation;
