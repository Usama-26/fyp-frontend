import { postData } from "@/utils/api/genericAPI";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_URL } from "@/constants";
import { createContext, useContext, useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "account/loaded":
      return { ...state, user: action.payload, isLoggedIn: true };

    case "account/login":
      return { ...state, user: action.payload };

    case "account/logout":
      return { ...state, user: null, isLoggedIn: false, error: "" };

    case "account/created":
      return { ...state, user: action.payload };

    case "loading":
      return { ...state, isLoading: true, error: "" };

    case "rejected":
      return { ...state, error: action.payload };

    case "loggedIn":
      return { ...state, isLoggedIn: true, isLoading: false, error: "" };

    default:
      throw new Error("Action Type NOT found.");
  }
}

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: "",
  user: null,
};

const AccountsContext = createContext();

function AccountsProvider({ children }) {
  const router = useRouter();
  const [{ isLoading, isLoggedIn, error, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleSignup = async (data) => {
    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/auth/signup`, data);

      dispatch({ type: "account/created", payload: response.data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.response.data.message });
    }
  };

  const handleLogin = async (data) => {
    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/auth/login`, data);

      dispatch({ type: "account/login", payload: response.data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.response.data.message });
    }
  };

  const handleLogout = () => {
    if (!window.localStorage.getItem("token")) {
      return;
    }

    window.localStorage.removeItem("token");
    dispatch({ type: "account/logout" });
    router.push("/");
  };

  const loadAccount = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/getCurrentUser`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "account/loaded", payload: response.data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.response.data.message });
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

  return (
    <AccountsContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        error,
        handleSignup,
        handleLogin,
        handleLogout,
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
