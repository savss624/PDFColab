import React from "react";
import { create } from "zustand";

import { context } from "@utils/constants.js";
import {
  isUserAddedInWaitlist,
  addUserInWaitlist,
} from "@utils/localStorage.js";
import { validateEmail } from "@utils/utils.js";
import { ErrorToast, PromiseToast, EmojiToast } from "@utils/toasts.js";

const useInitStore = create((set, get) => ({
  platform: window.innerWidth <= 1024 ? "mobile" : "desktop",
  handleWindowResize: () => {
    set({ platform: window.innerWidth <= 1024 ? "mobile" : "desktop" });
  },
  theme: context.theme,
  initialThemeLoaded: false,
  setTheme: (theme) => {
    set({ theme: theme });
  },
  loadTheme: () => {
    if (get().theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (get().theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
    if (get().initialThemeLoaded === false) {
      setTimeout(() => {
        set({ initialThemeLoaded: true });
      }, 1000);
    }
  },
}));

const useDashboardStore = create((set) => ({
  userAddedToBetaWaitlist: false,
  dismissConfirmationModel: () => {
    set({ userAddedToBetaWaitlist: false });
  },
  addUserToBetaWaitlist: async ({ name, email }) => {
    if (!validateEmail(email)) {
      ErrorToast({ message: "Please enter a valid email address" });
      return;
    }
    if (name === "" || email === "") {
      ErrorToast({ message: "Please fill all the fields" });
      return;
    }
    if (isUserAddedInWaitlist("beta-release", email)) {
      EmojiToast({
        emoji: "🤗",
        message: "You are already in the waitlist. Thank you!",
      });
      return;
    }
    PromiseToast({
      promise: new Promise((resolve, reject) => {
        fetch("/api/dashboard/beta-user-waitlist/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (
              data.message === "User added to the waitlist." ||
              data.message === "User already exists in the waitlist."
            ) {
              set({ userAddedToBetaWaitlist: true });
              resolve();
              addUserInWaitlist("beta-release", email);
            } else {
              reject();
            }
          })
          .catch((err) => {
            reject();
          });
      }),
      loading: "Adding you to the waitlist...",
      success: <b>Added you to the waitlist</b>,
      error: <b>Could not add you to the waitlist</b>,
    });
  },
}));

export { useInitStore, useDashboardStore };
