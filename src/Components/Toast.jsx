import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return <ToastContainer />;
};

// Function to show toast messages
export const showToast = (message, type = "info") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    case "info":
    default:
      toast.info(message);
      break;
  }
};

export default Toast;
