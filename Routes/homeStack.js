import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation"
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";



const screens = {
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        },
    },
    Register: {
        screen: Register
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        },
    }
}




const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);