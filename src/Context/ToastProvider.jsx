import { ToastContainer } from "react-toastify"; 

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};