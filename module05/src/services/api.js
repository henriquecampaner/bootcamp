import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});
// cria-se a base url para fazer a requisicao

export default api;
