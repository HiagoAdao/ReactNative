import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Linking } from 'react-native';

export default class Sobre extends React.Component {

  static navigationOptions = {
    title: "Sobre"
  }

  link = () => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/images/sobre.png')} style={{ width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.todo}>

            <Text style={styles.disciplina} >
              Tópicos Especiais em Computação
            </Text>
            <Text style={styles.descricao}>
              Atividade: Crie uma aplicação para apresentar uma lista de notícias, com título e texto. Ao clicar no título apresenta a notícia.
            </Text>

            <View style={{alignSelf: 'flex-start', margin: 5, marginRight: 5, marginTop: 225,}}>
              <Text style={styles.dev} >Desenvolvedor: Hiago Adão</Text>
              <Text style={styles.dev} >RA: 1116194</Text>
              <Text style={styles.dev} >E-mail Imed: 1116194@imed.edu.br</Text>
              <Text style={styles.dev} >E-mail Pessoal: hiago@registro.rs</Text>
            </View>
            <View style={{marginTop: 85, backgroundColor: '#d3d3d3', opacity: 0.8, borderRadius: 8}}>
              <Text style={styles.api} >
                API: <Text style={{color: 'blue', textDecorationLine: 'underline'}} onPress={() => Linking.openURL("https://jsonplaceholder.typicode.com/posts")} >
                      https://jsonplaceholder.typicode.com/posts
                    </Text>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    width: '100%',
    height: '100%'
  },
  todo: {
    display: 'flex',
    alignItems: 'center',
  },
  disciplina: {
    margin: 10,
    marginTop: 20,
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans'
  },
  descricao: {
    margin: 20,
    marginTop: 15,
    fontSize: 22,
    fontFamily: 'Gill Sans'
  },
  api: {
    margin: 10,
    textAlign: "justify",
    fontSize: 21,
    fontFamily: 'Gill Sans'
  },
  dev: {
    fontSize: 18,
    fontFamily: 'GillSans-BoldItalic',
  }
});
