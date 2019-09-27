/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import Animal from './Animal';
import {carregarAnimais} from '../actions';
import {bindActionCreators} from 'redux';
import {Content, Fab, Icon, View} from 'native-base';
import {StyleSheet} from 'react-native';

class ListaAnimais extends Component {
  componentDidMount() {
    this.props.carregarAnimais();
  }

  render() {
    const {animais} = this.props;

    return (
      <View style={styles.container}>
        <Content padder>
          <FlatList
            data={animais}
            renderItem={({item}) => <Animal animal={item} />}
            keyExtractor={item => item._id}
          />
        </Content>
        <Fab
          containerStyle={{}}
          style={styles.fab}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('IncluirAnimal')}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

const mapStateToProps = state => {
  return {
    animais: state.animais,
    usuarioLogado: state.usuarioLogado,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({carregarAnimais}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListaAnimais);
