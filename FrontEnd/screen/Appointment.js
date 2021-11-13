import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PostponeBox from '../components/PostponeBox';

const APPOINT = [
    {
        name: 'Pawaris Wongsaied',
        doctor: 'Sinlapawit Namwow',
        date: '04/04/2622',
        time: '12.00'
    },
    {
        name: 'Pawaris Wongsaied',
        doctor: 'Sinlapawit Namwow',
        date: '04/04/2623',
        time: '12.00'
    },
    {
        name: 'Pawaris Wongsaied',
        doctor: 'Sinlapawit Namwow',
        date: '04/04/2624',
        time: '12.00'
    },
]

const Appointment = () => {
    return (
        <View style={styles.container}>
            <Bg Text1='Appointment' />
            <View style={styles.position}>
                <View style={{ marginTop: RFPercentage(1), height: hp('62%') }}>
                    <PostponeBox appintList={APPOINT} />
                </View>
            </View>
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
    position: {
        flexDirection: 'column',
        alignSelf: 'center',
        position: 'absolute',
        transform: [{ translateY: RFPercentage(25) }]
    },
})
