import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import Toast from "./Toast";

function Card({ user, self = false }) {
  const [tType, setTtype] = useState("");
  const [tMessage, setTmessage] = useState("");
  const [count, setCount] = useState(0);

  let message = "";
  let mType = "";
  const dispatch = useDispatch();
  const handleInterested = async (status, _id) => {
    try {
      setCount(count + 1);
      const res = await axios.post(
        BASE_URL + "/requests/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
      if (status == "ignored") {
        message = "Ignored";
        mType = "error";
      } else {
        message = "Request sent";
        mType = "success";
      }

      setTmessage(message);
      setTtype(mType);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card  bg-base-300 w-96 shadow-xl">
      <Toast type={tType} message={tMessage} count={count} duration={500} />
      <figure>
        <img src={user.photoUrl} alt="Photo" style={{ height: "550px" }} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <h3>
          {" "}
          {user.age} {user.gender.toUpperCase().substr(0, 1)}
        </h3>
        <h3>{user.about}</h3>
      </div>
      {!self && (
        <div className="card-footer">
          <div className="card-actions justify-between mb-10 p-4">
            <button
              className="btn btn-secondary"
              onClick={() => handleInterested("ignored", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleInterested("interested", user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
