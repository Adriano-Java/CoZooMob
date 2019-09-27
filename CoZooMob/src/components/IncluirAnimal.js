import {Button, Body, Right} from 'native-base';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header, Title} from 'react-native';
import MantemAnimalForm from './MantemAnimalForm';
import {bindActionCreators} from 'redux';
import {incluirAnimal} from '../actions';
import Alerta from '../util/Alerta';

class IncluirAnimal extends Component {
  static navigationonOptions = ({navigation}) => ({
    header: (
      <Header>
        <left>
          <Button transparent onPress={() => navigation.goBack()}>
            Icon name="arrow-back" />
          </Button>
        </left>
        <Body>
          <Title>Incluir Animal</Title>
        </Body>
        <Right />
      </Header>
    ),
  });

  handleIncluirAnimal = animal => {
    animal.favoritoUsuarios = [];
    this.props
      .incluirAnimal(animal)
      .then(() => this.props.navigation.navigate('ListaAnimais'))
      .catch(error =>
        Alerta.mensagem('Erro ao incluir animal' + error.message),
      );
  };

  render() {
    return <MantemAnimalForm onSubmit={this.handleIncluirAnimal} />;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({incluirAnimal}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncluirAnimal);
