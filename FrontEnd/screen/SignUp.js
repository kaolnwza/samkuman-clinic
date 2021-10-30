import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
const SignUp = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.image, styles.im3}>
                    <Image source={require('../assets/normal_u1.png')} />
                </View>
                <View style={styles.image, styles.im2}>
                    <Image source={require('../assets/normal_u2.png')} />
                </View>
                <View style={styles.image}>
                    <Image source={require('../assets/normal_u3.png')} />
                </View>
                <Text style={styles.headerText}>SIGN UP
                    <FontAwesome name="user" size={50} color="#0d253f" />
                </Text>
            </View>
            <View style={{ flex: 1, position: 'absolute', alignSelf: "center", bottom: 0, paddingBottom: "20%" }}>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    navigation.navigate("login")
                }}>
                    <Text style={{ fontSize: 30, fontFamily: 'Poppins', color: '#333333' }}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF9EC',
    },
    header: {
        transform: [{ translateY: "0%" }]
    },
    image: {
        justifyContent: "center",
        transform: [{ translateX: "-80%" }, { translateY: "-25%" }],
        position: 'absolute'
    },
    im2: {
        transform: [{ translateX: "-60%" }, { translateY: "-30%" }],
        justifyContent: "center"
    },
    im3: {
        transform: [{ translateX: "-150%" }, { translateY: "450%" }],
        position: 'absolute'
    },
    headerText: {
        position: "absolute",
        fontSize: 50,
        top: 100,
        color: '#0d253f',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        marginLeft: 10
    },
    btn: {
        fontFamily: 'Poppins',
        backgroundColor: '#f9be7c',
        paddingHorizontal: 70,
        paddingVertical: 10,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    }
})
