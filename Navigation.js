import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import BarmanDashboard from './Components/Barmen/BarmanDashboard';
import CookDashboard from './Components/Cooks/CookDashboard';

import WaiterDashboard from './Components/Waiters/WaiterDashboard';

import Payment from './Components/Client/Payment';
import ListePlats from './Components/Client/ListePlats';
import MenuList from './Components/Client/MenuList';
import DetailsPlat from './Components/Client/DetailslPlat';

const stackNavigatorOptions = {
    headerShown: false
}

const AppNavigator = createStackNavigator({
    ListePlats: { screen: ListePlats },
    Login: { screen: Login },
    Register: {screen: Register },
    BarmanDashboard: {screen: BarmanDashboard},
    CookDashboard: { screen: CookDashboard },
    WaiterDashboard: { screen: WaiterDashboard },
    Payment: { screen: Payment },
    MenuList: { screen: MenuList },
    DetailsPlat: { screen: DetailsPlat }
},
{
    defaultNavigationOptions: stackNavigatorOptions
});

export default createAppContainer(AppNavigator);