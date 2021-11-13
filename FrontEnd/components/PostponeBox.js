import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';

const PostponeBox = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const renderItem = ({ item }) => {

        return (

            <View style={styles.box}>
                <Text style={{ margin: RFPercentage(2), fontFamily: 'Poppins', fontSize: RFPercentage(3) }}>Next Appontment {date}</Text>
                <View style={{ marginHorizontal: RFPercentage(4), marginBottom: RFPercentage(1) }}>
                    <Text style={styles.detail}>Name : {item.name}</Text>
                    <Text style={styles.detail}>Doctor : {item.doctor}</Text>
                    <Text style={styles.detail}>Date : {item.date}</Text>
                    <Text style={styles.detail}>Time : {item.time}</Text>

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
                                    style={{ width: wp('50%') }}
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="date"
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
        marginVertical: RFPercentage(1)
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
        marginTop: 22
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
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonCancel: {
        backgroundColor: "#e46472",
    },
    buttonSave: {
        backgroundColor: "#309397",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'Poppins'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'Poppins'

    }
})
