import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import BarmanDashboard from './Components/Barmen/BarmanDashboard';
import CookDashboard from './Components/Cooks/CookDashboard';
import CommandeDetailsCook from './Components/Cooks/CommandeDetailsCook';
import CommandeDetailsBarman from './Components/Barmen/CommandeDetailsBarman';

import WaiterDashboard from './Components/Waiters/WaiterDashboard';
import CommandeDetails from './Components/Waiters/CommandeDetails';
import ListePlatsWaiter from './Components/Waiters/ListePlatsWaiter';
import CommandsToSend from './Components/Waiters/CommandsToSend';
import PlatsWaiter from './Components/Waiters/PlatsWaiter';
import SummaryCommande from './Components/Waiters/SummaryCommande';

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
    ListePlatsWaiter: { screen: ListePlatsWaiter },
    CommandsToSend: { screen: CommandsToSend },
    PlatsWaiter: { screen: PlatsWaiter },
    SummaryCommande: { screen: SummaryCommande },
    CommandeDetailsCook: { screen: CommandeDetailsCook },
    CommandeDetailsBarman: { screen: CommandeDetailsBarman }
},
{
    defaultNavigationOptions: stackNavigatorOptions
});

export default createAppContainer(AppNavigator);