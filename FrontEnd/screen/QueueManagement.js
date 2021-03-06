import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';


const PassQueue = () => {
    const isFocused = useIsFocused()

    const [selectedValue, setSelectedValue] = useState("normal");
    const [Day, setDay] = useState('')
    const [currentQueue, setCurrentQueue] = useState(555);
    const [remainQueue, setRemainQueue] = useState();
    const [_, runFetching] = useState()



    useEffect(() => {

        if (isFocused) {
            getQueue()
        }

    })

    const getQueue = async () => {
        var data = {
            "type": selectedValue
        }
        await axios.post(global.local + "/getremainqueue", data)
            .then(res => {
                if (res.data.cursor.Current != null) {
                    setCurrentQueue(res.data.struct[0].queue_id)
                }
                else if (res.data.cursor.Current == null) {
                    setCurrentQueue('-')
                }
                runFetching(res.data)
            })
        setDay(moment(new Date()).format('dddd').toString())
    }

    const queueDelete = async () => {
        await axios.delete(global.local + "/reachqueue", { data: { type: selectedValue } })
        console.log("queue deleted");
    }

    return (
        <View style={styles.container}>
            <Bg Text1='การจัดการคิว' />
            <View style={styles.position}>

                <Picker
                    selectedValue={selectedValue}
                    style={{ width: wp('80%'), }}
                    itemStyle={{ color: 'white', fontFamily: 'Kanit' }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="แผนกทั่วไป" value="normal" />
                    {Day === 'Monday' | 'Thursday' ? <Picker.Item label="จิตแพทย์" value="psychiatrist" /> : null}
                    {Day === 'Monday' ? <Picker.Item label="สูตินารีเวช" value="obstetrician" /> : null}
                    {Day === 'Tuesday' ? <Picker.Item label="ระบบทางเดินอาหาร" value="gastro-enterologist" /> : null}
                    {Day === 'Wednesday' ? <Picker.Item label="กายภาพบำบัด" value="physiatrist" /> : null}
                    {Day === 'Wednesday' ? <Picker.Item label="สมองและเส้นประสาท" value="neurologist " /> : null}
                    {Day === 'Thursday' ? <Picker.Item label="หู คอ จมูก" value="oto-rhino-laryngologist" /> : null}
                    {Day === 'Friday' ? <Picker.Item label="โรคผิวหนัง" value="dermatologist" /> : null}
                    {Day === 'Friday' ? <Picker.Item label="จักษุ" value="ophthalmologist " /> : null}



                </Picker>

                <View style={styles.queueBorder}>
                    <Text style={[styles.font1, { fontSize: RFPercentage(5) }]}>{currentQueue}</Text>
                </View>

                <Text style={[styles.font1, { fontSize: 20 }]}>คิวปัจจุบัน</Text>
                <TouchableOpacity style={{ ...styles.btn }} onPress={() => {
                    // navigation.replace(props.to)
                    queueDelete()
                }}>
                    <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>คิวต่อไป</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PassQueue

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
        backgroundColor: '#309397',
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
    position: {
        flexDirection: 'column',
        alignSelf: 'center',
        position: 'absolute',
        transform: [{ translateY: RFPercentage(25) }]
    },
    font1: {
        alignSelf: 'center',

        fontFamily: 'Kanit',
        color: '#fff9ec',
    }
})
