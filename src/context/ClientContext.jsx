import { BASE_URL } from "@/constants";
import { getData, postData, updateData } from "@/utils/api/genericAPI";
import { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "client/getOne":
      return { ...state, client: action.payload, isLoading: false };

    case "client/updateInfo":
      return {
        ...state,
        updateInfoSuccess: action.payload.status,
        updatedUser: action.payload,
        isLoading: false,
      };

    case "loading":
      return { ...state, isLoading: true, error: "" };

    case "rejected":
      return { ...state, error: action.payload, isLoading: false };

    case "reset":
      return { ...state, ...initialState };

    default:
      throw new Error("Action Type NOT found.");
  }
}
const ClientContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  client: {},
  updatedUser: {},
  updateInfoSuccess: "",
};

function ClientProvider({ children }) {
  const [{ isLoading, error, client, updateInfoSuccess, updatedUser }, dispatch] =
    useReducer(reducer, initialState);

  const getClientById = async (id) => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/users/${id}`);

      dispatch({ type: "client/getOne", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const updateClientProfilePhoto = async (id, file) => {
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
      dispatch({ type: "client/updateInfo", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const updateClientInfo = async (id, data) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await updateData(`${BASE_URL}/users`, id, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "client/updateInfo", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  return (
    <ClientContext.Provider
      value={{
        isLoading,
        error,
        client,
        updateInfoSuccess,
        updatedUser,
        getClientById,
        updateClientProfilePhoto,
        updateClientInfo,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

function useClient() {
  const context = useContext(ClientContext);
  return context;
}

export { ClientProvider, useClient };
