import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Pagebg = (props) => {
    return (
        <View style={styles.header}>
            <View style={styles.image, styles.im2}>
                <Image source={require('../assets/normal_u5.png')} />
            </View>
            <View style={styles.image}>
                <Image source={require('../assets/normal_u4.png')} />
            </View>
            <View style={styles.Name}>
                <Text style={styles.FN}>{props.Text1}</Text>
                <Text style={styles.LN}>{props.Text2}</Text>
            </View>
        </View>
    )
}

export default Pagebg

const styles = StyleSheet.create({
    header: {
        transform: [{ translateY: "20%" }]
    },
    image: {
        justifyContent: "center",
        transform: [{ translateX: "-50%" }, { translateY: "-20%" }],
        position: 'absolute'
    },
    im2: {
        transform: [{ translateX: "-10%" }, { translateY: "-30%" }],
        justifyContent: "center"
    },
    Name: {
        position: 'absolute',
        right: 0,
        paddingTop: 30,
        paddingRight: 20
    },
    FN: {
        fontSize: 25,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#0d253f',

    },
    LN: {
        fontSize: 25,
        color: '#0d253f',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
    },

})
