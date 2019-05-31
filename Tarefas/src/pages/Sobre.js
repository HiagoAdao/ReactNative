import React from 'react';
import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native';

export default class Sobre extends React.Component {

  static navigationOptions = {
    title: "Sobre"
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.todo}>

            <Text style={styles.disciplina} >
              Tópicos Especiais em Computação
            </Text>
            <Text style={styles.descricao}>
              Atividade: Desenvolva  um  aplicativo  com  o  objetivo  de  armazenar  uma  lista  de  tarefas  a serem  cumpridas, bem  como  a  possibilidade  de  assinalar  as  que  já  foram realizadas.
            </Text>

            <View style={{alignSelf: 'flex-start', margin: 5, marginRight: 5, marginTop: 20}}>
              <Text style={styles.dev} >Desenvolvedor: Hiago Adão</Text>
              <Text style={styles.dev} >RA: 1116194</Text>
              <Text style={styles.dev} >E-mail Imed: 1116194@imed.edu.br</Text>
              <Text style={styles.dev} >E-mail Pessoal: hiago@registro.rs</Text>
              <Text style={styles.dev} >
                LinkedIn: 
                  <Text style={{...styles.link, color: 'blue'}} onPress={() => Linking.openURL("https://www.linkedin.com/in/hiago-ad%C3%A3o-m%C3%BCller-oliveira-b223b1161/")} >
                    {' Hiago Adão Müller Oliveira'}
                  </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  link: {
    margin: 10,
    textAlign: "justify",
    fontSize: 21,
    fontFamily: 'Gill Sans'
  },
  dev: {
    fontSize: 18,
    fontFamily: 'GillSans-BoldItalic',
    margin: 3
  }
});
