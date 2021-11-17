import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts } from 'expo-font';



const GridInformation = (props) => {
    
    return (
        <View style={{ ...styles.contentItem, ...{ backgroundColor: props.color } }}>
            <KeyboardAwareScrollView>
                <Text style={{ margin: RFPercentage(2), fontFamily: 'Kanit', fontSize: RFPercentage(3) }}>{props.title}</Text>
            </KeyboardAwareScrollView>

            <KeyboardAwareScrollView>
                <Text style={{ fontFamily: 'Kanit', marginHorizontal: RFPercentage(4), marginBottom: RFPercentage(2) }}>{props.info}</Text>
            </KeyboardAwareScrollView>
        </View >

    )
}

export default GridInformation

const styles = StyleSheet.create({
    contentItem: {
        height: hp('25%'),
        marginVertical: hp('3%'),
        borderRadius: RFPercentage(5),
    }
})
