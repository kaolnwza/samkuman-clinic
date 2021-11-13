import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Device from 'expo-device';


const Pagebg = (props) => {
    return (
        <View style={styles.header}>
            <View style={[Device.osName === "iPadOS" ? styles.im2Ipad : styles.im2]}>
                <Image source={require('../assets/normal_u5.png')} />
            </View>
            <View style={[Device.osName === "iPadOS" ? styles.imageIpad : styles.image]}>
                <Image source={require('../assets/normal_u4.png')} />
            </View>
            <View style={styles.Name}>
                <Text style={styles.FN}>{props.Text1}</Text>
            </View>
        </View>
    )
}

export default Pagebg

const styles = StyleSheet.create({
    header: {
        transform: [{ translateY: "20%" }]
    },
    image: {
        justifyContent: "center",
        transform: [{ translateX: "-50%" }, { translateY: "-20%" }, { rotate: '-5deg' }, { scale: 1.11 }],
        position: 'absolute'
    },
    imageIpad: {
        justifyContent: "center",
        transform: [{ translateX: "200%" }, { translateY: "-20%" }, { scale: 1.92 }, { rotate: '-5deg' }],
        position: 'absolute'
    },
    im2: {
        transform: [{ translateX: "-10%" }, { translateY: "-30%" }],
        justifyContent: "center"
    },
    im2Ipad: {
        transform: [{ translateX: "330%" }, { translateY: "-30%" }, { scale: 1.9 }],
        justifyContent: "center"
    },
    Name: {
        position: 'absolute',
        right: 0,
        paddingTop: 30,
        paddingRight: 20,
    },
    FN: {
        fontSize: RFPercentage(5),
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#0d253f',
        lineHeight: RFPercentage(5.7)

    },


})
