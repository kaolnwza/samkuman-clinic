import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Button = (props) => {
    const navigation = props.navigation

    return (
        <TouchableOpacity style={{ ...styles.btn, ...{ backgroundColor: props.color } }} onPress={() => {
            navigation.replace(props.to)
        }}>
            <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Poppins', color: '#333333', alignSelf: 'center' }}>{props.label}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: {
        marginVertical: hp('5%'),
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
    }
})
