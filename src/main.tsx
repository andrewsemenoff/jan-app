import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Error from "./pages/Error/Error.tsx";
import About from "./pages/About/About.tsx";
import Communities from "./pages/Communities/Communities.tsx";
import Login from "./pages/Login/Login.tsx";
import ProblemsList from "./pages/ProblemList/ProblemsList.tsx";

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
      <Route element={<ProblemsList />} path="problems_list" errorElement={<Error />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
