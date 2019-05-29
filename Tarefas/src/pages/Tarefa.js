
import React from 'react';
import { StyleSheet, View, ScrollView, Button, Alert } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { fb, db } from '../../utils/Firebase';
import { CheckBox } from 'react-native-elements';

export default class Tarefa extends React.Component {

  static navigationOptions = {
    title: "Tarefa"
  }

  constructor(){
    super()
    this.state =  {
      id: "",
    	titulo: "",
    	descricao: "",
    	status: false
    }
    this.user = fb.auth().currentUser;
  }

  atualizaTarefa(){
    const {titulo, descricao, status} = this.state;
    const tarefa = {
    	titulo: titulo,
    	descricao: descricao,
    	status: status
    };
    console.log(tarefa);
    (titulo && descricao) && 
    (db.ref(`/users/${this.user.uid}/tarefas/${this.state.id}`)
    	 .set(tarefa) && this.sucesso());
  }

  sucesso(){
    Alert.alert(
      'Sucesso',
      'Tarefa alterada com sucesso',
      [
        {text: 'Voltar para lista', onPress: () => this.props.navigation.navigate('ListaTarefas')},
      ],
      {cancelable: false},
    );
  }

  componentWillMount(){
    const tarefas = this.props.navigation.getParam('tarefa', {});
    (tarefa !== {}) && this.setState({
      id: tarefas.id,
      descricao: tarefas.descricao,
      titulo: tarefas.titulo,
      status: tarefas.status
    })
  }

  render() {
    return (
     <View style={styles.container}>
        <ScrollView>
        	<View style={styles.titulo} >
	          <TextField
	          	label="Título"
		          placeholder="Informe o título da tarefa"
              value={this.state.titulo}
		          fullWidth={true}
		          onChangeText={ (titulo) => this.setState({ titulo })}
	          />
	        </View>
          <View style={styles.tarefa} >
          	<TextField
	          	label="Descricao"
		          multiline={true}
		          placeholder="Informe a tarefa"
              value={this.state.descricao}
		          fullWidth={true}
		          onChangeText={ (descricao) => this.setState({ descricao })}
          	/>
          </View>
          <View style={styles.checkBox} >
          	<CheckBox
          		containerStyle={{ borderColor: `${this.state.status ? 'green' : '#d3d3d3'}`, backgroundColor: '#fff', borderRadius: 10}}
						  center
						  title='Concluída'
						  checkedColor='green'
						  checked={this.state.status}
						  onPress={() => this.setState({status: !this.state.status})}
						/>
          </View>
          <View style={styles.buttonCadastrar} >
	          <Button
	            color="#fff"
	            title="SALVAR"
	            onPress={this.atualizaTarefa.bind(this)	}
	          />
        	</View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffff'
  },
  titulo: {
  	margin: 20,
  	marginTop: 30
  },
  tarefa: {
  	margin: 20,
  	marginTop: 10
  },
  checkBox: {
		margin: 20,
  	marginTop: 10
  },
  buttonCadastrar: {
    marginTop: 15,
    marginRight: 60,
    marginLeft: 60,
    opacity: 0.8,
    backgroundColor: "#458B00",
    borderRadius: 5
  }
});
