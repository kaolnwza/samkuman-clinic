import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios'


import Bg from '../components/Pagebg'

const Queue = ({ navigation }) => {
    const [currentQueue, setCurrentQueue] = useState();
    const [remainQueue, setRemainQueue] = useState();
    const [userQueue, setUserQueue] = useState();


    const data = JSON.stringify({
        user_id: 1,
        type: "kuy"
    })

    //let isMount = true

    useEffect(() => {
        const getQueue = async () => {
            console.log(data);
            console.log("queue");
            const instance = axios.create({
                withCredentials: true
            })

            await instance.post(global.local + "/getuserqueue", data)
                .then(res => {
                    setCurrentQueue(res.data.current_queue)
                    setRemainQueue(res.data.remain_queue)
                    setUserQueue(res.data.user_queue)
                    console.log(res.data);

                })
            //isMount = false

        }
        return (
            getQueue()

        )
    }, [])

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
                    <Text style={[styles.font1, { fontSize: RFPercentage(5) }]}>{currentQueue}</Text>
                </View>
                <Text style={[styles.font1, { fontSize: 20 }]}>Current Queue</Text>


                <Text style={[styles.font1, { fontSize: RFPercentage(5), marginTop: 50 }]}>Your Queue</Text>
                <Text style={[styles.font1, { fontSize: RFPercentage(2) }]}>Is</Text>
                <View style={styles.queueBorder2}>
                    <Text style={[styles.font1, { fontSize: RFPercentage(7) }]}>{userQueue}</Text>
                </View>
                <Text style={[styles.font1, { fontSize: RFPercentage(2) }]}>{remainQueue} more queue</Text>
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
