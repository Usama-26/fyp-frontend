import { BASE_URL } from "@/constants";
import { getData, postData } from "@/utils/api/genericAPI";
import { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "client/getOne":
      return { ...state, client: action.payload, isLoading: false };

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
  isLoading: true,
  error: "",
  client: "",
};

function ClientProvider({ children }) {
  const [{ isLoading, error, client }, dispatch] = useReducer(reducer, initialState);

  const getClientById = async (id) => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/users/${id}`);
      dispatch({ type: "client/getOne", payload: response.data });
    } catch (error) {
      console.log(error);
      // dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  return (
    <ClientContext.Provider value={{ isLoading, error, client, getClientById }}>
      {children}
    </ClientContext.Provider>
  );
}

function useClient() {
  const context = useContext(ClientContext);
  return context;
}

export { ClientProvider, useClient };
