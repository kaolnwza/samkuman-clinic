import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import Bg from '../components/Pagebg'
import { RFPercentage } from 'react-native-responsive-fontsize';
import Information from '../components/Information';
import GridInformation from '../components/GridInformation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios"


const Main = ({ navigation }) => {
    const [Select, setSelect] = useState(true);
    let isMount = true
    const [news, setNews] = useState([])
    const [relation, setRelation] = useState([])

    useEffect(() => {
        const getInformation = async () => {
            if (isMount) {
                console.log("info");
                const instance = axios.create({
                    withCredentials: true
                })
                await instance.get(global.local + "/getinformation")
                    .then(res => {
                        setNews(res.data)
                        // console.log(res.data)

                    })
                isMount = false
            }
        }
        return (
            getInformation()
        )
    }, [])

    useEffect(() => {
        const getPublicRelation = async () => {
            if (isMount) {
                console.log("public");

                const instance = axios.create({
                    withCredentials: true
                })
                await instance.get(global.local + "/getpublicrelation")
                    .then(res => {
                        setRelation(res.data)
                        // console.log(res.data)

                    })
                isMount = false
            }
        }
        return (
            getPublicRelation()
        )
    }, [])


    return (
        <View style={styles.container}>
            <Bg Text1='หน้าหลัก' />
            <View style={styles.contentContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {
                        setSelect(true)
                    }} style={{ ...styles.tabSelect, backgroundColor: Select === true ? '#309397' : '#e46472' }} >
                        <Text style={styles.tabFont}>ข้อมูลข่าวสาร</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setSelect(false)
                    }} style={{ ...styles.tabSelect, backgroundColor: Select === false ? '#309397' : '#e46472' }} >
                        <Text style={styles.tabFont}>ตารางแพทย์</Text>
                    </TouchableOpacity>
                </View>
                {Select === true ? <SafeAreaView style={styles.content}>
                    <Information datalist={news} />
                </SafeAreaView> : null}
                <View style={{ ...styles.tabSelect }} >
                    <Text style={styles.tabFont}>ข่าวสารสุขภาพ</Text>
                </View>

                <SafeAreaView style={styles.content}>
                    <Information datalist={relation} />
                </SafeAreaView>


            </View >
        </View >
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
    contentContainer: {
        alignSelf: 'center',
        position: 'absolute',
        transform: [{ translateY: RFPercentage(21.) }]
    },
    content: {
    },
    tabSelect: {
        backgroundColor: '#e46472',
        paddingVertical: RFPercentage(1.5),
        width: wp('38%'),
        borderRadius: RFPercentage(5),
    },

    tabFont: {
        alignSelf: 'center',
        fontFamily: 'Poppins',
        fontSize: RFPercentage(2)
    },



})
