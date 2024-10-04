import alertify from "alertifyjs";

export const displayLog = (code, message) => {
    alertify.dismissAll();
    if (code === 1) {
      alertify.success(message);
    } else if (code === 0) {
      alertify.error("message");
    } else {
      alertify.error(message);
    }
  };