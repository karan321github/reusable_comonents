import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Default Toastify styles (can be overridden)

function Notification({
  message,
  type = "info",
  duration = 3000,
  customStyle = {},
  position = "top-right",
}) {
  const notify = () => {
    switch (type) {
      case "success":
        toast.success(message, {
          style: customStyle,
          autoClose: duration,
          position,
        });
        break;
      case "error":
        toast.error(message, {
          style: customStyle,
          autoClose: duration,
          position,
        });
        break;
      case "info":
        toast.info(message, {
          style: customStyle,
          autoClose: duration,
          position,
        });
        break;
      case "warning":
        toast.warn(message, {
          style: customStyle,
          autoClose: duration,
          position,
        });
        break;
      default:
        toast(message, { style: customStyle, autoClose: duration, position });
        break;
    }
  };

  return (
    <>
      <ToastContainer />
      <button onClick={notify}>
        Notify!
      </button>
    </>
  );
}

export default Notification;
