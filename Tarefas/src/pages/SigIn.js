import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
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
      password: ''
    }
    dict_users = {}
  }

  sucessoCadastro(){
    Alert.alert(
      'Dados cadastrados',
      'Usuário e Senha cadastrados com sucesso',
      [
        {text: 'Voltar para Login', onPress: () => this.props.navigation.navigate('Login')},
      ],
      {cancelable: false},
    );
  }

  cadastraUser(){
    const {email, password} = this.state;

    (email && password) && (
      fb.auth().createUserWithEmailAndPassword(email, password)
        .then(retorno => this.sucessoCadastro())
        .catch(err => console.log(err))
    )
  }


  render() {
    return (
      <View style={styles.container} >
        <View style={styles.input}>
          <TextField
            label='E-mail'
            value={this.state.email}
            onChangeText={ (email) => this.setState({ email })}
          />
        </View>
        <View style={styles.input} >
          <PasswordInputText
            required
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        <View style={styles.buttonCadastrar} >
          <Button
            color="#000"
            title="CADASTRAR"
            onPress={this.cadastraUser.bind(this)}
          />
        </View>
      </View>
    );
  }
}

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
    borderRadius: 5
  },
  campos: {
    margin: 15,
    borderWidth: 0.5,
    borderRadius: 5
  },
  buttonCadastrar: {
    marginTop: 15,
    marginRight: 60,
    marginLeft: 60,
    opacity: 0.8,
    backgroundColor: "#458B00",
    borderRadius: 5
  }
});
