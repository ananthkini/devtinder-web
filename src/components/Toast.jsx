import React, { useEffect, useState } from "react";

function Toast({ type, message, count, duration = 3000 }) {
  let cName = "alert-success";

  const [showToast, setShowToast] = useState(true);
  if (type == "error") {
    cName = "alert alert-error";
  } else if (type == "warning") {
    cName = "alert alert-warning";
  } else if (type == "success") {
    cName = "alert alert-success";
  }

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  }, [count]);

  return (
    showToast && (
      <div className="justify-center">
        <div className="toast toast-top toast-start ">
          <div className={cName}>
            <span>{message}</span>
          </div>
        </div>{" "}
      </div>
    )
  );
}

export default Toast;
