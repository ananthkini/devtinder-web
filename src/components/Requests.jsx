import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";
import NotifyBar from "./NotifyBar";

function Requests() {
  const requestsData = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const recieveRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
      //   console.log(res?.data?.data?.fromUserId);
    } catch (err) {
      console.log(err);
    }
  };
 
  const handleRequest = async(status, connectionID) =>{
    try {
      const res = await axios.post(BASE_URL+'/requests/review/'+status+'/'+connectionID,{},{withCredentials:true});
      dispatch(removeRequests(connectionID))
    } catch (err) {
      
    }
  }


  useEffect(() => {
    recieveRequests();
  }, []);

  if (!requestsData) {
    return <NotifyBar message={"No requests found"} />;
  }
  if (requestsData.length === 0) {
    return <NotifyBar message={"No requests found"} />;
  }

  return (
    <div className="mt-10 flex justify-center">
      <div className="carousel carousel-center rounded-box w-96">
        {requestsData.map((requests) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            requests.fromUserId;
            const connectionID = requests._id;
          return (
            <div
              className="carousel-item card glass shadow-xl mx-5 w-full"
              key={_id}
            >
              <figure>
                <img src={photoUrl} alt="Shoes" className="w-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>
                <h3>
                  {gender.substr(0, 1).toUpperCase()} {age}
                </h3>
                <h4>{about}</h4>
              </div>
              <div className="card-footer p-4 mb-10">
                <div className="card-actions justify-between mt-10 mb-10">
                  <button className="btn btn-secondary" onClick={() => handleRequest('rejected',connectionID)}>Reject</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRequest('accepted',connectionID)}
                  >
                    Accept
                  </button>
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
