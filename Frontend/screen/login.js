import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Btn from '../components/Button';

const login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
                <TextInput style={styles.input} placeholder="username" value={username} />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="password" value={password} secureTextEntry={true} />
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
            <Btn navigation={navigation} label='LOGIN' color='#f9be7c' to='main' />
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

})
