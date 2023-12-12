import { BASE_URL } from "@/constants";
import { getData, postData, updateData } from "@/utils/api/genericAPI";
import { useRouter } from "next/router";
import { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "project/getProject":
      return { ...state, project: action.payload, isLoading: false };

    case "project/postProject":
      return { ...state, successMessage: action.payload, isLoading: false };

    case "project/updateProject":
      return { ...state, successMessage: action.payload, isLoading: false };

    case "project/fetchClientProjects":
      return { ...state, isLoading: false, clientProjects: action.payload };

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
const ProjectContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  project: {},
  clientProjects: {},
  successMessage: "",
};

function ProjectProvider({ children }) {
  const [{ isLoading, error, project, clientProjects }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const router = useRouter();

  const fetchClientProjects = async (userId) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await getData(
        `${BASE_URL}/projects/get_client_projects/${userId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "project/fetchClientProjects", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const getProjectById = async (id) => {
    dispatch({ type: "loading" });
    try {
      const response = await getData(`${BASE_URL}/projects/${id}`);
      dispatch({ type: "project/getProject", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const postProject = async (data) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await postData(`${BASE_URL}/projects/`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "project/postProject", payload: response.data.message });
      router.push("/client/projects");
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const updateProject = async (id, data) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await updateData(`${BASE_URL}/projects`, id, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "project/updateProject", payload: response.data.message });
      router.push("/client/projects");
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        isLoading,
        error,
        project,
        clientProjects,
        getProjectById,
        updateProject,
        postProject,
        fetchClientProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

function useProjects() {
  const context = useContext(ProjectContext);
  return context;
}

export { ProjectProvider, useProjects };
