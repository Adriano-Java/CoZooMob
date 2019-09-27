import React, {Component} from 'react';
import {
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import {Body, Card, CardItem, Right, Icon} from 'native-base';
import BotaoFavoritar from './BotaoFavoritar';
import {favoritar, desfavoritar, excluirAnimal} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const {width} = Dimensions.get('screen');

class Animal extends Component {
  isFavoritado(animal, usuarioLogado) {
    return !!animal.favoritoUsuarios.find(usuario => usuario === usuarioLogado);
  }

  excluir(animal) {
    Alert.alert(
      'Ateção!',
      'Confirme a exclusão do animal ' + animal.nome + '?',
      [
        {text: 'OK', onPress: () => this.props.excluirAnimal(animal)},
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }

  render() {
    const {animal, navigation} = this.props;

    return (
      <Card>
        <CardItem header bordered>
          <Text style={style.nomeAnimal}>{animal.nome}</Text>
          <Right>
            <View style={style.actionIconContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AlterarAnimal', {animal})}>
                <Icon name="create" style={style.icone} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.excluir(animal)}>
                <Icon name="trash" style={style.icone} />
              </TouchableOpacity>
            </View>
          </Right>
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
  bindActionCreators({favoritar, desfavoritar, excluirAnimal}, dispatch);

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

  icone: {fontSize: 30, color: 'green'},

  actionIconContainer: {flexDirection: 'row'},

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
