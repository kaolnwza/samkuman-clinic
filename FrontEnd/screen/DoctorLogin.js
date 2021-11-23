import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Device from 'expo-device';
import axios from 'axios'
import { RFPercentage } from 'react-native-responsive-fontsize';


const login = ({ navigation }) => {
    const [Docmail, setDocmail] = useState("somchai@gmail.com")
    const [Docpass, setDocpass] = useState("12345")
    const [authen, setAuthen] = useState('')

    const doctorLogin = async () => {
        const instance = axios.create({
            withCredentials: true
        })

        const data = {
            doctor_email: "somchai@gmail.com",
            doctor_password: "12345"
        }


        await instance.post(global.local + "/doctorlogin", data)
            .then((res) => {
                //console.log(res.data)
                if (res.data == 'User not found') {
                    setAuthen(res.data)
                } else if (res.data == 'Incorrect Password') {
                    setAuthen(res.data)
                }
            }
            )

        await instance.get(global.local + "/doctorgetcookie")
            .then(res =>
                //console.log(res.data)
                navigation.replace('main', { role: 'Staff' })
            )



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
                <Text style={{ ...styles.headerText, marginTop: Device.osName == "iPadOS" ? hp('15%') : hp('18%') }}>เข้าสู่ระบบ
                    {'\n'}
                    <View>
                        <Text style={{
                            color: '#FFF9EC',
                            fontFamily: 'Kanit',
                            fontWeight: 'bold',
                            fontSize: RFPercentage(6),
                            marginLeft: 20
                        }}>เจ้าหน้าที่<FontAwesome name="sign-in" size={50} color="white" /></Text></View>

                </Text>

            </View>
            <KeyboardAwareScrollView style={styles.containerinput} viewIsInsideTabBar={true} extraScrollHeight={-40}>
                <Text style={styles.label}>อีเมล</Text>
                <TextInput style={styles.input} placeholder="โปรดระบุอีเมล" value={Docmail} onChangeText={setDocmail} />
                <Text style={styles.label}>รหัสผ่าน</Text>
                <TextInput style={styles.input} placeholder="โปรดใส่รหัสผ่าน" value={Docpass} onChangeText={setDocpass} secureTextEntry={true} />


            </KeyboardAwareScrollView>
            <Text style={{ color: 'red', fontFamily: 'Poppins', alignSelf: 'center' }}>{authen}</Text>

            <TouchableOpacity style={{ ...styles.btn, ...{ backgroundColor: '#f9be7c' } }} onPress={() => {
                doctorLogin()
            }}>
                <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>เข้าสู่ระบบ</Text>
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
        fontFamily: 'Kanit'
    },
    label: {
        fontSize: RFPercentage(2),
        marginTop: 20,
        fontFamily: 'Kanit'
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
        fontSize: RFPercentage(6),
        color: '#FFF9EC',
        fontFamily: 'Kanit',
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
