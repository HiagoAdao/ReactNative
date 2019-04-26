import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from './src/pages/Login';
import FiltroCep from './src/pages/FiltroCep';
import SigIn from './src/pages/SigIn';

const AppNavigator= createStackNavigator(
  {
    Login: Login,
    FiltroCep: FiltroCep,
    SigIn: SigIn
  }, {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#8B8B83'
      },
      headerTitleStyle: {
        color: '#CDC9C9',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
      }
    }
  }
);

export default createAppContainer(AppNavigator);
