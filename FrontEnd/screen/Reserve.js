import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ScrollView, RefreshControl } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Btn from '../components/Button';
import axios from 'axios'
import { useIsFocused } from '@react-navigation/core';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Reserve = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [selectedValue, setSelectedValue] = useState("normal");
    const [Day, setDay] = useState('Monday')
    const [remainQueue, setRemainQueue] = useState()
    const [symtomInput, setSymtomInput] = useState("")
    const [fetching, letFetching] = useState()

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false)
            getQueue()
            
        });
    }, []);

    useEffect(() => {
        if (isFocused) { getQueue() }


    })


    const getQueue = async () => {


        var data = {
            "type": selectedValue
        }
        await axios.post(global.local + "/getqueuetype", data)
            .then(res => {
                letFetching(res.data)

                setRemainQueue(res.data)
            })

    }

    const postQueue = async () => {
        var data = {
            type: selectedValue,
            symtom: symtomInput
        }
        await axios.post(global.local + "/addqueue", data)
            .then(res => {
                if (res.data == 'limit') {
                    alert("cannot queue more than 1 or cancel ur other queue")
                }
                else if (res.data == 'cannot queue') {
                    alert("You've already in Queue")
                    navigation.navigate('Queue')
                }
                else {

                    navigation.navigate('Queue')
                }
            })
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
            <Bg Text1='ระบบการจองคิว' />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.position}>

                    <Text style={styles.label}>แผนกการรักษา</Text>

                    <Picker
                        selectedValue={selectedValue}
                        style={{ width: wp('80%'), }}
                        itemStyle={{ color: 'white', fontFamily: 'Kanit' }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="แผนกทั่วไป" value="normal" />
                        {Day === 'Monday' || 'Thursday' ? <Picker.Item label="จิตแพทย์" value="psychiatrist" /> : null}
                        {Day === 'Monday' ? <Picker.Item label="สูตินารีเวช" value="obstetrician" /> : null}
                        {Day === 'Tuesday' ? <Picker.Item label="ระบบทางเดินอาหาร" value="gastro-enterologist" /> : null}
                        {Day === 'Wednesday' ? <Picker.Item label="กายภาพบำบัด" value="physiatrist" /> : null}
                        {Day === 'Wednesday' ? <Picker.Item label="สมองและเส้นประสาท" value="neurologist " /> : null}
                        {Day === 'Thursday' ? <Picker.Item label="หู คอ จมูก" value="oto-rhino-laryngologist" /> : null}
                        {Day === 'Friday' ? <Picker.Item label="โรคผิวหนัง" value="dermatologist" /> : null}
                        {Day === 'Friday' ? <Picker.Item label="จักษุ" value="ophthalmologist " /> : null}



                    </Picker>
                    {/* <TextInput style={styles.input} placeholder="Please Elaborate" multiline
                    numberOfLines={4} /> */}


                    <View >
                        <Text style={styles.label} >อาการ</Text>

                        <TextInput style={styles.input} placeholder="โปรดระบุ+" multiline
                            numberOfLines={4}
                            onChangeText={x => { setSymtomInput(x) }} />
                    </View>
                    <View style={styles.queueBorder}>
                        <Text style={[styles.font1, { fontSize: RFPercentage(5) }]}>{remainQueue}</Text>
                    </View>
                    <Text style={[styles.font1, { fontSize: 20 }]}>จำนวนคิวปัจจุบัน</Text>
                    {/* <Btn navigation={navigation} label='CONFIRM' color='#309397' /> */}
                    <TouchableOpacity style={{ ...styles.btn }} onPress={() => {
                        // navigation.replace(props.to)
                        postQueue()
                    }}>
                        <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>ยืนยัน</Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback >

        </ScrollView >
    )
}

export default Reserve

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
        transform: [{ translateY: RFPercentage(20) }]
    },
    input: {
        fontFamily: 'Kanit',
        color: 'white',
        fontSize: RFPercentage(2),
        height: hp('9%'),
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,

    },
    label: {
        color: 'white',
        fontSize: RFPercentage(2.5),
        fontFamily: 'Kanit'
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
    font1: {
        alignSelf: 'center',

        fontFamily: 'Kanit',
        color: '#fff9ec',
    },
    btn: {
        marginBottom: hp('5%'),
        marginTop: hp('3%'),
        fontFamily: 'Poppins',
        alignSelf: 'center',
        backgroundColor: '#309397',
        width: wp('80%'),
        paddingVertical: 10,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
})
