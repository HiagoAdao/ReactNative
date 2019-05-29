import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';
import { fb, db } from '../../utils/Firebase';

export default class Login extends React.Component {
  
  static navigationOptions = {
    title: "Login"
  }
  
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount(){
    
  }

  invalidUserOrPassword(){
    Alert.alert(
      'Tente Novamente',
      'Dados Inválidos',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }

  async validLogin(){
    const {email, password} = this.state;

    fb.auth().signInWithEmailAndPassword(email, password)
      .then(retorno => this.props.navigation.navigate('ListaTarefas'))
      .catch(erro => this.invalidUserOrPassword())

  }


  render() {
    return (
      <View style={styles.container} >
        <View style={styles.input}>
          <TextField
            label='E-mail'
            placeholder='Digite seu e-mail'
            value={this.state.email}
            onChangeText={ (email) => this.setState({ email })}
          />
        </View>
        <View style={styles.input} >
          <PasswordInputText
            placeholder='Digite sua senha'
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        <View style={styles.buttonLogin} >
          <Button
            color="#fff"
            title="LOGAR"
            onPress={this.validLogin.bind(this)}
          />
        </View>
        <View style={styles.buttonSigIn} >
          <Button
            color="#000"
            title="CADASTRAR"
            onPress={() => this.props.navigation.navigate('SigIn')}
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
    backgroundColor: '#fff'
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
  buttonLogin: {
    marginTop: 20,
    marginRight: 50,
    marginLeft: 50,
    opacity: 0.8,
    backgroundColor: "#458B00",
    borderRadius: 5
  },
  buttonSigIn: {
    marginTop: 15,
    marginRight: 70,
    marginLeft: 70,
    opacity: 0.8,
    backgroundColor: "#B3EE3A",
    borderRadius: 5
  }
});
