import { BASE_URL } from "@/constants";
import { getData, getOne, postData, updateData } from "@/utils/api/genericAPI";
import { createContext, useContext, useReducer } from "react";
import { useRouter } from "next/router";
function reducer(state, action) {
  switch (action.type) {
    case "gig/create":
      return { ...state, gig: action.payload, isLoading: false };
    case "gig/get":
      return { ...state, gig: action.payload, isLoading: false };
    case "gigs/getAll":
      return { ...state, gigs: action.payload, isLoading: false };
    case "gigs/fetch":
      return { ...state, freelancerGigs: action.payload, isLoading: false };
    case "gigs/fetch_by_subcategory":
      return { ...state, gigs: action.payload, isLoading: false };
    case "gigs/fetch_by_service":
      return { ...state, gigs: action.payload, isLoading: false };
    case "gig/update":
      return { ...state, updatedGig: action.payload, isLoading: false };
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
const GigContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  gig: {},
  gigs: {},
  freelancerGigs: {},
  updatedGig: {},
  successMessage: "",
};

function GigProvider({ children }) {
  const [{ isLoading, error, gig, gigs, freelancerGigs, successMessage }, dispatch] =
    useReducer(reducer, initialState);
  const router = useRouter();

  const getGigById = async (id) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await getOne(`${BASE_URL}/gigs`, id, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "gig/get", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const getAllGigs = async (query) => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/gigs${query ? `?${query}` : ""}`);

      dispatch({ type: "gigs/getAll", payload: response.data });
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

  const fetchFreelancerGigs = async (id) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/gigs/fetch_freelancer_gigs/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "gigs/fetch", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const fetchGigsBySubCategory = async (id) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/gigs/fetch_by_subcategory/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "gigs/fetch_by_subcategory", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const fetchGigsByService = async (id) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/gigs/fetch_by_service/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "gigs/fetch_by_service", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const postGig = async (data) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/gigs`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "gig/create", payload: response.data });
      localStorage.setItem("gig_id", response.data.data._id);
      router.replace(`edit/${response.data.data._id}?step=02`);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const updateGigOverview = async (id, data) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await updateData(`${BASE_URL}/gigs/update_overview`, id, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "gig/update", payload: response.data });
      router.replace(`${response.data.data._id}?step=02`);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };
  const updateGigPricing = async (data, id) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await updateData(`${BASE_URL}/gigs/update_pricing`, id, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "gig/update", payload: response.data });
      router.replace(`${response.data.data._id}?step=03`);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const updateGigGallery = async (id, data) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    const payload = new FormData();
    for (const field in data) {
      if (Object.hasOwnProperty.call(data, field)) {
        if (field === "gallery" && Array.isArray(data[field])) {
          data[field].forEach((file) => {
            payload.append(`gallery`, file);
          });
        } else {
          payload.append(field, data[field]);
        }
      }
    }
    try {
      const response = await updateData(`${BASE_URL}/gigs/update_gallery`, id, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "gig/update", payload: response.data });
      router.replace(`${response.data.data._id}?step=04`);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const resetGigs = () => {
    dispatch({ type: "reset" });
  };

  return (
    <GigContext.Provider
      value={{
        isLoading,
        error,
        successMessage,
        freelancerGigs,
        gig,
        gigs,
        fetchGigsByService,
        fetchGigsBySubCategory,
        fetchFreelancerGigs,
        getGigById,
        getAllGigs,
        postGig,
        resetGigs,
        updateGigOverview,
        updateGigPricing,
        updateGigGallery,
      }}
    >
      {children}
    </GigContext.Provider>
  );
}

const useGigs = () => {
  const context = useContext(GigContext);
  return context;
};

export { GigProvider, useGigs };
