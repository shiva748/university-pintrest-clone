import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../redux/reducers/loginSlice";
import { setUser } from "../redux/reducers/userSlice";
import validator from "validator";

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState({});
  const login = useSelector((state) => state.login);
  const { email, password, username, cPassword } = login;
  const dispatch = useDispatch();

  const update = (e) => {
    dispatch(setLogin({ ...login, [e.target.name]: e.target.value }));
    setError({ ...error, [e.target.name]: "" });
  };

  const validateForm = () => {
    let errors = {};
    if (isLogin) {
      if (!username.trim() && !email.trim()) {
        errors.username = "Username or Email is required";
      }
    } else {
      if (!username.trim()) {
        errors.username = "Username is required";
      }
      if (!validator.isEmail(email)) {
        errors.email = "Please enter a valid email";
      }
      if (!password) {
        errors.password = "Password is required";
      } else if (!validator.isStrongPassword(password)) {
        errors.password = "Password is not strong enough";
      }
      if (password !== cPassword) {
        errors.cPassword = "Password must be the same";
      }
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const register = async () => {
    if (validateForm()) {
      try {
        let res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,

            email,
            password,
            cPassword,
          }),
        });

        let data = await res.json();
        if (res.ok) {
          console.log("Registration successful:", data);
          document.getElementById("auth_modal").close();
        } else {
          console.error("Registration failed:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const loginUser = async () => {
    if (validateForm()) {
      try {
        let res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        let data = await res.json();
        if (res.ok) {
          console.log("Login successful:", data);
          document.getElementById("auth_modal").close();
          dispatch(setUser({ logged: true, data: res.data }));
        } else {
          console.error("Login failed:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <dialog id="auth_modal" className="modal">
      <div className="modal-box" style={{ overflowX: "hidden" }}>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="font-bold text-lg text-center">
                Login to Your Account
              </h3>
              <div className="mt-4">
                <label className="input flex items-center gap-2 w-full">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full"
                    value={username}
                    name="username"
                    onChange={update}
                  />
                </label>
                <div className="divider">OR</div>
                <label className="input flex items-center gap-2 w-full">
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full"
                    value={email}
                    name="email"
                    onChange={update}
                  />
                </label>
                {error.username && (
                  <p className="text-red-500 text-sm">{error.username}</p>
                )}
                <label className="input flex items-center gap-2 w-full mt-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    name="password"
                    onChange={update}
                  />
                </label>
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
                <button
                  className="btn btn-success w-full mt-5"
                  onClick={loginUser}
                >
                  Login
                </button>
                <p className="text-sm text-center mt-3">
                  Don't have an account?
                  <button
                    className="text-primary hover:underline ml-1"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="font-bold text-lg text-center">
                Create a New Account
              </h3>
              <div className="mt-4">
                <label className="input flex items-center gap-2 w-full">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full"
                    name="username"
                    value={username}
                    onChange={update}
                  />
                </label>
                {error.username && (
                  <p className="text-red-500 text-sm">{error.username}</p>
                )}
                <label className="input flex items-center gap-2 w-full mt-3">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full"
                    name="email"
                    onChange={update}
                    value={email}
                  />
                </label>
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
                <label className="input flex items-center gap-2 w-full mt-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    name="password"
                    onChange={update}
                    value={password}
                  />
                </label>
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
                <label className="input flex items-center gap-2 w-full mt-3">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full"
                    name="cPassword"
                    onChange={update}
                    value={cPassword}
                  />
                </label>
                {error.cPassword && (
                  <p className="text-red-500 text-sm">{error.cPassword}</p>
                )}
                <button
                  className="btn btn-success w-full mt-5"
                  onClick={register}
                >
                  Register
                </button>
                <p className="text-sm text-center mt-3">
                  Already have an account?
                  <button
                    className="text-primary hover:underline ml-1"
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </dialog>
  );
};

export default AuthModal;
