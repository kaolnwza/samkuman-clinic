import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Btn from '../components/Button';
import axios from 'axios'
import { RFPercentage } from 'react-native-responsive-fontsize';


const login = ({ navigation }) => {
    const [usernameLogin, setUsernameLogin] = useState("12345678912346")
    const [passwordLogin, setPasswordLogin] = useState("12345")

    const testLogin = () => {
        console.log(usernameLogin, passwordLogin);
        postData()
    }
    const local = "http://192.168.1.32:12345"

    const instance = axios.create({
        withCredentials: true
    })


    const getTest = async () => {
        const data = {
            user_id: 0
        }

        await axios.get(`${local}/gethistory`, data)
            .then((res) => {
                console.log('sdf')
            })
    }

    const postData = async () => {
        const headers = {
            "Content-Type": "application/json",
        };
        console.log("prayuth");
        console.log("prayuth");
        console.log("send");
        const data = {
            identity_number: usernameLogin,
            password: passwordLogin
        }
        await instance
            .post(local + "/login", data)
            .then((res) => {
                console.log(res.data)
            }
            )
        await instance.get(local + "/getcookie")
            .then(res =>
                console.log(res.data)
            )

    }

    const Logout = async () => {
        await instance
            .get(local + "/logout")
            .then((res) => {
                console.log(res.data);
            })
    }

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
            <KeyboardAwareScrollView style={styles.containerinput} viewIsInsideTabBar={true} extraScrollHeight={-40}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} placeholder="username" value={usernameLogin} />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="password" value={passwordLogin} secureTextEntry={true} />
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }}
                        onPress={() => {
                            navigation.navigate("signup")
                        }}
                    >
                        <Text style={{ color: '#007AFF' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            {/* <Btn navigation={navigation} label='LOGIN' color='#f9be7c' to='main' /> */}
            <TouchableOpacity style={{ ...styles.btn, ...{ backgroundColor: '#f9be7c' } }} onPress={() => {
                //navigation.replace('main')
                postData()
            }}>
                <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Poppins', color: '#333333', alignSelf: 'center' }}>LOGIN</Text>
            </TouchableOpacity>
        </View >
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF9EC',
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
        top: hp('20%'),
        color: '#FFF9EC',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        marginLeft: 10
    },
    btn: {
        marginBottom: hp('5%'),
        marginTop: hp('3%'),

        fontFamily: 'Poppins',
        alignSelf: 'center',
        backgroundColor: '#f9be7c',
        width: wp('80%'),
        paddingVertical: 10,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    }

})
