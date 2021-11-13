import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Bg from '../components/Pagebg'



const Patient = () => {
    return (
        <View style={styles.container}>
            <Bg Text1='Patient Managemant' />
            <View style={styles.position}>
                <Text>ladflj</Text>
            </View>
        </View>
    )
}

export default Patient

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
        transform: [{ translateY: RFPercentage(25) }]
    },
})
