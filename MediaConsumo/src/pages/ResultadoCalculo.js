import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default class ResultadoCalculo extends React.Component {

  static navigationOptions = {
    title: 'Resultado'
  }

  mediaConsumo(){
    const { navigation } = this.props;
    const totalKm = navigation.getParam('km', 0);
    const totalLitros = navigation.getParam('litros', 0);
    const media = totalKm / totalLitros
    return media
  }

  nivelConsumo(media){
    if(media > 12){
      return 'A'
    } else if (media <= 12 && media > 10){
      return 'B'
    } else if (media >= 10 && media > 8){
      return 'C'
    } else if (media >= 8 && media > 4){
      return 'D'
    } else if (media >= 4 && media > 0){
      return 'E'
    } else if (media == 0){
      return 'Carro parado'
    } else {
      return 'Não foi possível calcular a média'
    }
  }

  render() {

    return (
      <ImageBackground source={require('../../assets/asfalto.png')} style={{ width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.form}>
            <Text style={{ opacity: 1, margin: 10, fontSize: 25, fontWeight: "bold", textAlign: "center"}} >Média de Consumo: {this.mediaConsumo()}</Text>
            <Text style={{opacity: 1, margin: 10, fontSize: 25, fontWeight: "bold", textAlign: "center"}} >{this.nivelConsumo(this.mediaConsumo()) == 'Não foi possível calcular a média' ? this.nivelConsumo(this.mediaConsumo()) : `Nível de Consumo: ${this.nivelConsumo(this.mediaConsumo())}`} </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '110%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    opacity: 0.8,
    backgroundColor: "#d3d3d3",
    borderRadius: 5
  }
});
