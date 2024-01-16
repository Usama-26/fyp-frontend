import { BASE_URL } from "@/constants";
import { deleteData, getData, postData, updateData } from "@/utils/api/genericAPI";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "project/getProject":
      return { ...state, project: action.payload, isLoading: false };

    case "project/postProject":
      return { ...state, successMessage: action.payload, isLoading: false };

    case "project/updateProject":
      return { ...state, successMessage: action.payload, isLoading: false };

    case "project/deleteProject":
      return { ...state, successMessage: action.payload, isLoading: false };

    case "project/fetchClientProjects":
      return { ...state, isLoading: false, clientProjects: action.payload };

    case "project/fetchFreelancerProjects":
      return { ...state, isLoading: false, freelancerProjects: action.payload };

    case "project/fetchProjects":
      return { ...state, isLoading: false, projects: action.payload };

    case "loading":
      return { ...state, isLoading: true, error: "" };

    case "clearMessage":
      return { ...state, successMessage: "" };

    case "clearError":
      return { ...state, error: "" };

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
  projects: {},
  clientProjects: {},
  freelancerProjects: {},
  successMessage: "",
};

function ProjectProvider({ children }) {
  const [
    {
      isLoading,
      error,
      successMessage,
      project,
      projects,
      clientProjects,
      freelancerProjects,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
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

  const fetchFreelancerProjects = async (userId) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await getData(
        `${BASE_URL}/projects/get_freelancer_projects/${userId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "project/fetchFreelancerProjects", payload: response.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const fetchProjects = async (query) => {
    try {
      const response = await getData(`${BASE_URL}/projects${query ? `?${query}` : ""}`);
      dispatch({ type: "project/fetchProjects", payload: response?.data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error?.response?.data?.message });
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
      const response = await postData(`${BASE_URL}/projects/`, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "project/postProject", payload: response.data.message });
      return response.data.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({ type: "rejected", payload: error?.message });
      } else {
        dispatch({ type: "rejected", payload: error?.response?.data.message });
      }
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
      return response.data.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  const deleteProject = async (id) => {
    const token = window.localStorage.getItem("token");
    dispatch({ type: "loading" });
    try {
      const response = await deleteData(`${BASE_URL}/projects`, id, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "project/deleteProject", payload: response.data.message });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.response.data.message });
    }
  };

  useEffect(() => {
    dispatch({ type: "clearMessage" });
    dispatch({ type: "clearError" });
  }, [router]);

  return (
    <ProjectContext.Provider
      value={{
        isLoading,
        error,
        successMessage,
        projects,
        project,
        clientProjects,
        freelancerProjects,
        fetchProjects,
        getProjectById,
        updateProject,
        postProject,
        deleteProject,
        fetchClientProjects,
        fetchFreelancerProjects,
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
