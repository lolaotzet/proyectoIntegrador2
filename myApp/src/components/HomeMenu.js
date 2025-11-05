import React, {Component} from 'react';
import { View, Text, Pressable,  StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import HomeStack from '../components/HomeStack'
import Profile from '../screens/Profile';
import CrearPosteo from '../screens/CrearPosteo'
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

export default class HomeMenu extends Component{
    render(){
        const Tab = createBottomTabNavigator();
        return(
            <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
                <Tab.Screen name="HomeStack" component={HomeStack} options={{headerShown:false, tabBarIcon: ()=> <FontAwesome name="home" size={24} color="black"/>}}/>
                <Tab.Screen name="CrearPosteo" component={CrearPosteo} options={{headerShown:false, tabBarIcon: ()=> <Entypo name="plus" size={24} color="black" />}}/>
                <Tab.Screen name="Profile" component={Profile} options={{headerShown:false, tabBarIcon: () => <AntDesign name="profile" size={24} color="black" />}}/>
            </Tab.Navigator>
    )
        }
}
