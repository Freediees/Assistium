import React from 'react'
import { Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator } from "react-navigation";

//pages
import ListNavigation   from './components/listNavigation';
import LoginScreen      from '../screens/login_screens/login';
import DashboardScreen  from '../screens/dashboard_screens/dashboard';
import DashboardSearch  from '../screens/dashboard_screens/dashboardSearch';
import ProfileScreen    from '../screens/dashboard_screens/profile_screens/profile';
import SearchScreen     from '../screens/dashboard_screens/search_screens/search';
import DetailScreen     from '../screens/dashboard_screens/detail_screens.js/detail';
import FilterPageSearch from '../screens/dashboard_screens/search_screens/filterPage';
import FilterSearch     from '../screens/dashboard_screens/search_screens/filterSearch';
import FilterDashboard  from '../screens/dashboard_screens/filter_screens/filter';
import DetailFilterDash from '../screens/dashboard_screens/filter_screens/detailFilter';
import BandFilterScreen from '../screens/dashboard_screens/filter_screens/filterComponent/band';
import DivisiFilterScreen from '../screens/dashboard_screens/filter_screens/filterComponent/divisi';
import FuFilterScreen     from '../screens/dashboard_screens/filter_screens/filterComponent/functionUnit';
import KELJTFilterScreen  from '../screens/dashboard_screens/filter_screens/filterComponent/KELJT';
import AboutScreen from '../screens/dashboard_screens/about_screens/about';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const MainMenu = DrawerNavigator({
  Dashboard:{
    screen:DashboardScreen,
    navigationOptions: {
      header:null,
    },
  },
  DashboardSearch:{
    screen:DashboardSearch,
    navigationOptions: {
      header:null,
    },
  },
  Profile:{
    screen:ProfileScreen,
    navigationOptions: {
      header:null,
    },
  },
  About:{
    screen:AboutScreen,
    navigationOptions: {
      header:null,
    },
  },
  Search:{
    screen:SearchScreen,
    navigationOptions: {
      header:null,
    },
  },
  Detail:{
    screen:DetailScreen,
    navigationOptions: {
      header:null,
    },
  },
  FilterPageSearch:{
    screen:FilterPageSearch,
    navigationOptions: {
      header:null,
    },
  },
  FilterSearch:{
    screen: FilterSearch,
    navigationOptions: {
      header:null,
    },
  },
  FilterDashboard:{
    screen:FilterDashboard,
    navigationOptions: {
      header:null,
    },
  },
  DetailFilterDashboard:{
    screen:DetailFilterDash,
    navigationOptions: {
      header:null,
    },
  },
  BandFilter:{
    screen:BandFilterScreen,
    navigationOptions: {
      header:null,
    },
  },
  DivisiFilter:{
    screen:DivisiFilterScreen,
    navigationOptions: {
      header:null,
    },
  },
  FuFilter:{
    screen:FuFilterScreen,
    navigationOptions: {
      header:null,
    },
  },
  KELJTFilter:{
    screen:KELJTFilterScreen,
    navigationOptions: {
      header:null,
    },
  },
},{
  gesturesEnabled: false,
  contentComponent: ListNavigation
})

//primary stack
const navigator = StackNavigator({
  login: {
    screen: LoginScreen,
    navigationOptions:{
      header:null
    }
  },
  Main:{
    screen:MainMenu,
    navigationOptions:{
      header:null
    }
  },
},{
  transitionConfig: noTransitionConfig
});

export default navigator;
