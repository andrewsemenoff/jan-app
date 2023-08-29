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
import ProblemProposal from "./pages/ProblemProposal/ProblemProposal.tsx";
import { store } from "./app/store.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/" errorElement={<Error />}>
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
        path="problem/:id"
        errorElement={<Error />}
      />
      <Route
        element={<ProblemProposal />}
        path="problem-proposal"
        errorElement={<Error />}
      />
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
