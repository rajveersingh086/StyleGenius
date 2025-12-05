import { toast } from 'react-toastify';

export const handleSuccess = (msg = "Success") => {
  toast.success(String(msg), {
    position: "top-right",
  });
};

export const handleError = (msg = "Something went wrong") => {
  toast.error(String(msg), {
    position: "top-right",
  });
};
