import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import Bg from '../components/Pagebg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons } from '@expo/vector-icons';
import { useValidation } from 'react-native-form-validator';
import InfoBox from '../components/InfoBox';
import InfoHalfBox from '../components/InfoHalfBox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import Moment from 'moment';

// import { TextInput } from 'react-native-paper';
import axios from "axios"


const Profile = (props, { navigation }) => {
    const userinfo = props.route.params.userInfo
    const [Edit, setEdit] = React.useState(false);

    const [Firstname, setFirstname] = React.useState(userinfo.firstname);
    const [Lastname, setLastname] = React.useState(userinfo.lastname);
    const [DOB, setDOB] = React.useState(new Date(userinfo.dob));
    const [gender, setGender] = React.useState(userinfo.gender);
    const [Address, setAddress] = React.useState(userinfo.address);
    const [Phone, setPhone] = React.useState(userinfo.phone_number);
    const [Height, setHeight] = React.useState(userinfo.height);
    const [Weight, setWeight] = React.useState(userinfo.weight);
    const [Alllergic, setAllergic] = React.useState(userinfo.allergic);
    const [Disease, setDisease] = React.useState(userinfo.disease);
    const [Id, setId] = React.useState(userinfo.identity_number);
    const [Email, setEmail] = React.useState(userinfo.email);
    const [OPass, setOPass] = React.useState('');
    const [NPass, setNPass] = React.useState('');
    const [Cpass, setCpass] = React.useState('');
    const [changePass, setChangePass] = React.useState(false);



    const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } =
        useValidation({
            state: {
                Firstname,
                Lastname,
                DOB,
                gender,
                Address,
                Phone,
                Height,
                Weight,
                Alllergic,
                Disease,
                Id,
                Email,
                OPass,
                NPass,
                Cpass
            },

        });


    const Info = () => {
        validate({
            Firstname: { required: true },
            Lastname: { required: true },
            DOB: { required: true, date: true },
            gender: { required: true },
            Address: { required: true },
            Phone: { required: true, numbers: true, minlength: 10, maxlength: 10 },
            Height: { required: true, numbers: true },
            Weight: { required: true, numbers: true },
            Id: { required: true, numbers: true, minlength: 13, maxlength: 13 },
            Email: { required: true, email: true },
            // OPass: { required: true, hasNumber: true, hasUpperCase: true, hasLowerCase: true },
            // NPass: { required: true, hasNumber: true, hasUpperCase: true, hasLowerCase: true },
            // Cpass: { required: true, equalPassword: NPass },

        });
        console.log(isFormValid())
    };

    const Pass = () => {
        validate({
            OPass: { required: true, hasNumber: true, hasUpperCase: true, hasLowerCase: true },
            NPass: { required: true, hasNumber: true, hasUpperCase: true, hasLowerCase: true },
            Cpass: { required: true, equalPassword: NPass },

        });
        console.log(isFormValid())
    };



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDOB(currentDate);
    };
    return (
        <View style={styles.container}>

            <Bg Text1='ข้อมูลผู้ใช้' />
            <View style={styles.position}>
                {/* <Text>{console.log(new Date())}</Text> */}
                {!Edit ?
                    <InfoBox f={userinfo.firstname} m={userinfo.lastname} icon='person' titleTop='ชื่อ' titleMid='นามสกุล' />
                    :
                    <View style={styles.box}>
                        <View style={{ width: '90%', }}>
                            <Text style={styles.label}>ชื่อ</Text>
                            <TextInput style={styles.input} placeholder="ชื่อ" value={Firstname} onChangeText={setFirstname} />
                            {isFieldInError('Firstname') &&
                                getErrorsInField('Firstname').map(errorMessage => (
                                    <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                ))}
                            <Text style={styles.label}>นามสกุล</Text>
                            <TextInput style={styles.input} placeholder="นามสกุล" value={Lastname} onChangeText={setLastname} />
                            {isFieldInError('Lastname') &&
                                getErrorsInField('Lastname').map(errorMessage => (
                                    <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                ))}
                        </View>
                    </View>
                }

                <KeyboardAwareScrollView style={{ marginTop: RFPercentage(1), height: hp('42%') }} extraScrollHeight={-100}>
                    {!Edit ?
                        <InfoHalfBox titleL='วันเกิด' infoL={Moment(userinfo.dob).format('L')} colorL='#309397' titleR='เพศ' infoR={userinfo.gender} colorR='#e46472' iconL='birthday-cake' iconR='transgender' />
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ ...styles.boxH, backgroundColor: '#309397' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ width: '100%' }}>
                                        <Text style={styles.label}>วันเกิด</Text>
                                        <DateTimePicker
                                            style={{ width: 100, fontSize: RFPercentage(2) }}
                                            testID="dateTimePicker"
                                            value={DOB}
                                            mode="date"
                                            display="default"
                                            onChange={onChange}
                                            themeVariant="light"
                                            textColor="white"
                                        />
                                        {isFieldInError('DOB') &&
                                            getErrorsInField('DOB').map(errorMessage => (
                                                <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                            ))}
                                    </View>

                                </View>
                            </View>
                            <View style={{ ...styles.boxH, backgroundColor: '#e46472' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.label}>เพศ</Text>
                                    <RadioButton.Group onValueChange={x => setGender(x)} value={gender}>
                                        <RadioButton.Item label="ผู้ชาย" labelStyle={{ fontFamily: 'Kanit', width: '70%', fontSize: RFPercentage(2) }} value="ชาย" />
                                        <RadioButton.Item label="ผู้หญิง" labelStyle={{ fontFamily: 'Kanit', fontSize: RFPercentage(2) }} value="หญิง" />
                                    </RadioButton.Group>
                                    {isFieldInError('gender') &&
                                        getErrorsInField('gender').map(errorMessage => (
                                            <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                        ))}
                                </View>
                            </View>
                        </View>

                    }
                    {!Edit ?

                        <InfoHalfBox titleL='ที่อยู่' infoL={userinfo.address} colorL='#f9be7c' titleR='เบอร์โทรศัพท์' infoR={userinfo.phone_number} colorR='#309397' iconL='address-book' iconR='phone' />
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ ...styles.boxH, backgroundColor: '#f9be7c' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ width: '100%' }}>
                                        <Text style={styles.label}>ที่อยู่</Text>
                                        {/* <TextInput style={styles.inputH} placeholder="ที่อยู่" value={Address} onChangeText={setAddress} /> */}
                                        <TextInput style={styles.inputA} placeholder="ที่อยู่" multiline
                                            numberOfLines={4}
                                            value={Address}
                                            onChangeText={setAddress} />
                                        {isFieldInError('Address') &&
                                            getErrorsInField('Address').map(errorMessage => (
                                                <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                            ))}
                                    </View>

                                </View>
                            </View>
                            <View style={{ ...styles.boxH, backgroundColor: '#309397' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.label}>เบอร์โทรศัพท์</Text>
                                    <TextInput style={styles.inputH} placeholder="เบอร์โทรศัพท์" keyboardType='phone-pad' value={Phone} onChangeText={setPhone} />
                                    {isFieldInError('Phone') &&
                                        getErrorsInField('Phone').map(errorMessage => (
                                            <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                        ))}
                                </View>
                            </View>
                        </View>
                    }
                    {!Edit ?
                        <InfoHalfBox titleL='ส่วนสูง' infoL={userinfo.height} colorL='#e46472' titleR='น้ำหนัก' infoR={userinfo.weight} colorR='#f9be7c' iconL='arrows-alt-h' iconR='arrows-alt-v' />
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ ...styles.boxH, backgroundColor: '#e46472' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ width: '100%' }}>
                                        <Text style={styles.label}>ส่วนสูง</Text>
                                        <TextInput style={styles.inputH} placeholder="ส่วนสูง" keyboardType='decimal-pad' value={Height.toString()} onChangeText={setHeight} />
                                        {isFieldInError('Height') &&
                                            getErrorsInField('Height').map(errorMessage => (
                                                <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                            ))}
                                    </View>

                                </View>
                            </View>
                            <View style={{ ...styles.boxH, backgroundColor: '#f9be7c' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.label}>น้ำหนัก</Text>
                                    <TextInput style={styles.inputH} placeholder="น้ำหนัก" keyboardType='decimal-pad' value={Weight.toString()} onChangeText={setWeight} />
                                    {isFieldInError('Weight') &&
                                        getErrorsInField('Weight').map(errorMessage => (
                                            <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                        ))}
                                </View>
                            </View>
                        </View>
                    }
                    {!Edit ?
                        <InfoHalfBox titleL='การแพ้' infoL={userinfo.allergic !== '' ? userinfo.allergic : '-'} colorL='#309397' iconL='allergies' titleR='โรคประจำตัว' infoR={userinfo.disease !== '' ? userinfo.disease : '-'} colorR='#e46472' iconR='disease' />
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ ...styles.boxH, backgroundColor: '#309397' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ width: '100%' }}>
                                        <Text style={styles.label}>การแพ้</Text>
                                        <TextInput style={styles.inputH} placeholder="การแพ้" value={Alllergic} onChangeText={setAllergic} />

                                    </View>

                                </View>
                            </View>
                            <View style={{ ...styles.boxH, backgroundColor: '#e46472' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={styles.label}>โรคประจำตัว</Text>
                                    <TextInput style={styles.inputH} placeholder="โรคประจำตัว" value={Disease} onChangeText={setDisease} />

                                </View>
                            </View>
                        </View>
                    }
                    {!Edit ?
                        <InfoBox titleTop='ID' titleMid='อีเมล' f={userinfo.identity_number} m={userinfo.email} icon='alternate-email' />

                        :
                        <View style={styles.box}>
                            <View style={{ width: '90%', }}>
                                <Text style={styles.label}>ID</Text>
                                <TextInput style={styles.input} placeholder="ID" value={Id} onChangeText={setId} />
                                {isFieldInError('Id') &&
                                    getErrorsInField('Id').map(errorMessage => (
                                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                    ))}
                                <Text style={styles.label}>อีเมล</Text>
                                <TextInput style={styles.input} placeholder="อีเมล" value={Email} onChangeText={setEmail} />
                                {isFieldInError('Email') &&
                                    getErrorsInField('Email').map(errorMessage => (
                                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                    ))}
                            </View>

                        </View>
                    }


                    {changePass ?
                        <View style={{ ...styles.box, backgroundColor: '#309397' }}>
                            <View style={{ width: '90%', }}>
                                <Text style={styles.label}>รหัสเก่า</Text>
                                <TextInput style={styles.input} placeholder="รหัสเก่า" value={OPass} onChangeText={setOPass} />
                                {isFieldInError('OPass') &&
                                    getErrorsInField('OPass').map(errorMessage => (
                                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                    ))}
                                <Text style={styles.label}>รหัสใหม่</Text>
                                <TextInput style={styles.input} placeholder="รหัสใหม่" value={NPass} onChangeText={setNPass} />
                                {isFieldInError('NPass') &&
                                    getErrorsInField('NPass').map(errorMessage => (
                                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                    ))}
                                <Text style={styles.label}>ยืนยันรหัสใหม่</Text>
                                <TextInput style={styles.input} placeholder="ยืนยันรหัสใหม่" value={Cpass} onChangeText={setCpass} />
                                {isFieldInError('Cpass') &&
                                    getErrorsInField('Cpass').map(errorMessage => (
                                        <Text style={styles.warn} key={errorMessage}>{errorMessage}</Text>
                                    ))}
                            </View>
                        </View> :
                        null
                    }

                    {!changePass ?
                        <TouchableOpacity style={{ ...styles.btn, ...{ backgroundColor: '#e46472' } }} onPress={() => {
                            setChangePass(true)
                        }}>
                            <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>เปลี่ยนรหัสผ่าน</Text>
                        </TouchableOpacity>
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity style={{ ...styles.btnH, ...{ backgroundColor: '#e46472' } }} onPress={() => {
                                setOPass('')
                                setNPass('')
                                setCpass('')
                                setChangePass(false)


                            }}>
                                <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>ยกเลิก</Text>
                            </TouchableOpacity><TouchableOpacity style={{ ...styles.btnH, ...{ backgroundColor: '#309397' } }} onPress={() => {
                                Pass()
                            }}>
                                <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>บันทึก</Text>
                            </TouchableOpacity>
                        </View>
                    }




                </KeyboardAwareScrollView>
                {Edit == false ?
                    <TouchableOpacity style={{ ...styles.btn, ...{ backgroundColor: '#f9be7c' } }} onPress={() => {
                        setEdit(true)
                    }}>
                        <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>แก้ไข</Text>
                    </TouchableOpacity>
                    :
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity style={{ ...styles.btnH, ...{ backgroundColor: '#e46472' } }} onPress={() => {

                            setFirstname(userinfo.firstname)
                            setLastname(userinfo.lastname)
                            setDOB(new Date(userinfo.dob))
                            setGender(userinfo.gender)
                            setAddress(userinfo.address)
                            setPhone(userinfo.phone_number)
                            setHeight(userinfo.height)
                            setWeight(userinfo.weight)
                            setAllergic(userinfo.allergic)
                            setDisease(userinfo.disease)
                            setId(userinfo.identity_number)
                            setEmail(userinfo.email)
                            setEdit(false)


                        }}>
                            <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>ยกเลิก</Text>
                        </TouchableOpacity><TouchableOpacity style={{ ...styles.btnH, ...{ backgroundColor: '#309397' } }} onPress={() => {
                            Info()
                        }}>
                            <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Kanit', alignSelf: 'center' }}>บันทึก</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
    position: {
        flexDirection: 'column',
        alignSelf: 'center',
        position: 'absolute',
        transform: [{ translateY: RFPercentage(25) }]
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
    btnH: {
        marginBottom: hp('5%'),
        marginTop: hp('3%'),

        fontFamily: 'Poppins',
        alignSelf: 'center',
        width: wp('39%'),
        paddingVertical: 10,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
    profile: {
        shadowColor: "#000",
        shadowOffset: { height: 5, width: 2 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
    box: {
        marginTop: RFPercentage(1),
        backgroundColor: '#f9be7c',
        flexDirection: 'row',
        borderRadius: RFPercentage(4.5),
        width: wp('80%'),
        justifyContent: 'center',
        paddingHorizontal: RFPercentage(2),
        padding: RFPercentage(1.1),

        paddingBottom: RFPercentage(1.5),
        alignItems: 'center'
    },
    info: {
        margin: RFPercentage(1),
        fontFamily: 'Kanit',
        fontSize: RFPercentage(2),
    },
    infoH: {
        fontFamily: 'Kanit',
        fontSize: RFPercentage(2),

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { height: 5, width: 2 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
    },
    boxH: {
        marginTop: RFPercentage(1),
        backgroundColor: '#f9be7c',
        borderRadius: RFPercentage(4.5),
        width: wp('38%'),
        height: hp('20%'),
        padding: RFPercentage(1),
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputA: {
        fontSize: 18,
        width: wp('30%'),
        padding: 10,
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
        fontFamily: 'Kanit',
        textAlign: 'center'
    },
    inputH: {
        fontSize: 18,
        width: wp('30%'),
        height: hp('5%'),
        padding: 10,
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
        fontFamily: 'Kanit',
        textAlign: 'center'
    },
    input: {
        fontSize: 18,
        height: hp('5%'),
        padding: 10,
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: { height: 7, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 3,
        fontFamily: 'Kanit',
        textAlign: 'center'

    },
    label: {
        textAlign: 'center',
        fontSize: RFPercentage(2),
        fontFamily: 'Kanit',
    },
    warn: {
        color: 'red',
        fontFamily: 'Poppins',
        textAlign: 'center'
    }
})
