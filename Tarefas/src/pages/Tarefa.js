
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
    	status: false,
      errorTitulo: '',
      errorDescricao: ''
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

    (titulo && descricao) && 
    

    (titulo && descricao) ?
      (db.ref(`/users/${this.user.uid}/tarefas/${this.state.id}`)
         .set(tarefa) && this.sucessoAtualizacao())
    :
      (!titulo && this.setState({errorTitulo: "CAMPO OBRIGATÓRIO"})) ||
      (!descricao && this.setState({errorDescricao: "CAMPO OBRIGATÓRIO"}));
  }

  excluirTarefa(){
    const {titulo, descricao, status} = this.state;
    const tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: status
    };

    (titulo && descricao) && (db.ref(`/users/${this.user.uid}/tarefas/${this.state.id}`)
                                .remove() && this.sucessoExclusao())
  }

  sucessoAtualizacao(){
    Alert.alert(
      'Sucesso',
      'Tarefa alterada com sucesso',
      [
        {text: 'Voltar para lista', onPress: () => this.props.navigation.navigate('ListaTarefas')},
      ],
      {cancelable: false},
    );
  }

  sucessoExclusao(){
    Alert.alert(
      'Sucesso',
      'Tarefa excluída com sucesso',
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
              error={this.state.errorTitulo}
		          onChangeText={ (titulo) => this.setState({ titulo, errorTitulo: '' })}
	          />
	        </View>
          <View style={styles.tarefa} >
          	<TextField
	          	label="Descricao"
		          multiline={true}
		          placeholder="Informe a tarefa"
              value={this.state.descricao}
		          fullWidth={true}
              error={this.state.errorDescricao}
		          onChangeText={ (descricao) => this.setState({ descricao, errorDescricao: '' })}
          	/>
          </View>
          <View style={styles.checkBox} >
          	<CheckBox
          		containerStyle={{backgroundColor: '#fff', borderRadius: 10}}
						  center
						  title='Concluída'
						  checkedColor='green'
						  checked={this.state.status}
						  onPress={() => this.setState({status: !this.state.status})}
						/>
          </View>
          <View style={styles.buttonAtualizar} >
	          <Button
	            color="#fff"
	            title="SALVAR"
	            onPress={this.atualizaTarefa.bind(this)	}
	          />
        	</View>
          <View style={styles.buttonExcluir} >
            <Button
              color="#fff"
              title="EXCLUIR"
              onPress={this.excluirTarefa.bind(this)}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonSobre} >
          <Button
            color="#fff"
            title="Sobre"
            onPress={() => this.props.navigation.navigate('Sobre')}
          />
        </View>
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
  buttonAtualizar: {
    marginTop: 15,
    marginRight: 60,
    marginLeft: 60,
    opacity: 0.8,
    backgroundColor: "#458B00",
    borderRadius: 10
  },
  buttonExcluir: {
    marginTop: 15,
    marginRight: 60,
    marginLeft: 60,
    opacity: 0.8,
    backgroundColor: "#E10036",
    borderRadius: 10
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
