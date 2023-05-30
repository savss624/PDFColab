const isUserAddedInWaitlist = (feature, email) => {
  return (
    (JSON.parse(localStorage.getItem("waitlist")) || {})[feature] || []
  ).includes(email);
};

const addUserInWaitlist = (feature, email) => {
  const waitlistEmailIds =
    (JSON.parse(localStorage.getItem("waitlist")) || {})[feature] || [];
  localStorage.setItem(
    "waitlist",
    JSON.stringify({ [feature]: [...waitlistEmailIds, email] })
  );
};

export { isUserAddedInWaitlist, addUserInWaitlist };
