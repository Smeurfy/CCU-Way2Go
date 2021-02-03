import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../Containers/LoginScreen'
import SplashScreen from '../Containers/SplashScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import HomeScreen from '../Containers/HomeScreen'
import BuyScreen from '../Containers/BuyScreen'
import BuyTicketScreen from '../Containers/BuyTicketScreen'
import ChargeScreen from '../Containers/ChargeScreen'
import DiscountScreen from '../Containers/DiscountScreen'
import RewardsScreen from '../Containers/RewardsScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import SaldoScreen from '../Containers/SaldoScreen'
import PontosScreen from '../Containers/PontosScreen'
import VisaScreen from '../Containers/VisaScreen'
import MethodsOfPayment from '../Containers/MethodsOfPayment'
import MethodsOfPayment2 from '../Containers/MethodsOfPayment2'
import MbWayScreen from '../Containers/MbWayScreen'
import colors from '../Styles/Color'
import BuyMetroTicketScreen from '../Containers/BuyMetroTicketScreen';
import QRScreen from '../Containers/QRScreen';
import BuyCPTicketScreen from '../Containers/BuyCPTicketScreen';
import RechargePassScreen from '../Containers/RechargePassScreen';

// Navigator for Login and Registration
const LoginStack = createStackNavigator({
    Splash: { screen: SplashScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
}, {
    headerMode: 'none',
});


// Navigator for Home Section
const HomeStack = createStackNavigator({
    Home: HomeScreen,
    QR: QRScreen
}, {
  defaultNavigationOptions: {
    headerTintColor: colors.background,
    headerStyle: {
      backgroundColor: colors.primary,
    },
  },
});

// Navigator for Buy Section
const BuyStack = createStackNavigator({
  Buy: BuyScreen,
  Charge: ChargeScreen,
  Visa: VisaScreen,
  BuyTicket: BuyTicketScreen,
  BuyCPTicket: BuyCPTicketScreen,
  BuyMetroTicket: BuyMetroTicketScreen,
  RechargePass: RechargePassScreen,
  MethodOfPay: MethodsOfPayment,
  MethodOfPay2: MethodsOfPayment2,
  MBWay: MbWayScreen,
}, {
  defaultNavigationOptions: {
    headerTintColor: colors.background,
    headerStyle: {
      backgroundColor: colors.primary,
    },
  },
});

// Navigator for Discount Section
const DiscountStack = createStackNavigator({
  Discount: DiscountScreen,
}, {
  defaultNavigationOptions: {
    headerTintColor: colors.background,
    headerStyle: {
      backgroundColor: colors.primary,
    },
  },
});

// Navigator for Rewards Section
const RewardsStack = createStackNavigator({
  Rewards: RewardsScreen,
}, {
  defaultNavigationOptions: {
    headerTintColor: colors.background,
    headerStyle: {
      backgroundColor: colors.primary,
    },
  },
});

// Navigator for Profile Section
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Saldo: SaldoScreen,
  Pontos: PontosScreen,
}, {
  defaultNavigationOptions: {
    headerTintColor: colors.background,
    headerStyle: {
      backgroundColor: colors.primary,
    },
  },
});

// Navigator for bottom tabs
const TabNavigator = createBottomTabNavigator({
    Início: HomeStack,
    Comprar: BuyStack,
    Desafios: DiscountStack,
    Prémios: RewardsStack,
    Eu: ProfileStack
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Início') {
        iconName = `ios-home`;
      } else if (routeName === 'Comprar') {
        iconName = `ios-cart`;
      }
      else if (routeName === 'Desafios') {
        iconName = `ios-pricetags`;
      }
      else if (routeName === 'Prémios') {
        iconName = `ios-medal`;
      }
      else if (routeName === 'Eu') {
        iconName = `ios-person`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.tertiary,
  }
});

const MainNavigator = createSwitchNavigator({
    Login: LoginStack,
    Tabs: TabNavigator,
});

const App = createAppContainer(MainNavigator);

export default App;
