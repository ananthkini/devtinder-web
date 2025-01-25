import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Toast from "./Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
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
  const navigate = useNavigate()

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmailId("");
    setPassword("");
    setPhotoUrl("");
    setGender("");
    setAge("");
    setAbout("");
    setSkills("");
    setErrorMsg("");
    return;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
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
      handleReset()
      navigate('/login')
      
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
        } else if (err.response.data.includes("Path `gender` is required")) {
          setTmessage("Select your gender");
          setTtype("error");
        }
      }
    }
  };
  return (
    <>
      <Toast type={tType} message={tMessage} count={count} />
      <Navbar />
      <div className="flex justify-center my-10 mb-10">
        <div className="card bg-base-300  max-w-xl min-w-md min-h-full shadow-xl">
          <div className="card-body ">
            <h2 className="card-title justify-center">Sign up</h2>
            <form onSubmit={(e) => handleSignup(e)}>
              <div>
                <div className="flex justify-between">
                  <label className="form-control w-full mr-5">
                    <div className="label">
                      <span className="label-text">First name</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">Last name</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex justify-between">
                  <label className="form-control w-full mr-5">
                    <div className="label">
                      <span className="label-text">Email</span>
                    </div>
                    <input
                      type="email"
                      className="input input-bordered w-full "
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">Password</span>
                    </div>
                    <input
                      type="password"
                      placeholder=""
                      className="input input-bordered w-full "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex justify-between">
                  <label className="form-control w-full  mr-5">
                    <div className="label">
                      <span className="label-text">Photo URL</span>
                    </div>
                    <textarea
                      className="input input-bordered w-full "
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Gender</span>
                    </div>
                    <select
                      className="select input-bordered w-full "
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select a Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>
                </div>
                <div className="flex justify-start">
                  <label className="form-control w-full mr-5">
                    <div className="label">
                      <span className="label-text">Age</span>
                    </div>
                    <input
                      type="number"
                      className="input input-bordered w-full "
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value))}
                    />
                  </label>
                  <label  className="form-control w-full"></label>
                </div>
                <div className="flex justify-between">
                  <label className="form-control w-full  mr-5">
                    <div className="label">
                      <span className="label-text">About</span>
                    </div>
                    <textarea
                      className="textarea input-bordered w-full"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Skills</span>
                    </div>
                    <textarea
                      type="password"
                      placeholder=""
                      className="textarea input-bordered w-full"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <p className="text-red-500">{errorMsg}</p>
              <div className="flex justify-between mt-5">
                <div>
                  <button
                    type="reset"
                    className="btn btn-neutral"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Sign up
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p>
                Already a user? <Link to={"/login"}><b>Login</b></Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
