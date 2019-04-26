import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default class Noticia extends React.Component {

  static navigationOptions = {
    title: "Notícia"
  }

  constructor(){
    super()
    this.state = {
      title: '',
      body: ''
    }
  }

  _getDados = () =>{
    const noticia = this.props.navigation.getParam('noticia', {})
    this.setState({
      title: noticia.title,
      body: noticia.body
    })
  }

  makeNoticia = () => {
    const title = this.state.title
    const body = this.state.body
    return (
      <View style={styles.viewNoticia}>
        <Text style={styles.titulo}>
          {title}
        </Text>
        <Text style={styles.noticia}>
          {body}
        </Text>
      </View>
    )
  }

  componentDidMount(){
    this._getDados()
  }

  render() {
    let noticia = this.makeNoticia()
    return (
      <ImageBackground source={require('../../assets/images/noticias.png')} style={{opacity: 0.8, width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View>
            {noticia}
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
  titulo: {
    margin: 15,
    textAlign: "center",
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'Apple SD Gothic Neo'
  },
  noticia: {
    margin: 15,
    fontSize: 18,
    textAlign: "justify",
    fontFamily: 'AppleSDGothicNeo-SemiBold'
  },
  viewNoticia: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    marginTop: 160,
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: '#FAF0E6',
    opacity: 0.9
  }
});
