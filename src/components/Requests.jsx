import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";
import NotifyBar from "./NotifyBar";

function Requests() {
  const requestsData = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const handleRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests([res?.data?.data?.fromUserId]));
    //   console.log(res?.data?.data?.fromUserId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleRequests();
  }, []);

  if (!requestsData) {
    return <NotifyBar message={"No requests found"} />;
  }
  if (requestsData.length === 0) {
    return <NotifyBar message={"No requests found"} />;
  }

  return (
    <div className="mt-20 mx-10">
      <div className="carousel carousel-end rounded-box">
        {requestsData.map((requests) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            requests;
          return (
            <div className="card glass w-96 shadow-xl mx-10" key={_id}>
              <figure>
                <img src={photoUrl} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>
                <h3>
                  {gender.substr(0, 1).toUpperCase()} {age}
                </h3>
                <p>{about}</p>
                <div className="card-actions justify-between mt-10 mb-10">
                  <button className="btn btn-secondary">Reject</button>
                  <button className="btn btn-primary">Accept</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests;
