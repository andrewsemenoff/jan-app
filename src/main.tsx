import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import About from "./pages/About/About.tsx";
import Communities from "./pages/Communities/Communities.tsx";
import Error from "./pages/Error/Error.tsx";
import Login from "./pages/Login/Login.tsx";
import Problem from "./pages/Problem/Problem.tsx";
import ProblemsList from "./pages/ProblemList/ProblemsList.tsx";
import { store } from "./app/store.ts";
import Profile from "./pages/Profile/Profile.component.tsx";
import { getUser } from "./features/account/accountSlice.ts";
import RestorePassword from "./pages/RestorePassword/RestorePassword.tsx";
import RestorePasswordForm from "./components/restore-password-form/restore-password-form.component.tsx";
import MailConfirmation from "./components/mail-confirm/mail-confirm.component.tsx";
import CreateOrEditProblem from "./pages/CreateOrEditProblem/CreateOrEditProblem.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/" errorElement={<Error />}>
      <Route
        path="profile"
        element={<Profile />}
        loader={() => store.dispatch(getUser())}
      />
      <Route element={<About />} path="about" errorElement={<Error />} />
      <Route
        element={<Communities />}
        path="communities"
        errorElement={<Error />}
      />
      <Route element={<Login />} path="login" errorElement={<Error />} />
      <Route element={<ProblemsList />} index errorElement={<Error />} />
      <Route
        element={<Problem />}
        path="problem/:problem_id"
        errorElement={<Error />}
      />
      <Route
        element={<CreateOrEditProblem />}
        path="problem-proposal"
        errorElement={<Error />}
      />
      <Route
        element={<CreateOrEditProblem />}
        path="edit-problem/:problem_id"
        errorElement={<Error />}
      />
      <Route element={<RestorePassword />} path="/restorepassword">
        <Route index element={<MailConfirmation />} />
        <Route element={<RestorePasswordForm />} path=":token" />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
