import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Btn from '../components/Button';

const Reserve = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState("1");
    const [Day, setDay] = useState('W')
    return (
        <View style={styles.container}>
            <Bg Text1='Reservation' />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.position}>

                    <Text style={styles.label}>Doctor</Text>

                    <Picker
                        selectedValue={selectedValue}
                        style={{ width: wp('80%'), }}
                        itemStyle={{ color: 'white', fontFamily: 'Poppins' }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Normal" value="1" />
                        {Day === 'M' || 'TH' || 'W' ? <Picker.Item label="Eye" value="2" /> : null}
                        {Day === 'T' ? <Picker.Item label="Leg" value="2" /> : null}
                        {Day === 'W' ? <Picker.Item label="Testical" value="2" /> : null}
                        {Day === 'TH' ? <Picker.Item label="AssHole" value="2" /> : null}

                        {Day === 'F' ? <Picker.Item label="Dick" value="2" /> : null}



                    </Picker>
                    {/* <TextInput style={styles.input} placeholder="Please Elaborate" multiline
                    numberOfLines={4} /> */}


                    <View >
                        <Text style={styles.label}>Symtom</Text>

                        <TextInput style={styles.input} placeholder="Please Elaborate" multiline
                            numberOfLines={4} />
                    </View>
                    <View style={styles.queueBorder}>
                        <Text style={[styles.font1, { fontSize: RFPercentage(5) }]}>5</Text>
                    </View>
                    <Text style={[styles.font1, { fontSize: 20 }]}>Current Queue</Text>
                    {/* <Btn navigation={navigation} label='CONFIRM' color='#309397' /> */}
                    <TouchableOpacity style={{ ...styles.btn }} onPress={() => {
                        // navigation.replace(props.to)
                    }}>
                        <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Poppins', color: '#333333', alignSelf: 'center' }}>CONFIRM</Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>

        </View>
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
        fontFamily: 'Poppins'
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

        fontFamily: 'Poppins',
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
