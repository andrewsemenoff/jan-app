import { toast } from "react-toastify";
import { Middleware } from "redux";
import { ACCOUNT_ACTION_TYPE } from "../../features/account/accountSlice";

enum Result {
  Fulfilled = "fulfilled",
  Rejected = "rejected",
  Pending = "pending",
}
const ToastErrorMessagesMiddleware: Middleware = () => (next) => (action) => {
  switch (action.type) {
    case `${ACCOUNT_ACTION_TYPE.GET_USER}/${Result.Rejected}`:
      if (true) {
        toast.error(
          `Oops! It seems there was an issue with your authentication token. Please sign in again to continue.`,
          { theme: "light", closeOnClick: true }
        );
      }
      break;
    case `${ACCOUNT_ACTION_TYPE.SIGN_UP}/${Result.Rejected}`:
      if (true) {
        toast.error(
          `We encountered next error during your sign-up process:  We apologize for any inconvenience. Please double-check your information and try again. If the issue persists, contact our support team at`,
          { theme: "light", closeOnClick: true, autoClose: 2000, }
        );
      }
      break;
    case `${ACCOUNT_ACTION_TYPE.SIGN_IN}/${Result.Rejected}`:
      if (true) {
        toast.error(
          `We encountered next error during your sign-in process:  We apologize for any inconvenience. Please double-check your information and try again. If the issue persists, contact our support team at`,
          { theme: "light", closeOnClick: true, autoClose: 2000 }
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
