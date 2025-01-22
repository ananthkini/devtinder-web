import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setErrorMsg(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
    <Navbar />
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body ">
            <h2 className="card-title justify-center">Login</h2>
            <div>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Email Id</span>{" "}
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <p className="text-red-500">{errorMsg}</p>
            <div className="card-actions justify-center m-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div>
              <p>
                New user? <Link to={"/signup"}>Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
