import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground } from 'react-native';

export default class CalculoConsumo extends React.Component {

  static navigationOptions = {
    title: 'Calculando o Consumo Médio'
  }

  constructor(){
    super()
    this.state = {
      km: 0,
      litros: 0
    }
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/road.png')} style={{ width: '100%', height: '100%'}}>
        <View style={{ marginTop: 35, width: '100%', height: '110%'}}>
          <View style={styles.form}>
            <Text style={{ opacity: 1, margin: 10, fontSize: 25, fontWeight: "bold", textAlign: "center"}} >Digite a KM</Text>
            <TextInput style={styles.input} onChangeText={(km) => this.setState({km})} keyboardType="numeric" />
            <Text style={{opacity: 1, margin: 10, fontSize: 25, fontWeight: "bold", textAlign: "center"}} >Digite a quantidade de Litros</Text>
            <TextInput style={styles.input} onChangeText={(litros) => this.setState({litros})} keyboardType="numeric" />
          </View>
          <View style={{marginTop: 5, opacity: 0.7, backgroundColor: "#000", borderRadius: 5}} > 
              <Button
              color= 'white'
                title="Verificar Média"
                onPress={() => this.props.navigation.navigate('ResultadoCalculo', {
                  km: this.state.km,
                  litros: this.state.litros
                })}
                />
            </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRadius: 5,
    fontSize: 25,
    textAlign: "center",
    borderColor: '#000000'
  },
  form: {
    opacity: 0.5,
    backgroundColor: "#d3d3d3",
    borderRadius: 5
  }
});
