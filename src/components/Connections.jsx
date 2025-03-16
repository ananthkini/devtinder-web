import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import NotifyBar from "./NotifyBar";
import LoadingComponents from "./LoadingComponents";
import { Link } from "react-router-dom";

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
    return <NotifyBar message={"No Connections found"} />;
  }
  if (connectionsData.length === 0) {
    return <NotifyBar message={"No Connections found"} />;
  }
  return (
    connectionsData && (
      <div className="mt-10 ">
        <div className="carousel carousel-end rounded-box">
          {connectionsData.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;
            return (
              <div
                className="carousel-item card glass shadow-xl mx-5"
                key={_id}
              >
                <figure>
                  <img src={photoUrl} alt="Shoes" className="w-96" />
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
                <Link to={"/chat/" + _id}>
                  <button className="btn btn-primary mb-20">Chat</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default Connections;
