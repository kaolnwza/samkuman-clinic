import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import * as Device from 'expo-device';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Btn from '../components/Button';

const SignUp = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [value, setValue] = React.useState('first');
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const [identityNumber, setIdentityNumber] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);   
    const [allergic, setAllergic] = useState('');   
    const [disease, setDisease] = useState('');   
    const [username, setUsername] = useState('');   
    const [password, setPassword] = useState('');   
    const [confirmPassword, setConfirmPassword] = useState(''); 
    
    

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
                <Text style={styles.headerText}>SIGN UP
                    <FontAwesome name="user" size={50} color="#0d253f" />
                </Text>
            </View>
            <KeyboardAwareScrollView style={styles.containerInput}
                viewIsInsideTabBar={false} extraScrollHeight={-130}>
                <Text style={styles.label}>First Name</Text>
                <TextInput style={styles.input} placeholder="First Name" />
                <Text style={styles.label}>Last Name</Text>
                <TextInput style={styles.input} placeholder="Last Name" />
                <View style={{
                    flexDirection: 'row', flex: 1, alignContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#FFF9EC',
                }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Day of Birth</Text>
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
                        <Text style={styles.label}>Sex</Text>
                        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                            <RadioButton.Item label="Male" labelStyle={{ color: "#FFF9EC" }} value="first" />
                            <RadioButton.Item label="Female" labelStyle={{ color: "#FFF9EC" }} value="second" />
                        </RadioButton.Group>
                    </View>
                </View>
                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input} placeholder="address" />
                <Text style={styles.label}>Phone</Text>
                <TextInput style={styles.input} placeholder="Phone" keyboardType='phone-pad' />
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="Email" keyboardType='email-address' />
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, marginRight: 5 }}>
                        <Text style={styles.label}>Height</Text>
                        <TextInput style={styles.input} placeholder="Height" keyboardType='decimal-pad' />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Weight</Text>
                        <TextInput style={styles.input} placeholder="Weight" keyboardType='decimal-pad' />
                    </View>
                </View>
                <Text style={styles.label}>Allergic</Text>
                <TextInput style={styles.input} placeholder="Allergic" />
                <Text style={styles.label}>Congenital disease</Text>
                <TextInput style={styles.input} placeholder="Congenital disease" />
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input} placeholder="Username" />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="Password" />
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput style={styles.input} placeholder="Confirm Password" />
            </KeyboardAwareScrollView >
            <Btn navigation={navigation} label='SIGN UP' color='#f9be7c' to='login' />

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
        fontSize: 18,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF9EC',
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
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
        fontSize: 15,
        marginTop: 20
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
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        marginLeft: wp('8%')
    },

})
