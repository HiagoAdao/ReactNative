import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Image, Text, Button } from 'react-native';
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
            status,
            statusColor: status ? "#00bd00" : "#E10036"
          })
        }

        
        this.setState({ tarefas })
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
        <View style={{ ...styles.tarefas, borderColor: `${tarefa.statusColor}`}} >
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
          <View>
            <TouchableOpacity
              style={styles.buttonAdicionar}
              activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate('CriarTarefa')}
            >
              <Image
                style={{width: 60, height: 60}}
                source={require('../../assets/buttonadd.png')}
              />
            </TouchableOpacity>
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
    height: '100%'
  },
  circleShapeView: {
    width: 70,
    height: 70,
    borderRadius: 150/2,
    backgroundColor: '#00BCD4',
  },
  buttonAdicionar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tarefas: {
     display: "flex",
     flexDirection: "row",
     marginTop: 5,
     margin: 10,
     flex: 1,
     borderWidth: 1,
     borderRadius: 10 
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
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  semTarefa: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    marginTop: 20
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
  }
});
