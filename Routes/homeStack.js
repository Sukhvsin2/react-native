import { View, Text } from "react-native"
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation"
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import CreatePin from "../views/CreatePin";
import Profile from "../views/Profile";
import PersonalDetails from "../views/PersonalDetails";
import RealBalance from "../views/RealBalance/RealBalance";
import AddMoney from "../views/RealBalance/AddMoney";
import UpdatePin from "../views/RealBalance/UpdatePin";
import ActualBalance from "../views/ActualBalance/ActualBalance";
import AllTransactions from "../views/AllTransactions";
import Scanner from "../views/Scanner";
import Transfer from "../views/HomeScreens/Transfer";



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
    },
    PinScreen: {
        screen: CreatePin,
        navigationOptions: {
            headerShown: false
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerShown: false
        }
    },
    PersonalDetails: {
        screen: PersonalDetails
    },
    RealBalance: {
        screen: RealBalance
    },
    AddMoney: {
        screen: AddMoney
    },
    UpdatePin: {
        screen: UpdatePin
    },
    ActualBalance: {
        screen: ActualBalance
    },
    Transactions: {
        screen: AllTransactions
    },
    Scanner: {
        screen: Scanner,
        navigationOptions: {
            headerShown: false
        }
    },
    Transfer: {
        screen: Transfer,
        navigationOptions: {
            tabBarLevel: () => {
                <View><Text>Check</Text></View>
             }
        }
    }
}


const HomeStack = createStackNavigator(screens, );

export default createAppContainer(HomeStack);