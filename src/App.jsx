import "./App.css";
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
import Cookies from "universal-cookie";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    index: true,
  },
  {
    element: isAuthenticated() ? <Layout /> : <Navigate to="/" />,
    // parent route component
    // element: <Layout />,
    // child route components
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      // other pages....
      {
        path: "/applicant-awaiting",
        element: <ApplicationAwaiting />,
      },
    ],
  },
]);

function App() {
  console.log(isAuthenticated());
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
