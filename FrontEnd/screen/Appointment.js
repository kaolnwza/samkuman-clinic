import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Bg from '../components/Pagebg'

const Appointment = () => {
    return (
        <View style={styles.container}>
            <Bg Text1='Appointment' />

        </View>
    )
}

export default Appointment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
})
