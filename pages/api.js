import axios from "axios";

const URL = "https://dpt-api-dev.extensionsoft.biz";

const api = {
  async login(username, password) {
    const response = await axios.post(`${URL}/auth/v1/signin`, {
      username,
      password,
    });
    return response.data.data.access_token;
  },
  async fetchRequests(token, page = 1, pageSize = 10) {
    const response = await axios.get(
      `${URL}/request/v1/requests-testing?page=${page}&page_size=${pageSize}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.data;
  },
  async fetchRequestDetails(token, id) {
    const response = await axios.get(
      `${URL}/request/v1/request-testing/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.data;
  },
};
export default api;
