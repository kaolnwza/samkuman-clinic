import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from '../screen/Login'
import SignUp from '../screen/SignUp'
import Main from '../screen/Main'
import Queue from '../screen/Queue'
import Reserve from '../screen/Reserve'
import Notify from '../screen/Notify'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

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
            <View style={{ height: '70%', flexDirection: 'row' }}>
                <View style={{ height: 80, width: 80, borderRadius: 40, marginTop: 10, marginHorizontal: 10, borderWidth: 1 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Poppins' }}>
                        Pawaris
                    </Text>
                    <Text style={{ fontFamily: 'Poppins' }}>
                        Wongsaied
                    </Text>
                </View>
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const Menu = () => {
    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
    });
    return (

        <Drawer.Navigator drawerContent={(props) => <Custom {...props} />}
            screenOptions={{
                headerTransparent: true,
                title: null,
                headerTintColor: 'black',
                drawerLabelStyle: { fontFamily: 'Poppins' }
            }} >

            <Drawer.Screen name="1" component={BottomTab}
                options={{
                    drawerLabel: "Main",
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name="md-home"
                            size={size}
                            color={focused ? '#6488e4' : '#ccc'}
                        />
                    ),
                }} />

        </Drawer.Navigator>
    )
}

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#0d253f",
                tabBarStyle: {
                    backgroundColor: "#f9be7c",
                },

                tabBarLabelStyle: { fontSize: 15, },
                tabBarShowLabel: false
            }}>
            <Tab.Screen name="Main" component={Main}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="home" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen name="Reserve" component={Reserve}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons name="queue" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen name="Queue" component={Queue}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons name="add-to-queue" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen name="Noti" component={Notify}
                options={{
                    tabBarBadge: 3,
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="notifications" size={size} color={color} />;
                    },

                }}
            />

        </Tab.Navigator>
    )
}


export default Navigation

const styles = StyleSheet.create({})
