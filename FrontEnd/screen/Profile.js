import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons } from '@expo/vector-icons';
import Btn from '../components/Button'
import InfoBox from '../components/InfoBox';
import InfoHalfBox from '../components/InfoHalfBox';
import axios from "axios"


const Profile = ({ navigation }) => {

    let isMount = true
    const [userinfo, setUserinfo] = useState({

    })
    useEffect(() => {
        const getUserInfo = async () => {
            if (isMount) {
                console.log("profile");
                const instance = axios.create({
                    withCredentials: true
                })

                await instance.get(global.local + "/finduser")
                    .then(res => {
                        setUserinfo(res.data)
                        console.log(res.data);


                    })
                isMount = false
            }
        }
        return (
            getUserInfo()
        )
    }, [])

    return (
        <View style={styles.container}>

            <Bg Text1='Profile' />
            <View style={styles.position}>
                <InfoBox f={userinfo.firstname} m={userinfo.lastname} icon='person' titleTop='ชื่อ' titleMid='นามสกุล' />
                <KeyboardAwareScrollView style={{ marginTop: RFPercentage(1), height: hp('42%') }}>
                    <InfoHalfBox titleL='วันเกิด' infoL={userinfo.dob} colorL='#309397' titleR='เพศ' infoR={userinfo.gender} colorR='#e46472' iconL='birthday-cake' iconR='transgender' />
                    <InfoHalfBox titleL='ที่อยู่' infoL={userinfo.address} colorL='#f9be7c' titleR='เบอร์โทรศัพท์' infoR={userinfo.phone_number} colorR='#309397' iconL='address-book' iconR='phone' />
                    <InfoHalfBox titleL='ส่วนสูง' infoL={userinfo.height} colorL='#e46472' titleR='น้ำหนัก' infoR={userinfo.weight} colorR='#f9be7c' iconL='arrows-alt-h' iconR='arrows-alt-v' />
                    <InfoHalfBox titleL='การแพ้' infoL={userinfo.allergic === null ? userinfo.allergic : '-'} colorL='#309397' iconL='allergies' titleR='โรคประจำตัว' infoR={userinfo.disease === null ? userinfo.disease : '-'} colorR='#e46472' iconR='disease' />
                    <InfoBox titleTop='ID' titleMid='อีเมล' f={userinfo.identity_number} m={userinfo.email} icon='alternate-email' />
                    <Btn navigation={navigation} label='แก้ไข' color='#f9be7c' />
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

    }
})
