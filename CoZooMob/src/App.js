import {Container, Header, Title} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import Login from './components/Login';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ListaAnimais from './components/ListaAnimais';
import Carregando from './components/Carregando';
import IncluirAnimal from './components/IncluirAnimal';

const store = configureStore();

const AppNavigator = createStackNavigator(
  {
    Login,
    ListaAnimais,
    IncluirAnimal,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: () => (
        <Header style={styles.header}>
          <Title>Controle de Animais</Title>
        </Header>
      ),
    },
  },
);

const Navigation = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Navigation />
          <Carregando />
        </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 30,
  },
  separetator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginBottom: 10,
  },
});
