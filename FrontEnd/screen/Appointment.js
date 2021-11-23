import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PostponeBox from '../components/PostponeBox';
import axios from "axios"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const Appointment = () => {


    const [userAppointment, setUserAppointment] = useState()

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    
    useEffect(() => {
        const getUserInfo = async () => {

            await axios.get(global.local + "/getappointment")
                .then(res => {
                    setUserAppointment(res.data)
                    //console.log(res.data)

                })
        }
        return (
            getUserInfo()
        )
    })
    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <Bg Text1='การนัดหมาย' />
            <View style={styles.position}>
                <View style={{ marginTop: RFPercentage(1), height: hp('62%') }}>
                    <PostponeBox appintList={userAppointment} />
                </View>
            </View>
        </ScrollView>
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
