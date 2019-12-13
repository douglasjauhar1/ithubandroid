import React from 'react'
import {createAppContainer} from 'react-navigation'

import {createStackNavigator} from 'react-navigation-stack'
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import Home from './Home/Home';

const AppNavigator = createStackNavigator(
    {
        Welcome : Welcome,
        Login : Login,
        Register : Register,
        Home : Home
    },
    {
        headerMode : 'none',
        initialRouteName : 'Welcome'
    }
);
export default createAppContainer(AppNavigator)