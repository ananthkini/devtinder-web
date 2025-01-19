import React from "react";

function LoadingComponents() {
  return (
    <div className="flex justify-center my-10">
      <div className="card  bg-base-300 w-96 shadow-xl">
      <figure>
        <img className="skeleton" style={{ height: "550px" }} />
      </figure>
      <div className="card-body">
        <h2 className="card-title skeleton">
          
        </h2>
        <h3>
       </h3>
        <h3 className="skeleton h-32"></h3>
      </div>
      <div className="card-actions justify-between mt-10 ">
            <button className="skeleton"></button>
            <button className="skeleton"></button>
          </div>
      </div>
    </div>
  );
}

export default LoadingComponents;
