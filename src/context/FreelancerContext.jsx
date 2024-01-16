import { BASE_URL } from "@/constants";
import { getData, getOne, postData, updateData } from "@/utils/api/genericAPI";
import { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "freelancers/getAll":
      return { ...state, freelancers: action.payload, isLoading: false };

    case "proposal/sendProposal":
      return { ...state, proposal: action.payload, isLoading: false };

    case "project/sendDeliverables":
      return { ...state, successMessage: action.payload, isLoading: false };

    case "freelancer/getOne":
      return { ...state, freelancer: action.payload, isLoading: false };

    case "freelancer/update":
      return { ...state, freelancer: action.payload, isLoading: false };

    case "loading":
      return { ...state, isLoading: true, successMessage: "", error: "" };

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
  proposal: {},
  proposals: "",
  freelancer: {},
  freelancers: [],
};

function FreelancerProvider({ children }) {
  const [
    { isLoading, error, proposals, proposal, freelancers, freelancer, successMessage },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getAllFreelancers = async (query) => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(
        `${BASE_URL}/users/freelancers${query ? `?${query}` : ""}`
      );

      dispatch({ type: "freelancers/getAll", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        if (error.code === "ERR_NETWORK") {
          dispatch({ type: "rejected", payload: error?.message });
        } else {
          dispatch({ type: "rejected", payload: error?.response?.data.message });
        }
      }
    }
  };

  const getFreelancerById = async (id) => {
    dispatch({ type: "loading" });
    try {
      const response = await getOne(`${BASE_URL}/users`, id);
      dispatch({ type: "freelancer/getOne", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        if (error.code === "ERR_NETWORK") {
          dispatch({ type: "rejected", payload: error?.message });
        } else {
          dispatch({ type: "rejected", payload: error?.response?.data.message });
        }
      }
    }
  };

  const updateFreelancer = async (id, data) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await updateData(`${BASE_URL}/users`, id, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "freelancer/update", payload: response.data.message });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const sendProposal = async (data) => {
    dispatch({ type: "loading" });
    const token = window.localStorage.getItem("token");
    const payload = new FormData();

    for (const field in data) {
      if (Object.hasOwnProperty.call(data, field)) {
        if (field === "attachments" && Array.isArray(data[field])) {
          data[field].forEach((file) => {
            payload.append(`attachments`, file);
          });
        } else {
          payload.append(field, data[field]);
        }
      }
    }
    try {
      const response = await postData(`${BASE_URL}/proposals/`, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "proposal/sendProposal", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };
  const sendDeliverables = async (id, data) => {
    dispatch({ type: "loading" });
    const token = window.localStorage.getItem("token");
    const payload = new FormData();

    data.forEach((file) => {
      payload.append(`deliverables`, file);
    });

    try {
      const response = await updateData(
        `${BASE_URL}/projects/send_deliverables`,
        id,
        payload,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "project/sendDeliverables", payload: response.data.status });
    } catch (error) {
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

  return (
    <FreelancerContext.Provider
      value={{
        isLoading,
        error,
        proposals,
        proposal,
        successMessage,
        freelancers,
        freelancer,
        clearMessage,
        sendProposal,
        sendDeliverables,
        getAllFreelancers,
        getFreelancerById,
        updateFreelancer,
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
