import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import BarmanDashboard from './Components/Barmen/BarmanDashboard';
import CookDashboard from './Components/Cooks/CookDashboard';

import WaiterDashboard from './Components/Waiters/WaiterDashboard';
import CommandeDetails from './Components/Waiters/CommandeDetails';

import Payment from './Components/Client/Payment';
import ListePlats from './Components/Client/ListePlats';
import MenuList from './Components/Client/MenuList';
import DetailsPlat from './Components/Client/DetailslPlat';
import LandingPage from './Components/Client/LandingPage';
import Commande from './Components/Client/Commande';
import Reservation from './Components/Client/Reservation';

const stackNavigatorOptions = {
    headerShown: false
}

const AppNavigator = createStackNavigator({
    LandingPage : { screen: LandingPage },
    ListePlats: { screen: ListePlats },
    Login: { screen: Login },
    Register: {screen: Register },
    BarmanDashboard: {screen: BarmanDashboard},
    CookDashboard: { screen: CookDashboard },
    WaiterDashboard: { screen: WaiterDashboard },
    Payment: { screen: Payment },
    MenuList: { screen: MenuList },
    DetailsPlat: { screen: DetailsPlat },
    Commande : { screen: Commande },
    Reservation : { screen: Reservation },
    CommandeDetails: { screen : CommandeDetails }, 
},
{
    defaultNavigationOptions: stackNavigatorOptions
});

export default createAppContainer(AppNavigator);