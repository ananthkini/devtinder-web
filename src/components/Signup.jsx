import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Toast from "./Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [age, setAge] = useState();
  const [photoUrl, setPhotoUrl] = useState("");
  const [emailId, setEmailId] = useState("");
  const [skills, setSkills] = useState([]);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [tType, setTtype] = useState("");
  const [tMessage, setTmessage] = useState("");
  const [count, setCount] = useState(0);

  const handleSignup = async () => {
    setAge(parseInt(age));
    setCount(count + 1);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          age,
          gender,
          about,
          photoUrl,
          password,
          skills,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setTmessage("User added succefully");
        setTtype("success");
      }
    } catch (err) {
      if ((err.response.status = 400)) {
        if (
          err.response.data == "User could not be added Need strong password"
        ) {
          setTmessage("Enter a strong password");
          setTtype("error");
        } else if (
          err.response.data.includes("less than minimum allowed value (18).")
        ) {
          setTmessage("User needs to be 18 or above");
          setTtype("error");
        } else if (err.response.data.includes("index: emailId_1 dup key")) {
          setTmessage("Entered email address already exists");
          setTtype("error");
        } else if (err.response.data.includes("Enter a valid photo url")) {
          setTmessage("Enter a valid Photo URL");
          setTtype("error");
        } else if (err.response.data.includes("Full name is required")) {
          setTmessage("Enter Full name to continue");
          setTtype("error");
        } else if (err.response.data.includes("Invalid email")) {
          setTmessage("Invalid email");
          setTtype("error");
        } else if (err.response.data.includes("ath `age` is required.")) {
          setTmessage("Enter a valid age");
          setTtype("error");
        }
      }
    }
  };
  return (
    <>
      <Toast type={tType} message={tMessage} count={count} />
      <Navbar/>
      <div className="flex justify-center my-10 mb-10">
        <form>
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body ">
              <h2 className="card-title justify-center">Sign up</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Email Id </span>
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

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <textarea
                    className="input input-bordered w-full max-w-xs"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select w-full max-w-xs"
                    
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">
                      Male
                    </option>
                    <option value="female">Female</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-xs"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    className="textarea"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Skills</span>
                  </div>
                  <textarea
                    type="password"
                    placeholder=""
                    className="textarea"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{errorMsg}</p>
              <div className="card-actions justify-center m-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </div>
              <div>
          <p>Already a user? <Link to={'/login'}>Login</Link></p>

          </div>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default Signup;
