import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Main = () => {
    return (
        <View style={styles.container}>
            <Text>MAIN BITCH</Text>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF9EC',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
