import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons } from '@expo/vector-icons';
import Btn from '../components/Button'
import InfoBox from '../components/InfoBox';
import InfoHalfBox from '../components/InfoHalfBox';
import axios from "axios"


const Profile = (props, { navigation }) => {
    const userinfo = props.route.params.userInfo

    return (
        <View style={styles.container}>

            <Bg Text1='ข้อมูลผู้ใช้' />
            <View style={styles.position}>
                <InfoBox f={userinfo.firstname} m={userinfo.lastname} icon='person' titleTop='ชื่อ' titleMid='นามสกุล' />
                <KeyboardAwareScrollView style={{ marginTop: RFPercentage(1), height: hp('42%') }}>
                    <InfoHalfBox titleL='วันเกิด' infoL={userinfo.dob} colorL='#309397' titleR='เพศ' infoR={userinfo.gender} colorR='#e46472' iconL='birthday-cake' iconR='transgender' />
                    <InfoHalfBox titleL='ที่อยู่' infoL={userinfo.address} colorL='#f9be7c' titleR='เบอร์โทรศัพท์' infoR={userinfo.phone_number} colorR='#309397' iconL='address-book' iconR='phone' />
                    <InfoHalfBox titleL='ส่วนสูง' infoL={userinfo.height} colorL='#e46472' titleR='น้ำหนัก' infoR={userinfo.weight} colorR='#f9be7c' iconL='arrows-alt-h' iconR='arrows-alt-v' />
                    <InfoHalfBox titleL='การแพ้' infoL={userinfo.allergic !== '' ? userinfo.allergic : '-'} colorL='#309397' iconL='allergies' titleR='โรคประจำตัว' infoR={userinfo.disease !== '' ? userinfo.disease : '-'} colorR='#e46472' iconR='disease' />
                    <InfoBox titleTop='ID' titleMid='อีเมล' f={userinfo.identity_number} m={userinfo.email} icon='alternate-email' />
                    <TouchableOpacity style={{ ...styles.btn, ...{ backgroundColor: '#f9be7c' } }} onPress={() => {

                        // _onPressButton()
                    }}>
                        <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', color: '#333333', alignSelf: 'center' }}>แก้ไข</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

export default Profile

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

    boxH: {
        marginTop: RFPercentage(1),
        backgroundColor: '#f9be7c',
        borderRadius: RFPercentage(4.5),
        width: wp('38%'),
        height: hp('20%'),
        padding: RFPercentage(1),
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        margin: RFPercentage(1),
        fontFamily: 'Poppins',
        fontSize: RFPercentage(2)
    },
    infoH: {
        fontFamily: 'Poppins',
        fontSize: RFPercentage(2),

    },
    btn: {
        marginBottom: hp('5%'),
        marginTop: hp('3%'),

        fontFamily: 'Poppins',
        alignSelf: 'center',
        backgroundColor: '#f9be7c',
        width: wp('80%'),
        paddingVertical: 10,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
})
