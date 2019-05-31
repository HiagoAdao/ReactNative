import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './src/pages/Login';
import SigIn from './src/pages/SigIn';
import ListaTarefas from './src/pages/ListaTarefas';
import CriarTarefa from './src/pages/CriarTarefa';
import Tarefa from './src/pages/Tarefa';
import Sobre from './src/pages/Sobre';

const AppNavigator= createStackNavigator(
  {
    Login: Login,
    SigIn: SigIn,
    ListaTarefas: ListaTarefas,
    CriarTarefa: CriarTarefa,
    Tarefa: Tarefa,
    Sobre: Sobre
  }, {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#A2CD5A'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
      }
    }
  }
);

export default createAppContainer(AppNavigator);