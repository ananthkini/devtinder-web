import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [emailId, setEmailId] = useState(user.emailId);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhoto] = useState(user.photoUrl);
  const [errorMsg, setErrorMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const [self, setSelf] = useState(true);

  const handleSaveProfile = async () => {
    try {
      setErrorMsg("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, gender, about, age },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setErrorMsg(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="flex justify-center mx-5">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body ">
            <h2 className="card-title justify-center">Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Email Id</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={emailId}
                  disabled
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <textarea
                  className="input input-bordered w-full max-w-xs"
                  value={photoUrl}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  className="input input-bordered w-full max-w-xs"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
            <p className="text-red-500">{errorMsg}</p>
            <div className="card-actions justify-center m-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      <Card user={{ firstName, lastName, gender, photoUrl, about, age }} self={self}/>
    </div>
  );
}

export default EditProfile;
