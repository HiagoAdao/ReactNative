import React from 'react';
import { StyleSheet, Button, View, ImageBackground, Alert } from 'react-native';

export default class Home extends React.Component {

  static navigationOptions = {
    title: "Home"
  }

  saudacoes = () => {
    Alert.alert(
      'Bem-vindo ao Notícias',
      'Selecione a página que deseja visitar',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }

  componentWillMount(){
    setTimeout(this.saudacoes, 1500)
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/images/home.png')} style={{ width: '100%', height: '100%'}}>
        <View style={{marginTop: 235, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.button} >
            <Button
              color="#000"
              title="SOBRE"
              onPress={() => this.props.navigation.navigate('Sobre')}
              />
          </View>
          <View style={styles.button} >
            <Button
              color="#000"
              title="LISTA DE NOTÍCIAS"
              onPress={() => this.props.navigation.navigate('ListaNoticias')}
              />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    marginRight: 70,
    marginLeft: 70,
    backgroundColor: "#CDC9C9",
    borderRadius: 10
  }
});