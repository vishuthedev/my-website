import axios, { AxiosResponse, AxiosError } from "axios";
// import { createApiError } from "./ApiError";

const baseUrl = "https://mywebsite.com/wp-json/";
const CONTACT_API = `${baseUrl}contact-form-7/v1/contact-forms`;

export const getBlogPosts = async () => {
  try {
    const response = await axios.get(`${baseUrl}wp/v2/posts`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching blog posts: " + (error as Error).message);
  }
};

export const postFormData = async (
  endpoint: string,
  formData: FormData
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(`${CONTACT_API}${endpoint}`, formData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError for more specific error information
      throw new Error('Error in API response');
    } else {
      // Handle other types of errors
      throw new Error('Unknown error in API response');
    }
  }
};
