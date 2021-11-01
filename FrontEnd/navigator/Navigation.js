import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from '../screen/login'
import SignUp from '../screen/SignUp'
import Main from '../screen/Main'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login"
                screenOptions={{
                    headerShown: true,
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
                <Stack.Screen name="main" component={Main}
                    options={{
                        title: null,
                        headerTintColor: "white"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

const styles = StyleSheet.create({})
