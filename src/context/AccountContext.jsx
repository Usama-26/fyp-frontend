import { postData, getData } from "@/utils/api/genericAPI";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_URL } from "@/constants";
import { createContext, useContext, useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "account/loaded":
      return { ...state, user: action.payload, isLoggedIn: true, isLoading: false };

    case "account/login":
      return { ...state, user: action.payload, isLoading: false };

    case "account/logout":
      return { ...state, user: null, isLoggedIn: false, error: "", isLoading: false };

    case "account/created":
      return { ...state, user: action.payload, isLoading: false };

    case "account/forgotPassword":
      return { ...state, emailSuccessMessage: action.payload, isLoading: false };

    case "account/resetPassword":
      return { ...state, resetPassSuccessMessage: action.payload, isLoading: false };

    case "loading":
      return { ...state, isLoading: true, error: "" };

    case "rejected":
      return { ...state, error: action.payload, isLoading: false };

    case "loggedIn":
      return { ...state, isLoggedIn: true, isLoading: false, error: "" };

    case "reset":
      return { ...state, ...initialState };

    default:
      throw new Error("Action Type NOT found.");
  }
}

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: "",
  user: null,
  emailSuccessMessage: "",
  resetPassSuccessMessage: "",
};

const AccountsContext = createContext();

function AccountsProvider({ children }) {
  const router = useRouter();
  const [
    { isLoading, isLoggedIn, error, user, emailSuccessMessage, resetPassSuccessMessage },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleSignup = async (data) => {
    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/auth/signup`, data);

      dispatch({ type: "account/created", payload: response.data });
    } catch (err) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const handleLogin = async (data) => {
    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/auth/login`, data);
      dispatch({ type: "account/login", payload: response.data });
    } catch (err) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const handleGoogleAuth = async (token, userType) => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/auth/google`, {
        headers: {
          "google-auth-token": token,
          "user-type": userType,
        },
      });

      dispatch({ type: "account/login", payload: response.data });
    } catch (err) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const handleLogout = () => {
    dispatch({ type: "loading" });
    if (!window.localStorage.getItem("token")) {
      return;
    }

    window.localStorage.removeItem("token");
    dispatch({ type: "account/logout" });
    router.push("/");
  };

  const loadAccount = async (token) => {
    dispatch({ type: "loading" });
    try {
      const response = await axios.get(`${BASE_URL}/auth/getCurrentUser`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "account/loaded", payload: response.data });
    } catch (err) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const forgotPassword = async (data) => {
    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/auth/forgetPassword`, data);

      dispatch({ type: "account/forgotPassword", payload: response.data.message });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };
  const resetPassword = async (data) => {
    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/auth/resetPassword`, data);
      dispatch({ type: "account/resetPassword", payload: response?.data?.message });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") && !user) {
      const token = window.localStorage.getItem("token");
      loadAccount(token);
      return;
    } else if (!window.localStorage.getItem("token") && user) {
      window.localStorage.setItem("token", user?.token);
      dispatch({ type: "loggedIn" });
      router.push("/");
      return;
    } else {
      return () => {};
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      dispatch({ type: "reset" });
    }
  }, [router]);

  return (
    <AccountsContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        error,
        emailSuccessMessage,
        resetPassSuccessMessage,
        handleSignup,
        handleLogin,
        handleLogout,
        handleGoogleAuth,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

function useAccounts() {
  const context = useContext(AccountsContext);
  return context;
}

export { AccountsProvider, useAccounts };
