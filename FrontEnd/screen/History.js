import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Alert, Modal, Pressable } from 'react-native'
import Bg from '../components/Pagebg'
import HistoryGridTile from '../components/HistoryGridTile';
import { useFonts } from 'expo-font';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios"


const DATA1 = [
    {
        title: 'Puad Hua',
        date: "10/11/2020",
        symptom: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        diagnose: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        doctorAdvice: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        medicine: ["1", "2", "3"],
        howToUse: ["HTU1", "HTU2", "HTU3"],

    },

    {
        title: 'Jeb Korrr',
        date: "10/11/2020",
        symptom: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        diagnose: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        doctorAdvice: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        medicine: ["1", "2", "3"],
        howToUse: ["HTU1", "HTU2", "HTU3"],

    },
    {
        title: 'Puad Tong',
        date: "10/11/2020",
        symptom: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        diagnose: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        doctorAdvice: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        medicine: ["1", "2", "3"],
        howToUse: ["HTU1", "HTU2", "HTU3"],

    },
];

const History = () => {

    let isMount = true
    const [userHistory, setuserHistory] = useState([])
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
                await instance.get(local + "/gethistory")
                    .then(res => {
                        setuserHistory(res.data)
                        // console.log(res.data)

                    })
                isMount = false
            }
        }
        return (
            getUserInfo()
        )
    }, [])
    const renderGridItem = (itemData) => {
        return (
            <HistoryGridTile
                date={itemData.item.date}
                title={itemData.item.symptom}
                detail={itemData.item}

            // color={itemData.item.color}
            // onSelect={() => {
            //   // เขียนโค้ดเพิ่ม
            //   navigation.navigate("CategoryMeals", {categoryId : itemData.item.id , categoryTitle : itemData.item.title})
            // }}
            />

        );
    };
    return (
        <View style={styles.container}>
            <Bg Text1='History' />
            <View style={styles.position}>
                <FlatList data={userHistory} renderItem={renderGridItem} keyExtractor={item => item.date} numColumns={1} />
            </View>
        </View>
    )
}

export default History


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
        transform: [{ translateY: hp('25%') }],
        height: hp('70%')
    },
})
