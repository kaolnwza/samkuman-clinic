import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import * as Device from 'expo-device';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useValidation } from 'react-native-form-validator';
import axios from 'axios';

const SignUp = ({ navigation }) => {
    const [value, setValue] = React.useState('first');
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const [identityNumber, setIdentityNumber] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [date, setDate] = useState(new Date());
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [allergic, setAllergic] = useState('');
    const [disease, setDisease] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } =
        useValidation({
            state: {
                identityNumber,
                firstname,
                lastname,
                address,
                phone,
                email,
                height,
                weight,
                allergic,
                disease,
                password,
                confirmPassword,
                gender
            },

        });

    const _onPressButton = () => {
        validate({
            identityNumber: { required: true, numbers: true, minlength: 13, maxlength: 13 },
            firstname: { required: true },
            lastname: { required: true },
            address: { required: true },
            phone: { required: true, numbers: true, minlength: 10, maxlength: 10 },
            height: { required: true, numbers: true },
            weight: { required: true, numbers: true },
            email: { required: true, email: true, },
            date: { required: true },
            password: { required: true, hasNumber: true, hasUpperCase: true, hasLowerCase: true },
            confirmPassword: { required: true, equalPassword: password },
            gender: { required: true }
        });
        if (isFormValid()) {
            signupPost()

        } else {
            console.log(isFormValid())
        }
    };

    const signupPost = async () => {
        var data = {
            identity_number: identityNumber,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            height: parseInt(height),
            weight: parseFloat(weight),
            dob: date,
            // age: age,
            address: address,
            phone_number: phone,
            allergic: allergic,
            disease: disease,
            email: email,
            password: password
        }

        await axios.post(global.local + "/signup", data)
            .then(res => {
                console.log(res.data);
                if (res.data == "already_email") {
                    alert("????????????????????????????????????????????????????????????????????????????????????")


                }
                else {
                    navigation.replace('login')
                }
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={[Device.osName === 'iPadOS' ? styles.im3Ipad : styles.im3]}>
                    <Image source={require('../assets/normal_u1.png')} />
                </View>
                <View style={[Device.osName === 'iPadOS' ? styles.im2Ipad : styles.im2]}>
                    <Image source={require('../assets/normal_u2.png')} />
                </View>
                <View style={[Device.osName === 'iPadOS' ? styles.imageIpad : styles.image]}>
                    <Image source={require('../assets/normal_u3.png')} />
                </View>
                <Text style={styles.headerText}>???????????????????????????
                    <FontAwesome name="user" size={50} color="#0d253f" />
                </Text>
            </View>
            <KeyboardAwareScrollView style={styles.containerInput}
                viewIsInsideTabBar={false} extraScrollHeight={-130}>
                <Text style={styles.label}>????????????????????????????????????????????????????????? </Text>
                <TextInput style={styles.input} placeholder="?????????????????????????????????????????????????????????" value={identityNumber} onChangeText={setIdentityNumber} />
                {isFieldInError('identityNumber') &&
                    getErrorsInField('identityNumber').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.label}>???????????? </Text>
                <TextInput style={styles.input} placeholder="????????????" value={firstname} onChangeText={setFirstname} />
                {isFieldInError('firstname') &&
                    getErrorsInField('firstname').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.label}>?????????????????????</Text>
                <TextInput style={styles.input} placeholder="?????????????????????" value={lastname} onChangeText={setLastname} />
                {isFieldInError('lastname') &&
                    getErrorsInField('lastname').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}
                <View style={{
                    flexDirection: 'row', flex: 1, alignContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#FFF9EC',
                }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>?????????????????????</Text>
                        <DateTimePicker
                            style={{ marginRight: 15, marginTop: 10 }}
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                            themeVariant="dark"
                            textColor="white"
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>?????????</Text>
                        <RadioButton.Group onValueChange={x => setGender(x)} value={gender}>
                            <RadioButton.Item label="??????????????????" labelStyle={{ color: "#FFF9EC", fontFamily: 'Kanit' }} value="?????????" />
                            <RadioButton.Item label="?????????????????????" labelStyle={{ color: "#FFF9EC", fontFamily: 'Kanit' }} value="????????????" />
                        </RadioButton.Group>
                    </View>
                </View>
                {isFieldInError('gender') &&
                    getErrorsInField('gender').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.label}>?????????????????????</Text>
                <TextInput style={styles.input} placeholder="?????????????????????" value={address} onChangeText={setAddress} />
                {isFieldInError('address') &&
                    getErrorsInField('address').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.label}>???????????????????????????????????????</Text>
                <TextInput style={styles.input} placeholder="???????????????????????????????????????" keyboardType='phone-pad' value={phone} onChangeText={setPhone} />
                {isFieldInError('phone') &&
                    getErrorsInField('phone').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, marginRight: 5 }}>
                        <Text style={styles.label}>????????????????????? </Text>
                        <TextInput style={styles.input} placeholder="?????????????????????" keyboardType='decimal-pad' value={height} onChangeText={setHeight} />
                        {isFieldInError('height') &&
                            getErrorsInField('height').map(errorMessage => (
                                <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                            ))}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>?????????????????????</Text>
                        <TextInput style={styles.input} placeholder="?????????????????????" keyboardType='decimal-pad' value={weight} onChangeText={setWeight} />
                        {isFieldInError('weight') &&
                            getErrorsInField('weight').map(errorMessage => (
                                <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                            ))}
                    </View>
                </View>
                <Text style={styles.label}>?????? ?????????????????????????????????????????? (??????????????????????????????????????????????????????)</Text>
                <TextInput style={styles.input} placeholder="?????? ??????????????????????????????????????????" value={allergic} onChangeText={setAllergic} />
                {isFieldInError('allergic') &&
                    getErrorsInField('allergic').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.label}>????????????????????????????????? (??????????????????????????????????????????????????????)</Text>
                <TextInput style={styles.input} placeholder="?????????????????????????????????" value={disease} onChangeText={setDisease} />
                <Text style={styles.label}>???????????????</Text>
                <TextInput style={styles.input} placeholder="???????????????" keyboardType='email-address' value={email} onChangeText={setEmail} />
                {isFieldInError('email') &&
                    getErrorsInField('email').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.label}>????????????????????????</Text>
                <TextInput style={styles.input} placeholder="????????????????????????" value={password} onChangeText={setPassword} />
                {isFieldInError('password') &&
                    getErrorsInField('password').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.label}>??????????????????????????????????????????</Text>
                <TextInput style={styles.input} placeholder="??????????????????????????????????????????" value={confirmPassword} onChangeText={setConfirmPassword} />
                {isFieldInError('confirmPassword') &&
                    getErrorsInField('confirmPassword').map(errorMessage => (
                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                    ))}

                <TouchableOpacity style={{ ...styles.btn, ...{ backgroundColor: '#f9be7c' } }} onPress={() => {

                    _onPressButton()
                }}>
                    <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', color: '#333333', alignSelf: 'center' }}>???????????????????????????</Text>
                </TouchableOpacity>

            </KeyboardAwareScrollView >

        </View >
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF9EC',
    },
    containerInput: {
        position: 'absolute', alignSelf: 'center', transform: [{ translateY: 250 }], width: wp('80%'), height: hp('53%')
    },
    input: {
        color: '#FFF9EC',
        fontSize: RFPercentage(2.2),
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF9EC',
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
        fontFamily: 'Kanit'
    },
    inputH: {
        color: '#FFF9EC',
        width: '100%',
        fontSize: 18,
        height: 40,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF9EC',
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
    label: {
        color: '#FFF9EC',
        fontSize: RFPercentage(2),
        marginTop: 20,
        fontFamily: 'Kanit'
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
    },

    header: {
        transform: [{ translateY: "0%" }]
    },
    image: {
        justifyContent: "center",
        transform: [{ translateX: "-80%" }, { translateY: "-25%" }],
        position: 'absolute'
    },
    imageIpad: {
        justifyContent: "center",
        transform: [{ translateX: "150%" }, { translateY: "-100%" }, { scale: 1.66 }],
        position: 'absolute'
    },
    im2Ipad: {
        transform: [{ translateX: "200%" }, { translateY: "30%" }, { scale: 1.75 }],
        justifyContent: "center"
    },
    im2: {
        transform: [{ translateX: "-60%" }, { translateY: "-30%" }],
        justifyContent: "center"
    },
    im3Ipad: {
        transform: [{ translateX: "200%" }, { translateY: "550%" }, { scale: 2 }],
        position: 'absolute'
    },
    im3: {
        transform: [{ translateX: "-150%" }, { translateY: "450%" }],
        position: 'absolute'
    },
    headerText: {
        position: "absolute",
        fontSize: RFPercentage(5),
        top: 100,
        color: '#0d253f',
        fontFamily: 'Kanit',
        fontWeight: 'bold',
        marginLeft: wp('8%')
    },
    warn: {
        color: 'red',
        fontFamily: 'Poppins'
    }

})
