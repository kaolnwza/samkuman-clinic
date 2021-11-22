import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Device from 'expo-device';
import axios from 'axios'

const PostponeBox = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };
    const [currentId, setCurrentId] = useState(-1)

    const [appointmentTitle, setAppointmentTitle] = useState();

    const renderItem = ({ item }) => {
        const updateAppointment = async (ap_id) => {
            console.log(ap_id);
            var data = {

                date: Moment(date).format(),
                appointment_id: ap_id
            }

            await axios.post(global.local + "/updateappointment", data)
                .then(res => {
                    // console.log(res.data);
                    // console.log(item.appointment_id + " has changed");
                    // runFetching(res.data)
                    // setAppointmentTitle(date)
                    // console.log("update" + date)
                    //console.log("update2" + "2021-11-20T13:02:10.463+00:00")

                })
        }

        return (

            <View style={styles.box}>
                <Text style={{ margin: RFPercentage(2), fontFamily: 'Kanit', fontSize: RFPercentage(3) }}>การนัดหมายวันที่ {Moment(item.date).format('LL')}</Text>
                <View style={{ marginHorizontal: RFPercentage(4), marginBottom: RFPercentage(1) }}>
                    <Text style={styles.detail}>Name : {item.firstname} {item.lastname}</Text>
                    <Text style={styles.detail}>Doctor : {item.doctor_firstname}</Text>
                    <Text style={styles.detail}>Date : {Moment(item.date).format('LL')}</Text>
                    <Text style={styles.detail}>Time : {Moment(item.date).format('HH.mm A')}</Text>

                    <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                        setCurrentId(item.appointment_id)
                        setDate(new Date(item.date))
                    }} style={{ backgroundColor: '#f9be7c', width: wp('30%'), borderRadius: RFPercentage(5), justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Kanit', padding: RFPercentage(1), alignSelf: 'center', fontSize: RFPercentage(2) }}>เลื่อน</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>โปรดเลือกวันและเวลาที่จะเลื่อน</Text>
                                <DateTimePicker
                                    style={{ marginRight: Device.osName === 'iPadOS' ? wp('30%') : null, width: wp('57%'), marginBottom: RFPercentage(2), }}
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="datetime"
                                    display="default"
                                    onChange={onChange}
                                    themeVariant="light"
                                    textColor="white"
                                />

                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: wp('70%') }}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonCancel]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonSave]}
                                        onPress={() => [setModalVisible(!modalVisible), updateAppointment(currentId)]}
                                    >
                                        <Text style={styles.textStyle} >Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View >

        );
    };
    return (
        <FlatList data={props.appintList} renderItem={renderItem} keyExtractor={item => item.appointment_id} numColumns={1} />

    )
}

export default PostponeBox

const styles = StyleSheet.create({
    box: {
        width: wp('80%'),
        backgroundColor: '#309397',
        borderRadius: RFPercentage(5),
        marginVertical: RFPercentage(1),
        shadowColor: "black",
        shadowOpacity: RFPercentage(0.1),
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: RFPercentage(0.5),
        elevation: 3,
    },
    detail: {
        fontFamily: 'Kanit',
        marginBottom: RFPercentage(2),
        lineHeight: RFPercentage(2),
        fontSize: RFPercentage(1.8)
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width: wp('70%'),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#FFF9EC'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonCancel: {
        backgroundColor: "#e46472",
        width: wp('25%')
    },
    buttonSave: {
        backgroundColor: "#309397",
        width: wp('25%'),

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'Poppins'
    },
    modalText: {
        marginBottom: RFPercentage(2),
        textAlign: "center",
        fontFamily: 'Kanit',
        fontSize: RFPercentage(2.5)

    }
})
