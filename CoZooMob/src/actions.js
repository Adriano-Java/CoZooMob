import {
  LOGIN,
  FAVORITAR,
  DESFAVORITAR,
  CARREGAR_ANIMAIS,
  SET_LOADING,
  INCLUIR_ANIMAL,
} from './constants';
import {carregarAnimaisAPI, loginAPI, incluirAnimaisAPI} from './api';

function loadingWrapper(asyncFunc) {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      data: true,
    });
    return asyncFunc(dispatch).finally(() => {
      dispatch({
        type: SET_LOADING,
        data: false,
      });
    });
  };
}

export function login(usuario, senha) {
  return loadingWrapper(dispatch =>
    loginAPI(usuario, senha).then(res => {
      dispatch({
        type: LOGIN,
        data: {usuarioLogado: usuario, token: res.data.token},
      });
    }),
  );
}

export function favoritar(animal, usuario) {
  return {
    type: FAVORITAR,
    data: {
      animal,
      usuario,
    },
  };
}

export function desfavoritar(animal, usuario) {
  return {
    type: DESFAVORITAR,
    data: {
      animal,
      usuario,
    },
  };
}

export function carregarAnimais() {
  return loadingWrapper(dispatch =>
    carregarAnimaisAPI().then(res => {
      dispatch({
        type: CARREGAR_ANIMAIS,
        data: res.data,
      });
    }),
  );
}

export function incluirAnimal(animal) {
  return loadingWrapper(dispatch =>
    incluirAnimaisAPI(animal).then(res => {
      dispatch({
        type: INCLUIR_ANIMAL,
        data: res.data,
      });
    }),
  );
}
