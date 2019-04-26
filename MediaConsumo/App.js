import { createStackNavigator, createAppContainer } from "react-navigation";
import CalculoConsumo from './src/pages/CalculoConsumo';
import ResultadoCalculo from './src/pages/ResultadoCalculo';

const AppNavigator = createStackNavigator(
  {
  CalculoConsumo: CalculoConsumo,
  ResultadoCalculo: ResultadoCalculo
  }, {
    initialRouteName: "CalculoConsumo",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#800080'
      },
      headerTitleStyle: {
        color: '#fff9',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
      }
    }
  }
);

export default createAppContainer(AppNavigator);