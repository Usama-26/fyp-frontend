import { getData } from "@/utils/api/genericAPI";
import { createContext, useReducer, useEffect, useContext } from "react";
import { BASE_URL } from "@/constants";

function reducer(state, action) {
  switch (action.type) {
    case "categories/fetch":
      return { ...state, categories: action.payload, isLoading: false };
    case "subCategories/fetch":
      return { ...state, subCategories: action.payload, isLoading: false };
    case "services/fetch":
      return { ...state, services: action.payload, isLoading: false };
    case "languages/fetch":
      return { ...state, languages: action.payload, isLoading: false };
    case "skills/fetch":
      return { ...state, skills: action.payload, isLoading: false };
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    case "reset":
      return { ...state, ...initialState };
  }
}

const initialState = {
  categories: null,
  services: {},
  subCategories: {},
  languages: [],
  skills: [],
  isLoading: false,
  error: "",
};

const ServicesContext = createContext();

function ServicesProvider({ children }) {
  const [
    { categories, services, subCategories, skills, languages, isLoading, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const fetchCategories = async () => {
    try {
      const response = await getData(`${BASE_URL}/categories`);
      dispatch({ type: "categories/fetch", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await getData(`${BASE_URL}/subCategories`);
      dispatch({ type: "subCategories/fetch", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const fetchServices = async () => {
    try {
      const response = await getData(`${BASE_URL}/services`);
      dispatch({ type: "services/fetch", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const fetchSkills = async () => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/skills`);
      dispatch({ type: "skills/fetch", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await getData(`${BASE_URL}/languages`);
      dispatch({ type: "languages/fetch", payload: response.data });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
    }
  };

  const getCategory = async (category) => {
    try {
      const response = await getData(`${BASE_URL}/categories/get_by_path/${category}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategory = async (path) => {
    try {
      const response = await getData(`${BASE_URL}/subCategories/get_by_path/${path}`);
      return response.data.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const getSubCategoriesByCategory = async (categoryId) => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(
        `${BASE_URL}/subCategories/find_by_category/${categoryId}`
      );
      return response.data.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };
  const getServicesByCategory = async (subCategoryId) => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(
        `${BASE_URL}/services/find_by_subcategory/${subCategoryId}`
      );
      return response.data.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const getService = async (path) => {
    try {
      const response = await getData(`${BASE_URL}/services/get_by_path/${path}`);
      return response.data.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchServices();
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        categories,
        subCategories,
        services,
        isLoading,
        error,
        skills,
        languages,
        dispatch,
        fetchSkills,
        getCategory,
        getSubCategory,
        getService,
        fetchLanguages,
        getSubCategoriesByCategory,
        getServicesByCategory,
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
