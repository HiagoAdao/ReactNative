import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';


export default class Login extends React.Component {
  
  static navigationOptions = {
    title: "Login"
  }
  
  constructor(){
    super();
    this.state = {
      username: '',
      password: ''
    }
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

  validLogin(){
    const user = this.state.username
    const password = this.state.password

    const { navigation } = this.props;
    const dictUsers = navigation.getParam('dict_users', {'Admin': 'admin'});

    if(user in dictUsers && password == dictUsers[user]){
      this.props.navigation.navigate('FiltroCep')
    } else {
      this.invalidUserOrPassword()
    }
  }


  render() {
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: '#B0C4DE'}} >
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
        <View style={{marginTop: 20, marginRight: 50, marginLeft: 50, opacity: 0.8, backgroundColor: "#8B8B83", borderRadius: 5}} >
          <Button
            color="#fff"
            title="LOGAR"
            onPress={this.validLogin.bind(this)}
          />
        </View>
        <View style={{marginTop: 15, marginRight: 70, marginLeft: 70, opacity: 0.8, backgroundColor: "#CDC9C9", borderRadius: 5}} >
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
