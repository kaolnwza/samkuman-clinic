import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
const SignUp = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [value, setValue] = React.useState('first');
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

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
            <KeyboardAwareScrollView style={{ position: 'absolute', alignSelf: 'center', transform: [{ translateY: 250 }], width: '80%', height: '54%' }}
                viewIsInsideTabBar={true} extraScrollHeight={-40}>
                <Text style={styles.label}>First Name</Text>
                <TextInput style={styles.input} placeholder="First Name" />
                <Text style={styles.label}>Last Name</Text>
                <TextInput style={styles.input} placeholder="Last Name" />

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{
                        flexDirection: 'column', flex: 1, borderBottomWidth: 1,
                        borderBottomColor: '#FFF9EC', marginRight: 10,
                    }}>
                        <Text style={styles.label}>Day of Birth</Text>
                        <DateTimePicker
                            style={{ marginRight: '10%' }}
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display="default"
                            onChange={onChange}
                            themeVariant="dark"
                            textColor="white"
                        />
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.label}>Sex</Text>
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#FFF9EC' }}>
                                <Text style={{ color: '#FFF9EC', marginBottom: 10 }}>
                                    <RadioButton value="first" />
                                    Male
                                    <RadioButton value="second" />
                                    Female
                                </Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                </View>
            </KeyboardAwareScrollView>
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
    input: {
        color: '#FFF9EC',
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
