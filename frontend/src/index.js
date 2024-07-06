import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, MobileApp } from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider, Link
} from "react-router-dom";

import Home from './Home';
import PostPage, {loader as postLoader} from './PostPage';
import TagPage, {loader as tagLoader} from './TagPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "post/:postId",
        element: <PostPage />,
        loader: postLoader,
        onEnter: () => {console.log('Entered /')},
      },
      {
        path: "tag/:tagSlug",
        element: <TagPage />,
        loader: tagLoader,
        onEnter: () => {console.log('Entered /')},
      },
    ],
  },
]);

const mobileRouter = createBrowserRouter([
  {
    path: "/",
    element: <MobileApp />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "post/:postId",
        element: <PostPage />,
        loader: postLoader,
        onEnter: () => {console.log('Entered /')},
      },
      {
        path: "tag/:tagSlug",
        element: <TagPage />,
        loader: tagLoader,
        onEnter: () => {console.log('Entered /')},
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      {document.documentElement.offsetWidth > 750 ? <RouterProvider router={router} /> : <RouterProvider router={mobileRouter} /> }  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
