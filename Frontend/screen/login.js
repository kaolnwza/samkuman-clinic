import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

const login = () => {
    return (
        <View>
            <Text style={{ textAlign: 'center' }}>Login</Text>
            <TextInput style={styles.input} placeholder="username" />
            <TextInput style={styles.input} placeholder="password" />
            <Button title="LOGIN" />
        </View>
    )
}

export default login

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})
