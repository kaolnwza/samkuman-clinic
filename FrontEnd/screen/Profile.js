import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons } from '@expo/vector-icons';
import Btn from '../components/Button'
import InfoBox from '../components/InfoBox';
import InfoHalfBox from '../components/InfoHalfBox';
const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Bg Text1='Profile' />
            <View style={styles.position}>
                <InfoBox f='Pawaris' m='Wongsaied' icon='person' titleTop='First Name ' titleMid='Last Name ' />
                <KeyboardAwareScrollView style={{ marginTop: RFPercentage(1), height: hp('42%') }}>
                    <InfoHalfBox titleL='Birthday' infoL='04/07/2544' colorL='#309397' titleR='Sex' infoR='Male' colorR='#e46472' iconL='birthday-cake' iconR='transgender' />
                    <InfoHalfBox titleL='Address' infoL='653/1, RNP, Chalongkrung1, Ladkrabang BKK' colorL='#f9be7c' titleR='Phone' infoR='0954035514' colorR='#309397' iconL='address-book' iconR='phone' />
                    <InfoHalfBox titleL='Height' infoL='171' colorL='#e46472' titleR='Weight' infoR='62' colorR='#f9be7c' iconL='arrows-alt-h' iconR='arrows-alt-v' />
                    <InfoHalfBox titleL='Allergic' infoL='Peanut Butter' colorL='#309397' iconL='allergies' titleR='Congenital Disease' infoR='Diabetes' colorR='#e46472' iconR='disease' />
                    <InfoBox titleTop='ID' titleMid='Email' titleBot='Password' f='1100600434386' m='farrocker@outlook.co.th' l='FUCKU' icon='alternate-email' />
                    {/* <Btn navigation={navigation} label='EDIT' color='#f9be7c' /> */}
                    <TouchableOpacity style={{ ...styles.btn }} onPress={() => {
                        // navigation.replace(props.to)
                    }}>
                        <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Poppins', alignSelf: 'center' }}>EDIT</Text>
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
