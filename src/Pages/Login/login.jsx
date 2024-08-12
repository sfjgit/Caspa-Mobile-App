import { useState } from "react";
import Logo from "../../assets/logo-primary.png";
import Management from "../../assets/management.png";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BaseUrl } from "../../config";
import Cookies from "universal-cookie";

// Validation schema with Yup
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();

  // Initialize useForm with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Login data:", data);

    const headers = {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };

    // cookie.set(
    //   "token",
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjMzMTcwNDMsImV4cCI6MTcyMzMyMDY0MywiaXNzIjoieW91cl93ZWJzaXRlX29yX3N5c3RlbV9uYW1lIiwiZGF0YSI6eyJpZCI6IjEiLCJlbWFpbCI6InNpdmEuc0BzZmpicy5jb20iLCJmdWxsbmFtZSI6IlNpdmEgU2FyYXRoeSIsInVzZXJ0eXBlIjoiMSJ9fQ.04o4tpAbRy0XGalJYGTyfbQ2TA6yhMju4JHqFMFiAZc",
    //   { path: "/" }
    // );

    // navigate("/dashboard");
    axios
      .post(
        `${BaseUrl}login.php`,
        {
          ...data,
        }

        // { withCredentials: false, headers }
      )
      .then(function (response) {
        console.log(response);
        if (response?.status === 200) {
          cookie.set("token", response?.data?.token, { path: "/" });
          navigate("/dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(BaseUrl);

  return (
    <div className={styles.container}>
      <img src={Logo} className={styles.logo} />
      <h1>Welcome Back</h1>
      <p>Login to your Dashboard</p>
      <form onSubmit={handleSubmit(onSubmit)} novalidate>
        <div className={styles.inputarea}>
          <div>
            <label>Email:</label>
            <br />
            <input
              className={styles.input}
              placeholder="Enter Email"
              id="email"
              type="email"
              {...register("email")}
            />
            <p className={styles.error}>
              {errors.email && errors.email.message}
            </p>
          </div>
          <div className="mt-5">
            <label>Password:</label>
            <br />
            <input
              className={styles.input}
              placeholder="Enter Password"
              id="password"
              type="password"
              {...register("password")}
            />
            <p className={styles.error}>
              {errors.password && errors.password.message}
            </p>
          </div>
          <div className="mt-8">
            <button className={styles.button} type="submit" formNoValidate>
              Login
            </button>
          </div>
          <div className={styles.management}>
            <img src={Management} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
