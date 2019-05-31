import React from 'react';
import { StyleSheet, View, Button, Alert, ScrollView } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';
import { fb, db } from '../../utils/Firebase';

export default class SigIn extends React.Component {
  
  static navigationOptions = {
    title: "Cadastro"
  }
  
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorSenha: ''
    }
  };

  sucessoCadastro(){
    Alert.alert(
      'Dados cadastrados',
      'Usuário e Senha cadastrados com sucesso',
      [
        {text: 'Voltar para Login', onPress: () => this.props.navigation.navigate('Login')},
        {text: 'Permanecer na tela', onPress: () => this.setState({ email: '', password: '' , errorEmail: '', errorSenha: ''})},
      ],
      {cancelable: false},
    );
  };

  errorCadastro(mensagem){
    Alert.alert(
       `${mensagem}`,
       '',
      [
        {text: 'Ok'},

      ],
      {cancelable: true},
    );
  };

  cadastraUser(){
    const {email, password} = this.state;

    (email && password) ?
       fb.auth().createUserWithEmailAndPassword(email, password)
          .then(retorno => this.sucessoCadastro())
          .catch(message => {
              this.errorCadastro(message);
          })
    :
      (!email && this.setState({ errorEmail: "CAMPO OBRIGATÓRIO" })) ||
      (!password && this.setState({ errorSenha: "CAMPO OBRIGATÓRIO" }));
  };


  render() {
    return (
      <View style={styles.container} >
        <ScrollView>
          <View style={styles.input}>
            <TextField
              label='E-mail'
              placeholder='Digite seu e-mail'
              value={this.state.email}
              error={this.state.errorEmail}
              onChangeText={( email ) => this.setState({ email, errorEmail: '' })}
            />
          </View>
          <View style={styles.input} >
            <PasswordInputText
              placeholder='Digite sua senha'
              value={this.state.password}
              error={this.state.errorSenha}
              onChangeText={( password ) => this.setState({ password, errorSenha: '' })}
            />
          </View>
          <View style={styles.buttonCadastrar} >
            <Button
              color="#000"
              title="CADASTRAR"
              onPress={this.cadastraUser.bind(this)}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonSobre} >
          <Button
            color="#fff"
            title="Sobre"
            onPress={() => this.props.navigation.navigate('Sobre')}
          />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffff'
  },
  input: {
    margin: 50,
    marginTop: 15,
    marginVertical: 5
  },
  form: {
    opacity: 0.5,
    backgroundColor: "#d3d3d3",
    borderRadius: 10
  },
  campos: {
    margin: 15,
    borderWidth: 0.5,
    borderRadius: 10
  },
  buttonCadastrar: {
    marginTop: 15,
    marginRight: 60,
    marginLeft: 60,
    opacity: 0.8,
    backgroundColor: "#458B00",
    borderRadius: 10
  },
  buttonSobre: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#A2CD5A",
    margin: 4
  }
});
