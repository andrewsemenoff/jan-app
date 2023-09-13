import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";
import communitiesReducer from "../features/communities/communitiesSlice";
import problemsReducer from "../features/problems/problemsSlice";

import {
  ToastErrorMessagesMiddleware,
  ToastSuccessMessagesMiddleware,
} from "./middlewares/toastMessagesMiddleware";

export const store = configureStore({
  reducer: { account: accountReducer, communities: communitiesReducer, problems: problemsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // ToastErrorMessagesMiddleware,
      ToastSuccessMessagesMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
