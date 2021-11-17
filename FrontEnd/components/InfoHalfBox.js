import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const InfoHalfBox = (props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ ...styles.boxH, backgroundColor: props.colorL }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <FontAwesome5 style={styles.shadow} name={props.iconL} size={RFPercentage(7)} color="#0d253f" />
                    <Text style={styles.infoH}>{props.titleL} :</Text>
                    <Text style={styles.infoH}>{props.infoL}</Text>

                </View>
            </View>
            <View style={{ ...styles.boxH, backgroundColor: props.colorR }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>

                    <FontAwesome5 style={styles.shadow} name={props.iconR} size={RFPercentage(7)} color="#0d253f" />
                    <Text style={styles.infoH}>{props.titleR} :</Text>
                    <Text style={styles.infoH}>{props.infoR}</Text>
                </View>
            </View>

        </View>
    )
}

export default InfoHalfBox

const styles = StyleSheet.create({
    infoH: {
        fontFamily: 'Kanit',
        fontSize: RFPercentage(2),

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { height: 5, width: 2 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
    boxH: {
        marginTop: RFPercentage(1),
        backgroundColor: '#f9be7c',
        borderRadius: RFPercentage(4.5),
        width: wp('38%'),
        height: hp('20%'),
        padding: RFPercentage(1),
        alignItems: 'center',
        justifyContent: 'center'
    },
})
