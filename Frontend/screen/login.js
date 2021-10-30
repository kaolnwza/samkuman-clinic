import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
            <View style={styles.header}>
                <View style={styles.image, styles.im3}>
                    <Image source={require('../assets/normal_u12.png')} />
                </View>
                <View style={styles.image, styles.im2}>
                    <Image source={require('../assets/normal_u13.png')} />
                </View>
                <View style={styles.image}>
                    <Image source={require('../assets/normal_u15.png')} />
                </View>
                <Text style={styles.headerText}>SIGN IN
                    <FontAwesome name="sign-in" size={50} color="white" />
                </Text>
            </View>
            <KeyboardAwareScrollView style={styles.containerinput} viewIsInsideTabBar={true} extraScrollHeight={-50}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} placeholder="username" />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="password" secureTextEntry={true} />
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }}
                        onPress={() => {
                            console.warn("sign up")
                        }}
                    >
                        <Text style={{ color: '#007AFF' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            <View style={{ justifyContent: "flex-end", paddingBottom: "20%" }}
            >
                <TouchableOpacity style={styles.btn} onPress={() => {
                    console.warn("login")
                }}>
                    <Text style={{ fontSize: 30, fontFamily: 'Poppins', color: '#333333' }}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    containerinput: {
        flex: 1,
        paddingHorizontal: "12%",
        fontFamily: 'Poppins',
    },
    input: {
        fontSize: 18,
        height: 40,
        padding: 10,
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
    label: {
        fontSize: 15,
        marginTop: 20
    },
    header: {
        transform: [{ translateY: "20%" }]
    },
    image: {
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
    headerText: {
        position: "absolute",
        fontSize: 50,
        top: 200,
        color: 'white',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
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
