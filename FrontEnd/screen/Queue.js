import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts } from 'expo-font';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { FontAwesome } from '@expo/vector-icons';
import * as Device from 'expo-device';

import Bg from '../components/Pagebg'

const Queue = ({ navigation }) => {
    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
    });
    if (!loaded) {
        return null;
    }


    const [ currentQueue, setCurrentQueue] = useState();
    const [ yourQueue, setYourQueue] = useState(); 
    const [ moreQueue, setMoreQueue] = useState();  

    return (
        <View style={styles.container}>
            <Bg Text1='Queue' />
            <View style={[Device.osName === "iPadOS" ? styles.position : styles.position]}>
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


                <TouchableOpacity style={styles.cancel}>
                    <Text style={{ fontSize: RFPercentage(4), fontFamily: 'Poppins', color: '#0d253f' }}>CANCEL</Text>
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



    cancel: {
        backgroundColor: '#e46472',
        borderRadius: 40,
        height: RFPercentage(8),
        width: RFPercentage(40),
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },


    font1: {
        alignSelf: 'center',

        fontFamily: 'Poppins',
        color: '#fff9ec',
    }

})
