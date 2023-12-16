import { getData } from "@/utils/api/genericAPI";
import { createContext, useReducer, useContext } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "fetch/universities":
      return { ...state, universities: action.payload, isLoading: false };
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    case "reset":
      return { ...state, ...initialState };
  }
}

const initialState = {
  isLoading: false,
  error: "",
  universities: [],
  languages: [],
};

const ThirdPartyContext = createContext();

function ThirdPartyServicesProvider({ children }) {
  const [{ isLoading, error, universities }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchUniversities = async (country) => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(
        `http://universities.hipolabs.com/search?country=${country}`
      );
      dispatch({ type: "fetch/universities", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  return (
    <ThirdPartyContext.Provider
      value={{ isLoading, error, universities, fetchUniversities }}
    >
      {children}
    </ThirdPartyContext.Provider>
  );
}

const useThirdPartyServices = () => {
  const context = useContext(ThirdPartyContext);
  return context;
};

export { useThirdPartyServices, ThirdPartyServicesProvider };
