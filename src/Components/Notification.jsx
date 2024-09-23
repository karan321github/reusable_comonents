// import React, { useEffect, useState } from "react";

// function Notification({ message, type = "info", duration = 3000, onClose }) {
//   const [isVisible, setVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVisible(false);
//       if (onClose) {
//         onClose();
//       }
//     }, duration);

//     return () => clearTimeout(timer); // Cleanup on unmount
//   }, [duration, onClose]);

//   if (!isVisible) {
//     return null;
//   }

//   // Inline styles for notification types
//   const notificationStyles = {
//     base: {
//       padding: "8px",
//       borderRadius: "5px",
//       margin: "10px 0",
//       position: "relative",
//       color: "#fff",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     info: {
//       backgroundColor: "#3178c6",
//     },
//     success: {
//       backgroundColor: "#28a745",
//     },
//     error: {
//       backgroundColor: "#dc3545",
//     },
//     closeButton: {
//       background: "none",
//       border: "none",
//       fontSize: "16px",
//       color: "#fff",
//       cursor: "pointer",
//     },
//   };

//   // Determine the notification style based on the 'type'
//   const notificationTypeStyle =
//     notificationStyles[type] || notificationStyles.info;

//   return (
//     <div
//       style={{ ...notificationStyles.base, ...notificationTypeStyle }}
//       role="alert"
//     >
//       <p>{message}</p>
//       <button
//         style={notificationStyles.closeButton}
//         onClick={() => setVisible(false)}
//         aria-label="Close Notification"
//       >
//         X
//       </button>
//     </div>
//   );
// }

// export default Notification;


import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Default Toastify styles (can be overridden)

function Notification({ message, type = "info", duration = 3000, customStyle = {}, position = "top-right" }) {

  
  const notify = () => {
    switch (type) {
      case "success":
        toast.success(message, { style: customStyle, autoClose: duration, position });
        break;
      case "error":
        toast.error(message, { style: customStyle, autoClose: duration, position });
        break;
      case "info":
        toast.info(message, { style: customStyle, autoClose: duration, position });
        break;
      case "warning":
        toast.warn(message, { style: customStyle, autoClose: duration, position });
        break;
      default:
        toast(message, { style: customStyle, autoClose: duration, position });
        break;
    }
  };

  return (
    <>
      <ToastContainer />
      <button onClick={notify}>Notify!</button>
    </>
  );
}

export default Notification;
