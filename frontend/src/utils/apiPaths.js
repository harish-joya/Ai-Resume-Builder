const isProduction = import.meta.env.PROD;

export const BASE_URL = isProduction
  ? "/api" // Render
  : "http://localhost:40000/api"; // Local

export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GET_PROFILE: "/auth/profile",
  },

  RESUME: {
    CREATE: "/resumes/",
    GET_ALL: "/resumes",

    GET_BY_ID: (id) => `/resumes/${id}`,
    UPDATE: (id) => `/resumes/${id}`,
    DELETE: (id) => `/resumes/${id}`,
    UPLOAD_IMAGES: (id) => `/resumes/${id}/upload-image`,
  },

  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image",
  },

  AI: {
    CATEGORIZE_SKILLS: "/ai/categorize-skills",
    GENERATE_SUMMARY: "/ai/generate-summary",
  },
};