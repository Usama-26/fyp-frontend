import { BASE_URL } from "@/constants";
import { getData, postData } from "@/utils/api/genericAPI";
import { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "proposal/sendProposal":
      return { ...state, proposal: action.payload, isLoading: false };

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
const FreelancerContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  proposal: "",
  proposals: "",
};

function FreelancerProvider({ children }) {
  const [{ isLoading, error, proposals, proposal }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
      console.log(error);
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  return (
    <FreelancerContext.Provider
      value={{ isLoading, error, proposals, proposal, sendProposal }}
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
