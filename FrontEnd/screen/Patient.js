import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import Bg from '../components/Pagebg'
import * as Device from 'expo-device';
import moment from 'moment';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



const Patient = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };
    return (
        <View style={styles.container}>
            <Bg Text1='Patient Managemant' />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.position}>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                    }} style={{ backgroundColor: '#f9be7c', borderRadius: RFPercentage(5), alignSelf: 'center', paddingHorizontal: RFPercentage(2), paddingVertical: RFPercentage(1) }}>
                        <Text style={{ fontFamily: 'Poppins', padding: RFPercentage(1), alignSelf: 'center' }}>Next Appontment</Text>
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
                                        <Text style={styles.textStyle}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Text style={{ ...styles.label, alignSelf: 'center' }}>{moment(date).format('LLL')}</Text>
                    <KeyboardAwareScrollView style={{ height: hp('44%'), marginTop: RFPercentage(5) }}>
                        <Text style={styles.label}>Symtom</Text>

                        <TextInput style={styles.input} placeholder="Petient Symtom" multiline
                            numberOfLines={4} />
                        <Text style={styles.label}>Diagnose</Text>

                        <TextInput style={styles.input} placeholder="Petient Diagnose" multiline
                            numberOfLines={4} />
                        <Text style={styles.label}>Doctor Advice</Text>

                        <TextInput style={styles.input} placeholder="Advice" multiline
                            numberOfLines={4} />
                        <Text style={styles.label}>Medicine</Text>

                        <TextInput style={styles.input} placeholder="Medicine" multiline
                            numberOfLines={4} />
                        <Text style={styles.label}>How to use</Text>

                        <TextInput style={styles.input} placeholder="How to use Medicine" multiline
                            numberOfLines={4} />
                    </KeyboardAwareScrollView>

                </View>
            </TouchableWithoutFeedback >


        </View >
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
        fontFamily: 'Poppins',
        marginTop: RFPercentage(2)
    },
})
