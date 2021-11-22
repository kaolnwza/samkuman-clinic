import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Login from '../screen/Login'
import SignUp from '../screen/SignUp'
import Main from '../screen/Main'
import Queue from '../screen/Queue'
import Reserve from '../screen/Reserve'
import Notify from '../screen/Notify'
import Appointment from '../screen/Appointment'
import History from '../screen/History'
import Profile from '../screen/Profile'
import Doctor from '../screen/DoctorLogin'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import PassQueue from '../screen/QueueManagement'
import Patient from '../screen/Patient'
import axios from 'axios'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const Navigation = () => {
    global.Role = ''


    return (

        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
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
                <Stack.Screen name="doctor" component={Doctor}
                    options={{
                        title: null,
                        headerTintColor: "white"
                    }} />
                <Stack.Screen name="main" component={Menu}
                    options={
                        ({ route }) => {
                            global.Role = route.params.role
                            console.log(global.Role);

                        }
                    }
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Custom = props => {

    const [user, setUser] = useState({})

    useEffect(() => {
        const getUser = async () => {
            await axios.get(global.local + "/finduser")
                .then(res => {
                    setUser(res.data)
                })
        }
        return (
            getUser()
        )
    })

    const logOut = async () => {
        const instance = axios.create({
            withCredentials: true
        })

        await instance(global.local + "/logout")
            .then(
                res => {
                    console.log(res.data);

                }
            )
    }
    return (
        <DrawerContentScrollView style={{ backgroundColor: '#fff9ec' }} {...props}>
            <TouchableOpacity style={{ flexDirection: 'row', flex: 1, }} onPress={() => {
                props.navigation.navigate('profile', { userInfo: user });

            }}>

                <View >
                    <AntDesign name="user" style={styles.profile} size={80} color="#309397" />
                </View>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <Text style={{ fontFamily: 'Poppins', fontSize: RFPercentage(1.8) }}>
                        {user.firstname}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins', fontSize: RFPercentage(1.8) }}>
                        {user.lastname}
                    </Text>

                    <TouchableOpacity style={styles.logout} onPress={() => {
                        logOut()
                        props.navigation.replace('login');
                    }}>
                        <Text style={{
                            fontFamily: 'Kanit'
                        }}>ออกจากระบบ</Text>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
            {/* <DrawerItem
                style={{
                    left: 0,

                }}
                label="Appointment"
                activeBackgroundColor='#007AFF'
                activeTintColor="#007AFF"
                icon={({ focused, size }) => (
                    <FontAwesome name="pencil-square-o" size={size} color={focused ? '#007AFF' : '#ccc'} />
                )}
                onPress={() => {
                    props.navigation.navigate('appoint');
                }}
            /> */}

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
                drawerLabelStyle: { fontFamily: 'Kanit', fontSize: RFPercentage(2) }

            }} >


            {global.Role === 'User' ? <Drawer.Screen name="home" component={BottomTab}
                options={{
                    drawerLabel: "หน้าหลัก",
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name="md-home"
                            size={size}
                            color={focused ? '#007AFF' : '#ccc'}
                        />
                    ),
                }} /> : null}
            {global.Role === 'User' ? <Drawer.Screen name="appoint" component={Appointment}
                options={{
                    drawerLabel: "การนัดหมาย",
                    drawerIcon: ({ focused, size }) => (
                        <FontAwesome name="pencil-square-o" size={size} color={focused ? '#007AFF' : '#ccc'} />
                    ),
                }} /> : null}
            {global.Role === 'User' ? <Drawer.Screen name="history" component={History}
                options={{
                    drawerLabel: "ประวัติการรักษา",
                    drawerIcon: ({ focused, size }) => (
                        <FontAwesome5 name="history" size={size} color={focused ? '#007AFF' : '#ccc'} />
                    ),
                }} /> : null}
            {global.Role === 'Staff' ? <Drawer.Screen name="pass" component={PassQueue}
                options={{
                    drawerLabel: "การจัดการคิว",
                    drawerIcon: ({ focused, size }) => (
                        <FontAwesome5 name="history" size={size} color={focused ? '#007AFF' : '#ccc'} />
                    ),
                }} /> : null}

            {global.Role === 'Staff' ? <Drawer.Screen name="AandH" component={Patient}
                options={{
                    drawerLabel: "ผลการรักษาและการนัดหมาย",
                    drawerIcon: ({ focused, size }) => (
                        <FontAwesome5 name="history" size={size} color={focused ? '#007AFF' : '#ccc'} />
                    ),
                }} /> : null}


            <Drawer.Screen name="profile" component={Profile}
                options={{
                    drawerLabel: () => null,
                    drawerIcon: () => null,
                    drawerActiveBackgroundColor: 'transparent',
                    drawerItemStyle: { height: 0 }
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
                    tabBarBadge: 999,
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="notifications" size={size} color={color} />;
                    },

                }}
            />

        </Tab.Navigator>
    )
}


export default Navigation

const styles = StyleSheet.create({
    logout: {
        backgroundColor: '#e46472',
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 5,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
    profile: {
        borderWidth: RFPercentage(0.5), borderRadius: 44, margin: RFPercentage(1),
        shadowColor: "#000",
        shadowOffset: { height: 5, width: 2 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    }
})
