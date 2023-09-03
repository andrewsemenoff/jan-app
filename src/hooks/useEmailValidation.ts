import{ useState } from "react";

const useEmailValidation = () => {
  const [isMailValid, setIsMailValid] = useState(false);
  const regEmail =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;

  const checkIsMailValid = (value: string) => {
    if (regEmail.test(value)) {
      setIsMailValid(true);
    } else {
      setIsMailValid(false);
    }
  };

  return { isMailValid, checkIsMailValid };
};

export default useEmailValidation;
