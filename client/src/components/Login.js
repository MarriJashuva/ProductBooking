import React, { useContext, useEffect, useState } from "react";
import "./mix.css";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const Login = () => {
  const [data, setData] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();
  const [error, setError] = useState(""); // State for error messages
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpVal] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpVal((prev) => ({ ...prev, [name]: value }));
  };

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("http://localhost:8009/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      console.log("User not valid");
    } else {
      setLoginData(data.ValidUserOne.email);
      setTimeout(() => {
        history("/dash");
      }, 2000);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 0);
  }, []);

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    // Admin login check (static credentials)
    if (email === "admin@gmail.com" && password === "123456789") {
      setError("Welcome Admin!");
      localStorage.setItem("usersdatatoken", "admin-token");
      history("/admin-dashboard");
      return;
    }

    // Validation checks
    if (!email) {
      setError("Please enter an email.");
    } else if (!email.includes("@gmail.com")) {
      setError("Please enter a valid email.");
    } else if (!password) {
      setError("Please enter a password.");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    } else {
      setError(""); // Clear errors on valid inputs

      try {
        const data = await fetch("http://localhost:8009/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const res = await data.json();

        if (res.error) {
          setError(res.error);
        } else if (res.status === 201) {
          localStorage.setItem("usersdatatoken", res.result.token);
          setError("Login successful! Redirecting...");
          history("/dash");
          setInpVal({ email: "", password: "" });
        } else {
          setError("Login failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad you are back. Please log in.</p>
          </div>
          <form>
            {error && <div className="error_message">{error}</div>} {/* Inline error display */}
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={inpval.email}
                onChange={setVal}
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={inpval.password}
                  onChange={setVal}
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginuser}>
              Login
            </button>
            <p>
              Don't have an account? <NavLink to="/register">Sign Up</NavLink>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
