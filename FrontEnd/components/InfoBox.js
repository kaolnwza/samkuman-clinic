import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const InfoBox = (props) => {
    const [hide, setHide] = useState(true)

    return (
        <View style={styles.box}>
            <MaterialIcons name={props.icon} style={styles.profile} size={wp('18%')} color="#0d253f" />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={styles.info}>{props.titleTop}: {props.f}</Text>
                {props.m != null ? <Text style={styles.info}>{props.titleMid}: {props.m}</Text> : null}

            </View>

        </View>
    )
}

export default InfoBox

const styles = StyleSheet.create({
    profile: {
        shadowColor: "#000",
        shadowOffset: { height: 5, width: 2 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
    box: {
        marginTop: RFPercentage(1),
        backgroundColor: '#f9be7c',
        flexDirection: 'row',
        borderRadius: RFPercentage(4.5),
        height: hp('18%'),
        width: wp('80%'),
        justifyContent: 'center',
        padding: RFPercentage(2),
        alignItems: 'center'
    },
    info: {
        margin: RFPercentage(1),
        fontFamily: 'Kanit',
        fontSize: RFPercentage(2.2),
    },
})
