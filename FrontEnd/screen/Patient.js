import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, RefreshControl, FlatList } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import Bg from '../components/Pagebg'
import * as Device from 'expo-device';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/core';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Patient = () => {
    const isFocused = useIsFocused()

    const [modalVisible, setModalVisible] = useState(false);
    const [createDate, setCreateDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [isDate, setIsDate] = useState(false)
    const [selectedValue, setSelectedValue] = useState(0);
    const [symptom, setSymptom] = useState('')
    const [result, setResult] = useState('')
    const [advice, setAdvice] = useState('')
    const [medic, setMedic] = useState('')

    const [isSave, setIsSave] = useState(false)

    const [userList, setUserList] = useState([])


    const [getHistoryId, setHistoryId] = useState(-1)

    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        if (isFocused) {
            getAllUser()
            getSymtom()
        }
    }, [selectedValue])

    const getAllUser = async () => {
        await axios.get(global.local + "/getalluser")
            .then(res => {
                setUserList(res.data)
                // console.log(res.data);
            })
    }

    const getSymtom = async () => {
        await axios.post(global.local + "/getsymtomqueue", { user_id: selectedValue })
            .then(res => {
                if (res.data.symtom != "not_found") {
                    setSymptom(res.data.symtom)
                }
                else {

                }

            })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false)
            getAllUser()
            getSymtom()
        });
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };


    const postHistory = async () => {
        var data = {
            user_id: parseInt(selectedValue),
            date: Moment(createDate).format(),
            symptom: symptom,
            diagnose: result,
            doctor_advice: advice,
            medicine: medic
        }


        await axios.post(global.local + "/addhistory", data)
            .then(res => {
                console.log("post history success")
                // setHistoryId(res.data.history_id)
                console.log(res.data);
                AddAp(res.data)
                alert("Add history success")
            })




    }

    const AddAp = async (val) => {
        var data2 = {
            user_id: parseInt(selectedValue),
            date: Moment(date).format(),
            history_id: val
        }
        if (isSave) {
            await axios.post(global.local + "/addappointment", data2)
                .then(res => {
                    console.log("post appointment success")
                    setIsSave(false)
                })
        }
    }
    const renderItem = ({ item }) => (

        <Text>{item.lastname}</Text>
    );

    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <Bg Text1='?????????????????????????????????????????????????????????????????????' />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.position}>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                    }} style={{ backgroundColor: '#f9be7c', borderRadius: RFPercentage(5), alignSelf: 'center', paddingHorizontal: RFPercentage(2), paddingVertical: RFPercentage(1) }}>
                        <Text style={{ fontFamily: 'Kanit', padding: RFPercentage(1), alignSelf: 'center', fontSize: RFPercentage(2) }}>????????????????????????????????????????????????????????????</Text>
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
                                        onPress={() => [setIsDate(false), setModalVisible(!modalVisible), setIsSave(false)]}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonSave]}
                                        onPress={() => [setIsDate(true), setModalVisible(!modalVisible), setIsSave(true)]}
                                    >
                                        <Text style={styles.textStyle}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Text style={{ ...styles.label, alignSelf: 'center' }}>{moment(date).format('LLL')}</Text>
                    <KeyboardAwareScrollView style={{ height: hp('44%'), marginTop: RFPercentage(5) }} extraScrollHeight={hp('37%')}>
                        <Text style={styles.label}>?????????????????????</Text>

                        <Picker
                            selectedValue={selectedValue}
                            style={{ width: wp('80%'), }}
                            itemStyle={{ color: 'white', fontFamily: 'Kanit' }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                            {
                                userList.map(function (user, i) {
                                    return (<Picker.Item value={i} key={i} label={"ID : " + user.user_id + "  " + user.firstname + " " + user.lastname} />);
                                })
                            }

                        </Picker>
                        <Text style={styles.label}>????????????????????????????????????</Text>
                        <TextInput style={styles.input} placeholder="????????????????????????????????????" multiline
                            numberOfLines={4} value={symptom} onChangeText={setSymptom} />
                        <Text style={styles.label}>??????????????????????????????</Text>
                        <TextInput style={styles.input} placeholder="??????????????????????????????" multiline
                            numberOfLines={4} value={result} onChangeText={setResult} />
                        <Text style={styles.label}>????????????????????????????????????</Text>
                        <TextInput style={styles.input} placeholder="????????????????????????????????????" multiline
                            numberOfLines={4} value={advice} onChangeText={setAdvice} />
                        <Text style={styles.label}>?????? ???????????????????????????</Text>
                        <TextInput style={styles.input} placeholder="?????? ???????????????????????????" multiline
                            numberOfLines={4} value={medic} onChangeText={setMedic} />
                    </KeyboardAwareScrollView>

                    <TouchableOpacity style={{ ...styles.btn }} onPress={() => {
                        postHistory()

                    }}>
                        <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>??????????????????</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback >


        </ScrollView >
    )
}

export default Patient

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
        transform: [{ translateY: RFPercentage(22) }],
        width: wp('80%'),
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

    },
    input: {
        fontFamily: 'Kanit',
        color: 'white',
        fontSize: 18,
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
        fontFamily: 'Kanit',
        marginTop: RFPercentage(2)
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
