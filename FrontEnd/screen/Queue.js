import React, { useState, useEffect, Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { useFonts } from 'expo-font';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios'


import Bg from '../components/Pagebg'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Queue = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [currentQueue, setCurrentQueue] = useState();
    const [remainQueue, setRemainQueue] = useState();
    const [userQueue, setUserQueue] = useState();
    const [_, runFetching] = useState()


    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1500).then(() => {
            setRefreshing(false)
            getQueue()
        });
    }, []);

    const data = JSON.stringify({
        user_id: 15,
        type: "kuy"
    })

    //let isMount = true


    useEffect(() => {
        if (isFocused) {
            getQueue()
        }


    })

    const getQueue = async () => {
        await axios.get(global.local + "/getuserqueue")
            .then(res => {
                runFetching(res.data)
                setCurrentQueue(res.data.current_queue)
                setRemainQueue(res.data.remain_queue)
                setUserQueue(res.data.user_queue)
                // console.log("queue");
            })


    }

    const cancelQueue = async () => {
        await axios.delete(global.local + "/usercanclequeue")
            .then(
                res => alert(res.data)
            )
    }

    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
    });
    if (!loaded) {
        return null;
    }






    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <Bg Text1='คิวการรักษา' />
            <View style={styles.position}>
                <View style={styles.queueBorder}>
                    <Text style={[styles.font1, { fontSize: RFPercentage(5) }]}>{currentQueue}</Text>
                </View>
                <Text style={[styles.font1, { fontSize: 20 }]}>คิวปัจจุบัน</Text>


                <Text style={[styles.font1, { fontSize: RFPercentage(5), marginTop: 65 }]}>คิวของคุณ</Text>
                {/* <Text style={[styles.font1, { fontSize: RFPercentage(2) }]}>คือ</Text> */}
                <View style={styles.queueBorder2}>
                    <Text style={[styles.font1, { fontSize: RFPercentage(7) }]}>{userQueue}</Text>
                </View>
                <Text style={[styles.font1, { fontSize: RFPercentage(2) }]}>{remainQueue}  คิวก่อนหน้าคุณ</Text>
                <TouchableOpacity style={{ ...styles.btn }} onPress={() => {
                    // navigation.replace(props.to)
                    cancelQueue()

                }}>
                    <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>ยกเลิกคิว</Text>
                </TouchableOpacity>



            </View>

        </ScrollView >
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

        fontFamily: 'Kanit',
        color: '#fff9ec',
    }

})
