import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";
import AuthModal from "./Auth";
import { Link } from "react-router-dom";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      let res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let data = await res.json();
      if (res.ok) {
        console.log("Logout was successfull:", data);
        dispatch(setUser({ logged: false, data: {} }));
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            Pinspire
          </Link>
        </div>
        {user.logged ? (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => document.getElementById("auth_modal").showModal()}
          >
            Login
          </button>
        )}
      </div>
      <AuthModal />
    </>
  );
};

export default Navbar;
