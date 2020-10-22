import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import AntIcon from "react-native-vector-icons/AntDesign"
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";
import TestRequest from "./screens/TestRequest";


import * as firebase from "firebase";

var firebaseConfig = require("./firebase.json")

firebase.initializeApp(firebaseConfig);

signOutUser = () => {
    firebase.auth().signOut();
};

const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-home" size={30} color={tintColor} />)
            }
        },
        Test: {
            screen: TestRequest,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-flask" size={30} color={tintColor} />)
            }
        },
        Logout: {
            screen: () => null, 
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (<AntIcon name="logout" size={30} color={tintColor} onPress={this.signOutUser} />)
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "#6175ff",
            inactiveTintColor: "#B8BBC4",
            showLabel: false
        }
    }
);

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppTabNavigator,
            Auth: AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    )
);
