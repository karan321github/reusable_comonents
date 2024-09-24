export const showToast = (message, type = "default", duration = 3000) => {
  switch (type) {
    case "success":
      toast.success(message, { autoClose: duration });
      break;
    case "error":
      toast.error(message, { autoClose: duration });
      break;
    case "info":
      toast.info(message, { autoClose: duration });
      break;
    case "warning":
      toast.warning(message, { autoClose: duration });
      break;
    default:
      toast(message, { autoClose: duration });
  }
};

// You can use this component if you prefer a component-based approach
export const Toast = ({ message, type = "default", duration = 3000 }) => {
  React.useEffect(() => {
    showToast(message, type, duration);
  }, [message, type, duration]);

  return null;
};
