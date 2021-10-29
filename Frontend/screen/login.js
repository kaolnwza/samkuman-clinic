import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, Button } from 'react-native'
import { SvgXml } from 'react-native-svg';
import Bh1 from '../assets/background/normal_u12.svg'

const login = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text>Login</Text>
            <TextInput placeholder="User" />
            <TextInput placeholder="Password" />
            <Button title='Login' />
        </View>
    )
}

export default login

const styles = StyleSheet.create({

})
