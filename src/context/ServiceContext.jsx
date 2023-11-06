import { getData } from "@/utils/api/genericAPI";
import { createContext, useReducer, useEffect, useContext } from "react";
import { BASE_URL } from "@/constants";

function reducer(state, action) {
  switch (action.type) {
    case "categories/fetch":
      return { ...state, categories: action.payload };

    case "rejected":
      return { ...state, error: action.payload };
    case "reset":
      return { ...state, ...initialState };
  }
}

const initialState = {
  categories: null,
  isLoading: false,
  error: "",
};

const ServicesContext = createContext();

function ServicesProvider({ children }) {
  const [{ categories, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchCategories = async () => {
    try {
      const response = await getData(`${BASE_URL}/categories`);
      dispatch({ type: "categories/fetch", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const getCategory = async (category) => {
    try {
      const response = await getData(
        `${BASE_URL}/categories/get_by_path/${category}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategory = async (path) => {
    try {
      const response = await getData(
        `${BASE_URL}/subCategories/get_by_path/${path}`
      );
      return response.data.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const getService = async (path) => {
    try {
      const response = await getData(
        `${BASE_URL}/services/get_by_path/${path}`
      );
      return response.data.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        categories,
        isLoading,
        error,
        dispatch,
        getCategory,
        getSubCategory,
        getService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

const useServices = () => {
  const context = useContext(ServicesContext);
  return context;
};

export { useServices, ServicesProvider };
