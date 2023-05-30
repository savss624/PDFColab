import toast from "react-hot-toast";

const ErrorToast = ({ message }) => {
  toast.error(message);
};

const PromiseToast = ({ promise, loading, success, error }) => {
  toast.promise(promise, {
    loading: loading,
    success: success,
    error: error,
  });
};

const EmojiToast = ({ emoji, message }) => {
  toast(message, {
    icon: emoji,
  });
};

export { ErrorToast, PromiseToast, EmojiToast };
