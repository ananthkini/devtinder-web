import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import NotifyBar from "./NotifyBar";


function Connections() {
  const connectionsData = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const handleConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleConnections();
  }, []);

  if (!connectionsData) {
    return <NotifyBar message={'No Connections found'}/>;
  }
  if (connectionsData.length === 0) {
    return <NotifyBar message={'No Connections found'}/>;
  }
  return (
    connectionsData && (
      <div className="mt-20 mx-10">
        <div className="carousel carousel-end rounded-box">
          {connectionsData.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;
            return (
              <div className="card glass  w-96 shadow-xl mx-10" key={_id}>
                 {" "}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default Connections;
