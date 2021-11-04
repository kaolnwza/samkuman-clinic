import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Bg from '../components/Pagebg'

const History = () => {
    return (
        <View style={styles.container}>
            <Bg Text1='History' />

        </View>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
})
