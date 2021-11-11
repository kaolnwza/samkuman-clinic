import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const PassQueue = () => {
    return (
        <View style={styles.container}>
            <Bg Text1='Queue Management' />
            <View style={styles.position}>
                <Text>
                    FUCK U BITCH
                </Text>
            </View>
        </View>
    )
}

export default PassQueue

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
    position: {
        flexDirection: 'column',
        alignSelf: 'center',
        position: 'absolute',
        transform: [{ translateY: RFPercentage(20) }]
    },
})
