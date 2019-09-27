import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cozooapi.herokuapp.com/v1/',
});

export function carregarAnimaisAPI() {
  return api.get('/animais');
}

export function detalharAnimaisAPI(id) {
  return api.get(`/animais/${id}`);
}

export function excluirAnimaisAPI(id) {
  return api.get(`/animais/${id}`);
}

export function incluirAnimaisAPI(animal) {
  return api.post('/animais', animal);
}

export function atualizarAnimaisAPI(animal) {
  return api.get(`/animais/${animal._id}`, animal);
}

export function loginAPI(usuario, senha) {
  return api.post('/login', {usuario, senha}).then(res => {
    api.defaults.headers.common.Authorization = res.data.token;
    return res;
  });
}
