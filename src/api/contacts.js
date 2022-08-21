import axios from "axios";

/**
 * creating axios by setting the base url. 
 */
export default axios.create({
  baseURL: "http://localhost:3006/",
});
