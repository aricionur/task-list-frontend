import { AxiosInstance } from "axios";

// Utility function to check and convert date strings
const isIso8601 = (value: any): boolean => {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
  );
};

// Recursive function to parse dates in an object or array
const parseDates = (data: any): any => {
  if (data === null || typeof data !== "object") {
    return data;
  }

  for (const key of Object.keys(data)) {
    const value = data[key];

    if (isIso8601(value)) {
      data[key] = new Date(value);
    } else if (typeof value === "object") {
      parseDates(value);
    }
  }

  return data;
};

export const addResponseInterceptors = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => {
      parseDates(response.data);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
