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

    const [appointmentTitle, setAppointmentTitle] = useState();




    const updateAppointment = async () => {
        await axios.get(global.local + "/updateappointment")
            .then(res => {
                //runFetching(res.data)
                setAppointmentTitle(date)
                console.log("update" + date)

            })
    }





    const renderItem = ({ item }) => {

        return (

            <View style={styles.box}>
                <Text style={{ margin: RFPercentage(2), fontFamily: 'Poppins', fontSize: RFPercentage(3) }}>การนัดหมายวันที่ {Moment(item.date).format('d MMM')}</Text>
                <View style={{ marginHorizontal: RFPercentage(4), marginBottom: RFPercentage(1) }}>
                    <Text style={styles.detail}>Name : {item.firstname} {item.lastname}</Text>
                    <Text style={styles.detail}>Doctor : {item.doctor_firstname}</Text>
                    <Text style={styles.detail}>Date : {Moment(item.date).format('LL')}</Text>
                    <Text style={styles.detail}>Time : {Moment(item.date).format('HH.mm A')}</Text>

                    <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                    }} style={{ backgroundColor: '#f9be7c', width: wp('30%'), borderRadius: RFPercentage(5), justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Poppins', padding: RFPercentage(1), alignSelf: 'center' }}>Postpone</Text>
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
                                <Text style={styles.modalText}>Select your Date and Time</Text>
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
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle} onPress={() => updateAppointment()}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

        );
    };
    return (
        <FlatList data={props.appintList} renderItem={renderItem} keyExtractor={item => item.date} numColumns={1} />

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
        fontFamily: 'Poppins',
        marginBottom: RFPercentage(2),
        lineHeight: RFPercentage(2)
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 20,
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
        fontFamily: 'Poppins',
        fontSize: RFPercentage(2)

    }
})
