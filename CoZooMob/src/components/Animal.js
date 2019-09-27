import React, {Component} from 'react';
import {Image, Text, Dimensions, StyleSheet} from 'react-native';
import {Body, Card, CardItem} from 'native-base';
import BotaoFavoritar from './BotaoFavoritar';
import {favoritar, desfavoritar} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const {width} = Dimensions.get('screen');

class Animal extends Component {
  isFavoritado(animal, usuarioLogado) {
    return !!animal.favoritoUsuarios.find(usuario => usuario === usuarioLogado);
  }

  render() {
    const {animal} = this.props;

    return (
      <Card>
        <CardItem header bordered>
          <Text style={style.nomeAnimal}>{animal.nome}</Text>
        </CardItem>

        <CardItem bordered>
          <Body>
            <Image
              source={{
                uri: animal.urlImagem,
              }}
              style={style.imagemAnimal}
            />
          </Body>
        </CardItem>

        <CardItem footer bordered>
          <BotaoFavoritar
            favoritado={this.isFavoritado(animal, this.props.usuarioLogado)}
            favoritarCallback={() =>
              this.props.favoritar(animal, this.props.usuarioLogado)
            }
            desfavoritarCallback={() =>
              this.props.desfavoritar(animal, this.props.usuarioLogado)
            }
          />
          <Text style={style.favoritado}>
            Este animal
            {animal.favoritoUsuarios.length
              ? ` já foi favoritado por ${
                  animal.favoritoUsuarios.length
                } usuário${animal.favoritoUsuarios.length > 1 ? 's' : ''}`
              : ' ainda não foi favoritado'}
          </Text>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    animais: state.animais,
    usuarioLogado: state.usuarioLogado,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({favoritar, desfavoritar}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Animal);

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '800',
  },

  defaultConfig: {
    fontSize: 16,
  },

  nomeAnimal: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
  },

  imagemAnimal: {
    width: width * 0.7,
    height: width * 0.7,
  },

  estrelinha: {
    color: 'blue',
    backgroundColor: 'white',
  },

  favoritado: {
    fontSize: 16,
    color: 'blue',
    backgroundColor: 'white',
  },
});
