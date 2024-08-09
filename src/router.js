// import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import Cookies from "js-cookie";
// import Login from "./Login";
// import ProtectedRoute from "./ProtectedRoute";
import Home from "./Pages/home";

// import ChatList from "./ChatList";
// import Video from "./Video";
// import Room from "./Room";

// Function to get the access token from cookies
// const getAccessToken = () => {
//   return Cookies.get("accessToken");
// };

// Function to check if the user is authenticated
// const isAuthenticated = () => {
//   return !!getAccessToken();
// };

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  // {
  //   // element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
  //   element: <ProtectedRoute isAuthenticated={true} />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Home />,
  //     },
  //     //   {
  //     //     path: "/chat",
  //     //     element: <Chat />,
  //     //   },
  //     //   {
  //     //     path: "/video",
  //     //     element: <Video />,
  //     //   },
  //     //   {
  //     //     path: "/room",
  //     //     element: <Room />,
  //     //   },
  //   ],
  // },
  // {
  //   path: "*",
  //   element: <p>404 Error - Nothing here...</p>,
  // },
]);

export default router;
