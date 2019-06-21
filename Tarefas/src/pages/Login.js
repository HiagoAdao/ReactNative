import React from 'react';
import { StyleSheet, View, Button, Alert, ScrollView, ActivitIndicator, AsyncStorage } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';
import { fb, db } from '../../utils/Firebase';
import { CheckBox } from 'react-native-elements';

export default class Login extends React.Component {
  
  static navigationOptions = {
    title: "Login"
  }
  
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorSenha: '',
      statusEmail: false,
      statusEmailSenha: false
    };
  }

  async componentDidMount(){
    const email = await AsyncStorage.getItem('email');
    const senha = await AsyncStorage.getItem('senha');

    if (email && senha) {
      this.setState({
        email,
        password: senha,
        statusEmail: email ? true : false,
        statusEmailSenha: senha ? true : false
      })
    }
  }

  invalidUserOrPassword(){
    Alert.alert(
      'E-mail ou Senha incorretos',
      '\nVerifique seus dados e tente novamente',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }

  async validLogin(){
    const { email, password, statusEmail, statusEmailSenha } = this.state;

    if(statusEmail) {
      (await AsyncStorage.setItem('email', this.state.email))
    };
    if(statusEmailSenha) {
      await AsyncStorage.setItem('email', this.state.email) &&
      await AsyncStorage.setItem('senha', this.state.senha)
    };

    (email && password) ?
      fb.auth().signInWithEmailAndPassword(email, password)
        .then(retorno => this.props.navigation.navigate('ListaTarefas'))
        .catch(erro => this.invalidUserOrPassword())
    :
      (!email && this.setState({ errorEmail: "CAMPO OBRIGATÓRIO" })) ||
      (!password && this.setState({ errorSenha: "CAMPO OBRIGATÓRIO" }));
  }


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
              onChangeText={ (email) => this.setState({ email, errorEmail: '' })}
            />
          </View>
          <View style={styles.input} >
            <PasswordInputText
              placeholder='Digite sua senha'
              value={this.state.password}
              error={this.state.errorSenha}
              onChangeText={(password) => {
                this.setState({ password, errorSenha: '' })}}
            />
          </View>
          <View style={styles.buttonLogin} >
            <Button
              color="#fff"
              title="LOGAR"
              onPress={this.validLogin.bind(this)}
            />
          </View>
          <View style={styles.checkBoxForm}> 
            <View style={styles.checkBox} >
              <CheckBox
                containerStyle={{height: 45, borderColor: `${this.state.statusEmail ? 'blue' : '#d3d3d3'}`, backgroundColor: '#fff', borderRadius: 10}}
                center
                title='Lembre-me'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='blue'
                checked={this.state.statusEmail}
                onPress={async () => { this.setState({statusEmail: !this.state.statusEmail}); }}
              />
            </View>
            <View style={styles.checkBox} >
              <CheckBox
                containerStyle={{height: 45, borderColor: `${this.state.statusEmailSenha ? 'blue' : '#d3d3d3'}`, backgroundColor: '#fff', borderRadius: 10}}
                center
                title='Manter-me conectado'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor='blue'
                checked={this.state.statusEmailSenha}
                onPress={() => { this.setState({statusEmailSenha: !this.state.statusEmailSenha}); }}
              />
            </View>
          </View>
          <View style={styles.buttonSigIn} >
            <Button
              color="#000"
              title="CADASTRAR"
              onPress={() => this.props.navigation.navigate('SigIn')}
            />
          </View>
        </ScrollView>
        <View>
          <View style={styles.buttonSobre} >
            <Button
              color="#fff"
              title="Sobre"
              onPress={() => this.props.navigation.navigate('Sobre')}
            />
          </View>
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
    borderRadius: 10
  },
  buttonSigIn: {
    marginTop: 15,
    marginRight: 70,
    marginLeft: 70,
    opacity: 0.8,
    backgroundColor: "#B3EE3A",
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
  },
  checkBoxForm:{
    flexDirection: 'row'
  },
  checkBox: {
    flex: 2,
    marginTop: 15,
    justifyContent: "center",
  }
});
