import axios from "axios";

// This function is a common API wrapper that sends HTTP requests using axios.
// It takes in parameters such as the HTTP method, URL, request body, and request headers.
export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
  // Construct the request configuration object with method, URL, request body, and request headers.
  const reqConfig = {
    method: httpRequest, // Specifies the HTTP method for the request (e.g., GET, POST).
    url, // The URL to which the request will be sent.
    data: reqBody, // The data or payload to be sent with the request.
    headers: reqHeader ? reqHeader : { "Content-type": "application/json" }, // Specifies the request headers. Default to JSON content type if not provided.
  };

  // Send the HTTP request using axios, handling both successful responses and errors.
  return await axios(reqConfig) // Await the axios request and return the result or error.
    .then((result) => {
      return result; // Return the successful response data.
    })
    .catch((err) => {
      return err; // Return the error if the request fails.
    });
};
