import {Content, Text, Button, Form, Label, Item, Input} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import validator from 'validator';

const validate = values => {
  const error = {};
  error.nome = '';
  error.urlImagem = '';

  const nome = values.nome || '';

  const urlImagem = values.urlImagem || '';

  if (nome.length < 3 || nome.length > 15) {
    error.nome = 'Nome deve ter entre 3 e 15 caracteres';
  }

  if (!validator.isURL(urlImagem)) {
    error.urlImagem = 'URL inválida';
  }

  return error;
};

class MantemAnimalForm extends Component {
  renderInput = ({input, label, meta: {touched, error}}) => {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item floatingLabel error={hasError}>
        <Label>
          {label} {touched && hasError && ` - ${error}`}
        </Label>
        <Input {...input} />
      </Item>
    );
  };

  componentDidMount() {
    let {animal, initialize} = this.props;
    animal = animal || {};
    initialize({
      nome: animal.nome,
      urlImagem: animal.urlImagem,
      _id: animal._id,
      favoritoUsuarios: animal.favoritoUsuarios || [],
    });
  }

  render() {
    const {invalid, handleSubmit} = this.props;

    return (
      <Content padder>
        <Form>
          <Field name="nome" label="Nome" component={this.renderInput} />
          <Field
            name="urlImagem"
            label="URL Imagem"
            component={this.renderInput}
          />
          <Button
            disabled={invalid}
            bordered={invalid}
            full
            primary
            style={styles.botaoSalvar}
            onPress={handleSubmit}>
            <Text>Salvar</Text>
          </Button>
        </Form>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  botaoSalvar: {marginTop: 10},
});

export default reduxForm({
  form: 'mantemAnimal',
  validate,
})(MantemAnimalForm);
