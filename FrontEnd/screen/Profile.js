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
        console.log("use eff");
        const getUserInfo = async () => {
            console.log("in");
            if (isMount) {
                console.log("getting");
                const instance = axios.create({
                    withCredentials: true
                })
                const local = "http://172.20.10.3:12345"
                await instance.get(local + "/getuserinformation")
                    .then(res => {
                        setUserinfo(res.data.user_object)

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
                <InfoBox f={userinfo.firstname} m={userinfo.lastname} icon='person' titleTop='First Name ' titleMid='Last Name ' />
                <KeyboardAwareScrollView style={{ marginTop: RFPercentage(1), height: hp('42%') }}>
                    <InfoHalfBox titleL='Birthday' infoL='04/07/2544' colorL='#309397' titleR='Sex' infoR='Male' colorR='#e46472' iconL='birthday-cake' iconR='transgender' />
                    <InfoHalfBox titleL='Address' infoL='653/1, RNP, Chalongkrung1, Ladkrabang BKK' colorL='#f9be7c' titleR='Phone' infoR='0954035514' colorR='#309397' iconL='address-book' iconR='phone' />
                    <InfoHalfBox titleL='Height' infoL='171' colorL='#e46472' titleR='Weight' infoR='62' colorR='#f9be7c' iconL='arrows-alt-h' iconR='arrows-alt-v' />
                    <InfoHalfBox titleL='Allergic' infoL='Peanut Butter' colorL='#309397' iconL='allergies' titleR='Congenital Disease' infoR='Diabetes' colorR='#e46472' iconR='disease' />
                    <InfoBox titleTop='ID' titleMid='Email' titleBot='Password' f='1100600434386' m='farrocker@outlook.co.th' l='FUCKU' icon='alternate-email' />
                    <Btn navigation={navigation} label='EDIT' color='#f9be7c' />
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
