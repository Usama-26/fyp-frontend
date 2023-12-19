import { BASE_URL } from "@/constants";
import { getData, getOne, postData, updateData } from "@/utils/api/genericAPI";
import { useRouter } from "next/router";
import { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "proposal/getProposal":
      return { ...state, proposal: action.payload, isLoading: false };

    case "proposal/postproposal":
      return { ...state, successMessage: action.payload, isLoading: false };

    case "proposal/fetchFreelancerProposals":
      return { ...state, isLoading: false, freelancerProposals: action.payload };

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
const ProposalContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  proposal: {},
  freelancerProposals: {},
  successMessage: "",
};

function ProposalProvider({ children }) {
  const [{ isLoading, error, proposal, freelancerProposals }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const router = useRouter();

  const fetchFreelancerProposals = async (userId) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await getData(
        `${BASE_URL}/proposals/get_client_proposals/${userId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "proposal/fetchClientproposals", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const fetchProposals = async () => {
    try {
      const response = await getData(`${BASE_URL}/proposals`);
      dispatch({ type: "proposal/fetchproposals", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const getProposalById = async (id) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await getOne(`${BASE_URL}/proposals/`, id, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "proposal/getProposal", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const postProposal = async (data) => {
    const token = window.localStorage.getItem("token");

    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/proposals/`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "proposal/postproposal", payload: response.data.message });
      router.push("/client/proposals");
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  return (
    <ProposalContext.Provider
      value={{
        isLoading,
        error,
        proposal,
        getProposalById,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
}

function useProposals() {
  const context = useContext(ProposalContext);
  return context;
}

export { ProposalProvider, useProposals };
