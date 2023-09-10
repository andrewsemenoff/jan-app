import { toast } from "react-toastify";
import { Middleware } from "redux";
import { ACCOUNT_ACTION_TYPE } from "../../features/account/accountSlice";

enum Result {
  Fulfilled = "fulfilled",
  Rejected = "rejected",
  Pending = "pending",
}
const ToastErrorMessagesMiddleware: Middleware = () => (next) => (action) => {
  const { message, status } = action.payload;
  switch (action.type) {
    case `${ACCOUNT_ACTION_TYPE.SIGN_UP}/${Result.Rejected}`:
      if (status > 100) {
        toast.error(
          `We encountered next error during your sign-up process: ${message} We apologize for any inconvenience. Please double-check your information and try again. If the issue persists, contact our support team at`,
          { theme: "light", closeOnClick: true }
        );
      }
      break;
    case `${ACCOUNT_ACTION_TYPE.SIGN_IN}/${Result.Rejected}`:
      if (status > 100) {
        toast.error(
          `We encountered next error during your sign-in process: ${message} We apologize for any inconvenience. Please double-check your information and try again. If the issue persists, contact our support team at`,
          { theme: "light", closeOnClick: true }
        );
      }
      break;
    default:
      break;
  }
  return next(action);
};
const ToastSuccessMessagesMiddleware: Middleware = () => (next) => (action) => {
  const data = action.payload;
  switch (action.type) {
    case `${ACCOUNT_ACTION_TYPE.SIGN_UP}/${Result.Fulfilled}`:
      toast.success(
        `Congratulations 🎉 on successfully signing up with us! 🚀
      Welcome to Just Another Noble! 🌟 Explore and enjoy all the benefits of your new account.`,
        {
          theme: "colored",
          autoClose: 2000,
        }
      );
      break;
    case `${ACCOUNT_ACTION_TYPE.SIGN_IN}/${Result.Fulfilled}`:
      toast.success(
        `Congratulations 🎉 on successfully signing in with us! 🚀
      Welcome to Just Another Noble! 🌟 Explore and enjoy all the benefits of your new account.`,
        {
          theme: "colored",
          autoClose: 2000,
        }
      );
      break;
    default:
      break;
  }
  return next(action);
};

export { ToastErrorMessagesMiddleware, ToastSuccessMessagesMiddleware };
