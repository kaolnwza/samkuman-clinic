import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const GridInformation = (props) => {
    return (
        <TouchableOpacity style={{ ...styles.contentItem, ...{ backgroundColor: props.color } }}>
            <Text style={{ margin: RFPercentage(2), fontFamily: 'Poppins', fontSize: RFPercentage(3) }}>{props.title}</Text>
            <Text style={{ fontFamily: 'Poppins', marginHorizontal: RFPercentage(2), marginBottom: RFPercentage(2) }}>{props.info}</Text>
        </TouchableOpacity >

    )
}

export default GridInformation

const styles = StyleSheet.create({
    contentItem: {
        marginVertical: hp('3%'),
        borderRadius: RFPercentage(5),
    }
})
