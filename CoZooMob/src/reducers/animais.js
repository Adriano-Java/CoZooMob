import {
  FAVORITAR,
  DESFAVORITAR,
  CARREGAR_ANIMAIS,
  INCLUIR_ANIMAL,
  ALTERAR_ANIMAL,
  EXCLUIR_ANIMAL,
} from '../constants';

const initialState = [];

function atualizarAnimal(listaAnimais, animal) {
  return listaAnimais.map(a => (a._id === animal._id ? animal : a));
}

export default function animaisReducer(state = initialState, action) {
  switch (action.type) {
    case CARREGAR_ANIMAIS:
      return action.data;

    case INCLUIR_ANIMAL:
      return [...state, action.data];

    case ALTERAR_ANIMAL:
      return atualizarAnimal(state, action.data);

    case EXCLUIR_ANIMAL:
      return state.filter(animal => animal._id !== action.data._id);

    case FAVORITAR: {
      const {animal, usuario} = action.data;
      const novoAnimal = {...animal};
      novoAnimal.favoritoUsuarios = [
        novoAnimal.favoritoUsuarios.filter,
        usuario,
      ];
      return atualizarAnimal(state, novoAnimal);
    }

    case DESFAVORITAR: {
      const {animal, usuario} = action.data;
      const novoAnimal = {...animal};
      novoAnimal.favoritoUsuarios = novoAnimal.favoritoUsuarios.filter(
        u => u !== usuario,
      );
      return atualizarAnimal(state, novoAnimal);
    }

    default:
      return state;
  }
}
