import { BASE_URL } from "./baseURL";
import { commonAPI } from "./commonAPI";

// register

export const registerAPI = async (user) => {
  // Make a POST request to the registration endpoint using the commonAPI function.
  // It passes the HTTP method ("POST"), the registration endpoint URL, user data, and an empty string as headers.
  return await commonAPI("POST", `${BASE_URL}/user/register`, user, "");
};

// Api To  Login

export const loginAPI = async (user) => {
  return await commonAPI("POST", `${BASE_URL}/user/login`, user, "");
};

// ADD PROJECT

// This function adds a project via an API request
export const addProjectAPI = async (reqBody, reqHeader) => {
  // Await the result of a commonAPI call with appropriate parameters
  return await commonAPI(
    "POST", // HTTP method: POST
    `${BASE_URL}/projects/add`, // URL to send the request to
    reqBody, // Request body containing project data
    reqHeader // Request header containing authorization or other necessary information
  );
};

// API to display home projects

export const homeProjectAPI = async () => {
  return await commonAPI("GET", `${BASE_URL}/projects/home-projects`, "", "");
};

// all projects

export const allProjectAPI = async (searchKey, reqHeader) => {
  return await commonAPI(
    "GET",
    `${BASE_URL}/projects/all?search=${searchKey}`,
    "",
    reqHeader
  );
};

export const userProjectAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${BASE_URL}/projects/all-projects`,
    "",
    reqHeader
  );
};

export const editProjectAPI = async (projectId, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${BASE_URL}/projects/edit/${projectId}`,
    reqBody,
    reqHeader
  );
};

export const deleteProjectAPI= async (projectId,reqHeader)=>{
  return await commonAPI("DELETE", `${BASE_URL}/projects/remove/${projectId}`,{},reqHeader)
}
