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
import { store } from "./app/store.ts";
import MailConfirmation from "./components/mail-confirm/mail-confirm.component.tsx";
import RestorePasswordForm from "./components/restore-password-form/restore-password-form.component.tsx";
import SignIn from "./components/sign-in/sign-in.component.tsx";
import SignUp from "./components/sign-up/sign-up.component.tsx";
import { getEductionLevels, getUser } from "./features/account/accountSlice.ts";
import { getCommunitiesNames } from "./features/communities/communitiesSlice.ts";
import About from "./pages/About/About.tsx";
import Communities from "./pages/Communities/Communities.tsx";
import CreateOrEditProblem from "./pages/CreateOrEditProblem/CreateOrEditProblem.tsx";
import Error from "./pages/Error/Error.tsx";
import Authentication from "./pages/Login/Authentication.tsx";
import Problem from "./pages/Problem/Problem.tsx";
import ProblemsList from "./pages/ProblemList/ProblemsList.tsx";
import Profile from "./pages/Profile/Profile.component.tsx";
import RestorePassword from "./pages/RestorePassword/RestorePassword.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import OtherUser from "./pages/OtherUser/OtherUser.component.tsx";
import Community from "./pages/Community/Community.component.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route element={<ProblemsList />} index />
      <Route path="profile" element={<Profile />} />
      <Route
        path="user/:user_id"
        element={
          <PrivateRoute>
            <OtherUser />
          </PrivateRoute>
        }
      />
      <Route element={<About />} path="about" errorElement={<Error />} />
      <Route
        path="communities"
        element={
          <PrivateRoute>
            <Communities />
          </PrivateRoute>
        }
      />
      <Route
        path="communities/:community_name"
        element={
          <PrivateRoute>
            <Community />
          </PrivateRoute>
        }
      />
      <Route
        element={<Authentication />}
        path="authentication"
        errorElement={<Error />}
      >
        <Route element={<SignIn />} path="sign-in" />
        <Route element={<SignUp />} path="sign-up" />
      </Route>
      <Route
        element={
          <PrivateRoute>
            <Problem />
          </PrivateRoute>
        }
        path="problem/:problem_id"
        errorElement={<Error />}
      />
      <Route
        element={
          <PrivateRoute>
            <CreateOrEditProblem />
          </PrivateRoute>
        }
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
