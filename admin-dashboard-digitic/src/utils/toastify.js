import { toast } from "react-toastify";

// create toaster

export const createToaster = (msg, type = "error") => {
  toast[type](msg);
};
