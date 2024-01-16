import { postData, getData, updateData } from "@/utils/api/genericAPI";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_URL } from "@/constants";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useChatClient } from "@/hooks/useChatClient";
import { useAccount } from "wagmi";
import { useDisconnect } from "wagmi";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

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
      return { ...state, successMessage: action.payload, isLoading: false };

    case "account/verifyEmail":
      return { ...state, successMessage: action.payload, isLoading: false };

    case "user/updateInfo":
      return {
        ...state,
        successMessage: action.payload.status,
        updatedUser: action.payload,
        isLoading: false,
      };

    case "account/resetPassword":
      return { ...state, successMessage: action.payload, isLoading: false };

    case "account/chatAccount":
      return { ...state, chatUser: action.payload, isLoading: false };

    case "channel/create":
      return { ...state, channel: action.payload, isLoading: false };

    case "clearMessage":
      return { ...state, successMessage: "" };

    case "loading":
      return { ...state, isLoading: true, error: "", successMessage: "" };

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
  updatedUser: {},
  successMessage: "",
  chatUser: null,
  channel: null,
};

const AccountsContext = createContext();

function AccountsProvider({ children }) {
  const router = useRouter();
  const [
    {
      isLoading,
      isLoggedIn,
      updatedUser,
      error,
      user,
      chatUser,
      successMessage,
      channel,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { address: walletAddress, isConnected, connector } = useAccount();
  const { connect, error: walletConnectionError } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect, status, isSuccess: isDisconnected } = useDisconnect();

  const chatClient = useChatClient({
    user: {
      id: chatUser?.data?.id,
      email: chatUser?.data?.email,
    },
    tokenOrProvider: chatUser?.chatToken,
  });

  const handleSignup = async (data) => {
    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/auth/signup`, data);

      dispatch({ type: "account/created", payload: response.data });
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const verifyEmail = async (data) => {
    dispatch({ type: "loading" });
    const token = window.localStorage.getItem("token");
    try {
      const response = await postData(
        `${BASE_URL}/auth/sendEmail`,
        { email: data },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "account/verifyEmail", payload: response.data.message });
    } catch (error) {
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
    } catch (error) {
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

  const updatePassword = async (id, data) => {
    dispatch({ type: "loading" });
    const token = window.localStorage.getItem("token");
    try {
      const response = await updateData(`${BASE_URL}/auth/updatePassword`, id, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "account/resetPassword", payload: response?.data?.message });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const updateUserProfilePhoto = async (id, file) => {
    dispatch({ type: "loading" });
    const token = window.localStorage.getItem("token");
    const data = new FormData();
    try {
      data.append("profile_photo", file);
      const response = await updateData(
        `${BASE_URL}/users/update_profile_photo`,
        id,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "user/updateInfo", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const updateUserInfo = async (id, data) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await updateData(`${BASE_URL}/users`, id, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "user/updateInfo", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const createChatUser = async () => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/chat/create_chat_user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "account/chatAccount", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const createChannel = async (channelId, channelData) => {
    dispatch({ type: "loading" });
    try {
      const newChannel = await chatClient
        .channel("messaging", channelId, channelData)
        .watch();
      dispatch({ type: "channel/create", payload: newChannel });
      router.replace("/client/dashboard/inbox");
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const clearMessage = () => {
    dispatch({ type: "clearMessage" });
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") && !user) {
      const token = window.localStorage.getItem("token");
      loadAccount(token);
      return;
    } else if (!window.localStorage.getItem("token") && user) {
      window.localStorage.setItem("token", user?.token);
      dispatch({ type: "loggedIn" });
      if (user.data.user_type === "client") {
        router.push("/client/dashboard/");
      } else if (user.data.user_type === "freelancer") {
        router.push("/freelancer/dashboard/");
      }
      return;
    } else {
      return () => {};
    }
  }, [user, router]);

  useEffect(() => {
    if (isConnected && user) {
      updateUserInfo(user?.data?._id, { wallet_address: walletAddress || "" });
    }

    if (isDisconnected) {
      updateUserInfo(user?.data?._id, { wallet_address: "" });
    }
  }, [isConnected, isDisconnected]);

  useEffect(() => {
    if (user?.data?.wallet_address && !isConnected) {
      connect();
    }
  }, [user]);

  useEffect(() => {
    clearMessage();
  }, [router]);

  useEffect(() => {
    createChatUser();
  }, []);

  return (
    <AccountsContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        error,
        successMessage,
        updatedUser,
        chatUser,
        chatClient,
        channel,
        isConnected,
        connector,
        status,
        walletAddress,
        walletConnectionError,
        connector,
        connect,
        disconnect,
        verifyEmail,
        handleSignup,
        handleLogin,
        handleLogout,
        handleGoogleAuth,
        loadAccount,
        updateUserInfo,
        updateUserProfilePhoto,
        forgotPassword,
        resetPassword,
        clearMessage,
        updatePassword,
        createChatUser,
        createChannel,
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
