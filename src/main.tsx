import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import WithMUI01 from "./WithMUI01";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/test",
    element: <div>Hello world!</div>,
  },
  {
    path: "/mui01",
    element: <WithMUI01 />,
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
);
