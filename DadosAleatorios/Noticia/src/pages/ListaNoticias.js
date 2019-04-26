import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';

export default class ListaNoticias extends React.Component {

  static navigationOptions = {
    title: "Lista de Notícias"
  }

  constructor(){
    super()
    this.state =  {noticias: []}
  }

  _listagem(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => (
      this.setState({noticias: data})
    ))
    .catch(error => {
      return Alert.alert(
        'Erro ao buscar Notícias',
        '',
        [
          {text: 'OK', onPress: () => console.log(error)},
        ],
        {cancelable: false},
      );
    })
  }

  goNoticia(itemId){
    let noticias = this.state.noticias
    noticias.forEach(noticia => {
      if(noticia.id == itemId){
        this.props.navigation.navigate('Noticia', {noticia: {
          title: noticia.title,
          body: noticia.body
        }})
      }
    })
  }

  async componentDidMount(){
    await this._listagem()
  }

  trataDados = () => {
    let noticias = this.state.noticias
    return noticias.map(item => (
      <View key={item.id} style={styles.viewNoticia} >
        <Text style={styles.noticia} key={item.id} onPress={() => this.goNoticia(item.id)}>
          {item.title}
        </Text>
      </View>
    ))
  }

  render() {
    let noticias = this.trataDados()
    return (
      <ImageBackground source={require('../../assets/images/noticias.png')} style={{opacity: 0.8, width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <ScrollView>
            {noticias}
          </ScrollView>
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
  noticia: {
    margin: 13,
    fontSize: 18,
    textAlign: "justify",
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewNoticia: {
    margin: 10,
    marginTop: 5,
    borderWidth: 0.3,
    borderRadius: 10,
    backgroundColor: '#FAF0E6',
    opacity: 0.9
  }
});
