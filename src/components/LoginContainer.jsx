import React from "react";
import Login from "./Login";
import Signup from "./Signup";

function LoginContainer() {

    const handleTabSwitch = () =>{
        
    }
  return (
    <div className="my-10">
      <div role="tablist" className="tabs tabs-lifted justify-center">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Login"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Login />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Sign up"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Signup />
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
