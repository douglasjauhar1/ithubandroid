import React from 'react'
import {createAppContainer} from 'react-navigation'

import {createStackNavigator} from 'react-navigation-stack'
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import Home from './Home/Home';
import Profile from './Home/Profile'
import Pageengineer from './Home/Pageengineer'
import Preview from './Home/Preview'
import Pageproject from './Home/Pageproject'
import Project from './Form/Project'
import Modal from './Home/Modal';
import Hire from './Home/Hire'
import Engineerproject from './Home/Engineerproject'
import Logout from './Home/Logout'


const AppNavigator = createStackNavigator(
    {
        Welcome : Welcome,
        Login : Login,
        Register : Register,
        Home : Home,
        Profile : Profile,
        Pageengineer : Pageengineer,
        Preview : Preview,
        Pageproject : Pageproject,
        Project : Project,
        Modal : Modal,
        Hire : Hire,
        Engineerproject : Engineerproject,
        Logout : Logout
        
    },
    {
        headerMode : 'none',
        initialRouteName : 'Welcome'
    }
);
export default createAppContainer(AppNavigator)