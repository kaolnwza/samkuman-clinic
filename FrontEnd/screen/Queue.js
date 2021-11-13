import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Bg from '../components/Pagebg'

const Queue = ({ navigation }) => {
    const [currentQueue, setCurrentQueue] = useState();
    const [yourQueue, setYourQueue] = useState();
    const [moreQueue, setMoreQueue] = useState();
    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
    });
    if (!loaded) {
        return null;
    }




    return (
        <View style={styles.container}>
            <Bg Text1='Queue' />
            <View style={styles.position}>
                <View style={styles.queueBorder}>
                    <Text style={[styles.font1, { fontSize: RFPercentage(5) }]}>5</Text>
                </View>
                <Text style={[styles.font1, { fontSize: 20 }]}>Current Queue</Text>


                <Text style={[styles.font1, { fontSize: RFPercentage(5), marginTop: 50 }]}>Your Queue</Text>
                <Text style={[styles.font1, { fontSize: RFPercentage(2) }]}>Is</Text>
                <View style={styles.queueBorder2}>
                    <Text style={[styles.font1, { fontSize: RFPercentage(7) }]}>6</Text>
                </View>
                <Text style={[styles.font1, { fontSize: RFPercentage(2) }]}>1 more queue</Text>
                <TouchableOpacity style={{ ...styles.btn }} onPress={() => {
                    // navigation.replace(props.to)
                }}>
                    <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Poppins', alignSelf: 'center' }}>CANCEL</Text>
                </TouchableOpacity>



            </View>

        </View >
    )
}

export default Queue

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
    btn: {
        marginBottom: hp('5%'),
        marginTop: hp('3%'),
        fontFamily: 'Poppins',
        alignSelf: 'center',
        backgroundColor: '#e46472',
        width: wp('80%'),
        paddingVertical: 10,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
    queueBorder: {
        borderColor: "#309397",
        borderWidth: RFPercentage(0.8),
        borderRadius: RFPercentage(4),
        height: RFPercentage(13),
        width: RFPercentage(13),
        margin: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },

    queueBorder2: {
        borderColor: "#e46472",
        borderWidth: RFPercentage(0.8),
        borderRadius: RFPercentage(4),
        height: RFPercentage(15),
        width: RFPercentage(15),
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },

    position: {
        flexDirection: 'column',
        alignSelf: 'center',
        position: 'absolute',
        transform: [{ translateY: RFPercentage(20) }]
    },

    font1: {
        alignSelf: 'center',

        fontFamily: 'Poppins',
        color: '#fff9ec',
    }

})
