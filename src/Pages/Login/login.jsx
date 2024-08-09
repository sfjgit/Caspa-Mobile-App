import Logo from "../../assets/logo-primary.png";
import Management from "../../assets/management.png";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={Logo} className={styles.logo} />
      <h1>Welcome Back</h1>
      <p>Login to your Dashboard</p>
      <div className={styles.inputarea}>
        <div>
          <label>Email:</label>
          <br />
          <input className={styles.input} placeholder="Enter Email" />
        </div>
        <div className="mt-5">
          <label>Password:</label>
          <br />
          <input
            className={styles.input}
            placeholder="Enter Password"
            type="password"
          />
        </div>
        <div className="mt-5">
          <button
            className={styles.button}
            onClick={() => navigate("/dashboard")}
          >
            Login
          </button>
        </div>
        <div className={styles.management}>
          <img src={Management} />
        </div>
      </div>
    </div>
  );
};

export default Login;
