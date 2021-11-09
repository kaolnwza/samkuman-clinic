import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Btn from '../components/Button';

const Reserve = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState("java");
    return (
        <View style={styles.container}>
            <Bg Text1='Reservation' />
            <View style={styles.position}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ width: wp('80%'), }}
                    itemStyle={{ color: 'white' }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="qwe" value="1" />
                    <Picker.Item label="asd" value="2" />
                    <Picker.Item label="zxc" value="3" />

                </Picker>
                <Text style={styles.label}>Symtom</Text>
                <TextInput style={styles.input} placeholder="username" />

                <Btn navigation={navigation} label='CONFIRM' color='#309397' />
            </View>
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
        color: 'white',
        fontSize: 18,
        height: hp('10%'),
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
        fontSize: RFPercentage(2),
    },
})
