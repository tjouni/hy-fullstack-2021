import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  console.log(newToken);
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const incrementLikes = async (id) => {
  const url = `${baseUrl}/${id}`;
  const getResponse = await axios.get(url);
  const updatedBlog = {
    ...getResponse.data,
    likes: getResponse.data.likes + 1,
  };
  const config = { headers: { Authorization: token } };
  await axios.put(url, updatedBlog, config);
  return updatedBlog;
};

const remove = async (id) => {
  const url = `${baseUrl}/${id}`;
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(url, config);
  return response;
};

export default { getAll, create, setToken, incrementLikes, remove };
