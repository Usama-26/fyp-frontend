import { BASE_URL } from "@/constants";
import { getData, postData } from "@/utils/api/genericAPI";
import { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "freelancers/getAll":
      return { ...state, freelancers: action.payload, isLoading: false };

    case "proposal/sendProposal":
      return { ...state, proposal: action.payload, isLoading: false };

    case "loading":
      return { ...state, isLoading: true, error: "" };

    case "rejected":
      return { ...state, error: action.payload, isLoading: false };

    case "clearMessage":
      return { ...state, clearMessage: "" };

    case "reset":
      return { ...state, ...initialState };

    default:
      throw new Error("Action Type NOT found.");
  }
}
const FreelancerContext = createContext();

const initialState = {
  isLoading: false,
  successMessage: "",
  error: "",
  proposal: "",
  proposals: "",
  freelancers: [],
};

function FreelancerProvider({ children }) {
  const [{ isLoading, error, proposals, proposal, freelancers }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getAllFreelancers = async () => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/users/freelancers/`);
      dispatch({ type: "freelancers/getAll", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const sendProposal = async (data) => {
    dispatch({ type: "loading" });
    const token = window.localStorage.getItem("token");
    try {
      const response = await postData(`${BASE_URL}/proposals/`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "proposal/sendProposal", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const clearMessage = () => {
    dispatch({ type: "clearMessage" });
  };

  return (
    <FreelancerContext.Provider
      value={{
        isLoading,
        error,
        proposals,
        proposal,
        freelancers,
        clearMessage,
        sendProposal,
        getAllFreelancers,
      }}
    >
      {children}
    </FreelancerContext.Provider>
  );
}

function useFreelancer() {
  const context = useContext(FreelancerContext);
  return context;
}

export { FreelancerProvider, useFreelancer };
