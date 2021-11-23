import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl, SafeAreaView } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PostponeBox from '../components/PostponeBox';
import axios from "axios"


const Appointment = () => {


    const [userAppointment, setUserAppointment] = useState()



    useEffect(() => {
        getUserInfo()

    }, [])

    const getUserInfo = async () => {

        await axios.get(global.local + "/getappointment")
            .then(res => {
                setUserAppointment(res.data)
                //console.log(res.data)

            })
    }

    return (
        <View style={styles.container}
        >
            <Bg Text1='การนัดหมาย' />
            <View style={styles.position}>
                <View style={{ marginTop: RFPercentage(1), height: hp('62%') }}>
                    <PostponeBox appintList={userAppointment} />
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
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        position: 'absolute',
        transform: [{ translateY: RFPercentage(25) }]
    },
})
