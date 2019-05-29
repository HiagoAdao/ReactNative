
import React from 'react';
import { StyleSheet, View, ScrollView, Button, Alert } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { fb, db } from '../../utils/Firebase';
import { CheckBox } from 'react-native-elements';

export default class CriarTarefas extends React.Component {

  static navigationOptions = {
    title: "Lista de Tarefas"
  }

  constructor(){
    super()
    this.state =  {
    	titulo: "",
    	descricao: "",
    	status: false
    }
    this.user = fb.auth().currentUser;
  }

  sucessoCadastro(){
    Alert.alert(
      'Sucesso',
      'Tarefa cadastrada com sucesso',
      [
        {text: 'Voltar para lista', onPress: () => this.props.navigation.navigate('ListaTarefas')},
      ],
      {cancelable: false},
    );
  }

  addTarefa(){
    const {titulo, descricao, status} = this.state;
    const tarefa = {
    	titulo: titulo,
    	descricao: descricao,
    	status: status
    };

    (titulo && descricao) && 
    (db.ref(`/users/${this.user.uid}/tarefas`)
    	 .push(tarefa) && this.sucessoCadastro())
  }

  render() {
    return (
     <View style={styles.container}>
        <ScrollView>
        	<View style={styles.titulo} >
	          <TextField
	          	label="Título"
		          multiline={true}
		          rows={"1"}
		          placeholder="Informe o título da tarefa"
		          fullWidth={true}
		          onChangeText={ (titulo) => this.setState({ titulo })}
	          />
	        </View>
          <View style={styles.tarefa} >
          	<TextField
	          	label="Descricao"
		          multiline={true}
		          placeholder="Informe a tarefa"
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
	            title="CADASTRAR"
	            onPress={this.addTarefa.bind(this)	}
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
