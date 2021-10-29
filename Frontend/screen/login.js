import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';

const login = () => {
    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
    });
    if (!loaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <View style={styles.image, styles.im3}>
                <Image source={require('../assets/normal_u12.png')} />
            </View>
            <View style={styles.image, styles.im2}>
                <Image source={require('../assets/normal_u13.png')} />
            </View>
            <View style={styles.image}>
                <Image source={require('../assets/normal_u15.png')} />
            </View>
            <Text style={styles.header}>SIGN IN
                <FontAwesome name="sign-in" size={50} color="white" />
            </Text>

            <TextInput style={styles.input} placeholder="username" />
            <TextInput style={styles.input} placeholder="password" />
            <View>
                <TouchableOpacity style={styles.btn} >
                    <Text style={{ fontSize: 30, fontFamily: 'Poppins', color: '#333333' }}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,


    },
    image: {
        flex: 1,
        justifyContent: "center",
        transform: [{ translateX: "-80%" }, { translateY: "-25%" }],
        position: 'absolute'
    },
    im2: {
        transform: [{ translateX: "-150%" }, { translateY: "-30%" }],
        justifyContent: "center"
    },
    im3: {
        transform: [{ translateX: "30%" }, { translateY: "-150%" }],
        position: 'absolute'
    },
    header: {
        position: "absolute",
        fontSize: 50,
        top: 200,
        color: 'white',
        fontFamily: 'Poppins',
        fontWeight: '900',
        marginLeft: 10
    },
    btn: {
        fontFamily: 'Poppins',
        alignSelf: 'center',
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
