import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Bg from '../components/Pagebg'

const Notify = () => {
    return (
        <View style={styles.container}>
            <Bg Text1='Notification' />
        </View>
    )
}

export default Notify

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
})
