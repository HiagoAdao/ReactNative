import { createStackNavigator, createAppContainer } from "react-navigation";
import Sobre from "./src/pages/Sobre";
import ListaNoticias from "./src/pages/ListaNoticias";
import Noticia from "./src/pages/Noticia";
import Home from "./src/pages/Home";

const AppNavigator= createStackNavigator(
  {
    Sobre: Sobre,
    ListaNoticias: ListaNoticias,
    Noticia: Noticia,
    Home: Home
  }, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FAF0E6'
      },
      headerTitleStyle: {
        color: '#8B4513',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
      }
    }
  }
);

export default createAppContainer(AppNavigator);
