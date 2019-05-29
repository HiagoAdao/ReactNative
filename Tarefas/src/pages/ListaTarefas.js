import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Image, Text } from 'react-native';
import { fb, db } from '../../utils/Firebase';
import { CheckBox } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class ListaTarefas extends React.Component {

  static navigationOptions = {
    title: "Lista de Tarefas"
  }
  
  state =  {
      tarefas: []
  }

  constructor(){
    super()  
    this.user = fb.auth().currentUser;
  }

  listagem(){

    db.ref(`/users/${this.user.uid}/tarefas/`)
    .on('value', snapchot => {
      let tarefasDb = snapchot.val()

      let tarefas = []
      if(tarefasDb){

        for(tarefa in tarefasDb){
          const idTarefa = tarefa;
          const titulo =  tarefasDb[tarefa].titulo;
          const descricao = tarefasDb[tarefa].descricao;
          const status =  tarefasDb[tarefa].status;
          
          tarefas.push({
            id: idTarefa,
            titulo,
            descricao,
            status
          })
        }
        this.setState({tarefas})
       }
    })
  }


  componentDidMount(){
    this.listagem();
  }

  tarefasRow = () => {
    let tarefas = this.state.tarefas;
    
    return tarefas.map(tarefa => (

      <TouchableOpacity
        key={tarefa.id}
        activeOpacity={0.7}
        onPress={() => this.props.navigation.navigate('Tarefa', {
          tarefa: {
            id: tarefa.id,
            descricao: tarefa.descricao,
            titulo: tarefa.titulo,
            status: tarefa.status
          }
        })}
      >
        <View style={styles.tarefas} >
          <View style={styles.conteinerCheck}>
            <CheckBox
              checkedColor='green'
              checked={tarefa.status}
              disabled
            />
          </View>
          <View style={styles.conteinerTitulo} >
            <Text style={{flex: 1, margin: 15}} >{tarefa.titulo}</Text>
           </View>
        </View>
      </TouchableOpacity>
    ))
  }

  render() {
    const tarefasRow = this.tarefasRow();

    return (
     <View style={styles.container}>
        <ScrollView>
          {
            tarefasRow.length !== 0 ? 
              tarefasRow
            : 
              <View style={styles.semTarefa} >
                <Text>
                  Nenhuma tarefa cadastrada
                </Text>
              </View>
          }
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate('CriarTarefa')}
        >
          <Image
            style={{width: 60, height: 60}}
            source={require('../../assets/buttonadd.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  circleShapeView: {
    width: 70,
    height: 70,
    borderRadius: 150/2,
    backgroundColor: '#00BCD4',
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 15
  },
  tarefas: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    margin: 10,
    flex:1
  },
  conteinerCheck:{
    display: "flex",
    flexDirection: "row",
    flex:1,
    justifyContent: "center",
  },
  conteinerTitulo: {
    textAlign:"left",
    display: "flex",
    flexDirection: "row",
    flex:3,
    justifyContent: "center",
    alignItems: "center",
  },
  semTarefa: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  }
});
