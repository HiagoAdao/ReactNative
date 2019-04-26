import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';


export default class SigIn extends React.Component {
  
  static navigationOptions = {
    title: "Cadastro"
  }
  
  constructor(){
    super();
    this.state = {
      username: '',
      password: ''
    }
    dict_users = {}
  }

  sucessoCadastro(){
    Alert.alert(
      'Dados cadastrados',
      'Usuário e Senha cadastrados com sucesso',
      [
        {text: 'Voltar para Login', onPress: () => this.props.navigation.navigate('Login', {dict_users: dict_users})},
      ],
      {cancelable: false},
    );
  }

  cadastraUser(){
    const user = this.state.username
    const password = this.state.password

    global.dict_users[user] = password

    if(user in dict_users){
      if(password == '' || user == ''){
        Alert.alert(
          'Dados Inválidos',
          'Por favor, preencha todos os campos',
          [
            {text: 'OK'},
          ],
          {cancelable: true},
        );
      } else {
        this.sucessoCadastro()
      }
    }
  }


  render() {
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: '#dcdcdc'}} >
        <View style={styles.input}>
          <TextField
            label='Username'
            value={this.state.username}
            onChangeText={ (user) => this.setState({ username: user })}
          />
        </View>
        <View style={styles.input} >
          <PasswordInputText
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        <View style={{marginTop: 15, marginRight: 60, marginLeft: 60, opacity: 0.8, backgroundColor: "#ababab", borderRadius: 5}} >
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
  }
});
