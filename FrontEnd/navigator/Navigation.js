import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from '../screen/Login'
import SignUp from '../screen/SignUp'
import Main from '../screen/Main'
import Queue from '../screen/Queue'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { color } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login"
                screenOptions={{
                    headerShown: false,
                    headerTransparent: true,
                }}>
                <Stack.Screen name="login" component={Login}
                    options={{
                        title: null,
                        headerTintColor: "white"
                    }} />
                <Stack.Screen name="signup" component={SignUp}
                    options={{
                        title: null,
                        headerTintColor: "white"
                    }} />
                <Stack.Screen name="main" component={Menu}
                    options={{
                        headerTintColor: "black",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Custom = props => {
    return (
        <DrawerContentScrollView {...props}>
            <Text>Pawaris</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const Menu = () => {
    return (

        <Drawer.Navigator drawerContent={(props) => <Custom {...props} />}
            screenOptions={{
                headerTransparent: true,
                title: null,
                headerTintColor: 'black',
            }} >

            <Drawer.Screen name="1" component={BottomTab}
                options={{
                    drawerLabel: "Main",
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name="md-home"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }} />

        </Drawer.Navigator>
    )
}

const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#0d253f",
            tabBarStyle: {
                backgroundColor: "#f9be7c",
                padding: 0,
                margin: 0
            },
            tabBarLabelStyle: { fontSize: 15 },
        }}>
            <Tab.Screen name="Meals" component={Main}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="home" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen name="Favorites" component={Queue}
            // options={{
            //     tabBarIcon: ({ color, size }) => {
            //         return <AntDesign name="staro" size={size} color={color} />;
            //     },
            // }}
            />
        </Tab.Navigator>
    )
}


export default Navigation

const styles = StyleSheet.create({})
