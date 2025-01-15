import React from "react";

function Card({ user, self = false }) {
  
  return (
    <div className="card  bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="Photo" style={{ height: "550px" }} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <h3> {user.age}{" "}
        {user.gender.toUpperCase().substr(0, 1)}</h3>
        <h3>{user.about}</h3>

        {!self && (
          <div className="card-actions justify-between mt-10 ">
            <button className="btn btn-secondary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
