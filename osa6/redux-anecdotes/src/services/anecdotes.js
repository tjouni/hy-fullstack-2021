import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const anecdote = { content: content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const vote = async (id) => {
  const url = `${baseUrl}/${id}`;
  const { data } = await axios.get(url);
  const updatedAnecdote = { ...data, votes: data.votes + 1 };
  const response = await axios.put(url, updatedAnecdote);
  return response.data;
};

const anecdoteService = { getAll, create, vote };

export default anecdoteService;
