import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Bg from '../components/Pagebg'

const Reserve = () => {
    return (
        <View style={styles.container}>
            <Bg Text1='Reservation' />
        </View>
    )
}

export default Reserve

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
})
