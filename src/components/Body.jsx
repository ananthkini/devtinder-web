import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import store from "../utils/appStore";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const getUserProfile = async () => {
    if (!userData) {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });

        dispatch(addUser(res.data));
      } catch (err) {
        if (err.status === 401) {
          navigate("/login");
        }
      }
    } else dispatch(addUser(userData));
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Body;
