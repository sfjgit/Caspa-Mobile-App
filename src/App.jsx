import "./App.css";
import { useState } from "react";
// import { Route, Routes  } from "react-router-dom";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login/login";
import ApplicationAwaiting from "./Pages/ApplicantWaiting";
import PaymentRequest from "./Pages/PaymentRequest";
import Nda from "./Pages/nda";

import Cookies from "universal-cookie";
import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";

import "react-toastify/dist/ReactToastify.css";

// import ProtectedRoute from "./ProtectedRoute";

// import router from "./router";

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: "dashboard",
//         element: <Home />,
//       },

//       {
//         path: "home",
//         element: <Home />,
//       },
//       // {
//       //   path: "about",
//       //   element: <About />,
//       // },
//     ],
//   },
// ]);

const getAccessToken = () => {
  const cookie = new Cookies();
  return cookie.get("token");
};

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!getAccessToken();
};

function App() {
  console.log(isAuthenticated());
  // const [token, settoken] = useState(null);

  const cookie = new Cookies();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      index: true,
    },
    {
      element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
      // parent route component
      // element: <Layout />,
      // child route components
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Home />,
        },
        // other pages....
        {
          path: "/applicant-awaiting",
          element: <ApplicationAwaiting />,
        },
        {
          path: "/payment-request",
          element: <PaymentRequest />,
        },
        {
          path: "/nda",
          element: <Nda />,
        },
      ],
    },
  ]);
  // useEffect(() => {
  //   console.log("SDFsdfsdf");
  //   isAuthenticated();
  //   settoken(cookie.get("token"));
  // }, [cookie.get("token")]);
  // console.log(token, isAuthenticated());
  return (
    <>
      <RouterProvider
        router={router}

        //  fallbackElement={<BigSpinner />}
      />
      {/* <Routes>
        <Route path="/signin" element={<Signin />} />
        </Routes> */}

      {/* <Layout /> */}
    </>
  );
}

export default App;
