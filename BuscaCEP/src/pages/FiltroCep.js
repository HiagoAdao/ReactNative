import React from 'react';
import { StyleSheet, Text, View, Alert, Button, FlatList } from 'react-native';
import { TextField } from 'react-native-material-textfield';

export default class FiltroCep extends React.Component {

  static navigationOptions = {
    title: "Buscar Cidades"
  }

  constructor(){
    super();
    this.state = {
      source: '',
      cep: null,
      logradouro: null,
      bairro: null,
      localidade: null,
      uf: null,
      ibge: null,
      erro: null,
      valid: false
    }
  }

  invalidCEP(){
    Alert.alert(
      'CEP inválido',
      'Tente Novamente',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
  
  sourceCEP(){
    const CEP = this.state.source
    fetch(`https://viacep.com.br/ws/${CEP}/json/`)
      .then(response => response.json())
      .then(data => {
        if(data.erro == true){
          this.invalidCEP()
        } else {
        this.setState({
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
          ibge: data.ibge,
          valid: true
        })}
      }
    )
      .catch(erro => this.invalidCEP())   
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: '#B0C4DE'}}>
        <View style={{margin: 20, marginTop: 5, marginVertical: 5}} >
          <TextField
            label='Digite o CEP'
            value={this.state.source}
            keyboardType="numeric"
            onChangeText={(source) => this.setState({source})}
          />
        </View>
        <View>
         <View style={{borderRadius: 5, marginRight: 40, marginLeft: 40, opacity: 0.8, backgroundColor: "#8B8B83"}}>
            <Button
              color='#000'
              title="Buscar CEP"
              onPress={this.sourceCEP.bind(this)}
            />
          </View>
          <View style={{margin: 5}} >
            <Text style={{margin: 20, fontWeight: "bold", color: "#808080", fontSize: 23, justifyContent: "center"}} >
            {this.state.valid != false ? 'Os dados da sua cidade são:' : ''}
            </Text>
            <FlatList
              data={[
                {
                  key: 'Localidade: ',
                  value: `${this.state.localidade}`
                },
                {
                  key: 'Estado (Sigla): ',
                  value: `${this.state.uf}`
                },
                {
                  key: 'Logradouro: ',
                  value: `${this.state.logradouro}`
                },
                {
                  key: 'Bairro: ',
                  value: `${this.state.bairro}`
                },
                {
                  key: 'CEP: ',
                  value: `${this.state.cep}`},
                {
                  key: 'IBGE: ',
                  value: `${this.state.ibge}`
                }
              ]}
              keyExtractor={(item) => item.key}
              renderItem={({item}) => <Text style={styles.title}>
                                        {this.state.valid != false ? item.key : ''}
                                        <Text style={styles.result}>
                                          {this.state.valid != false ? item.value : ''}
                                        </Text>
                                      </Text>}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 16,
    justifyContent: "space-around"
  },
  result: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 22,
    justifyContent: "space-around"
  },
  input: {
    margin: 5,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRadius: 5,
    fontSize: 18,
    textAlign: "center",
    borderColor: '#000000'
  }
});
