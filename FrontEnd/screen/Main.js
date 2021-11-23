import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import Bg from '../components/Pagebg'
import { RFPercentage } from 'react-native-responsive-fontsize';
import Information from '../components/Information';
import { DataTable } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Main = ({ navigation }) => {
    const [Select, setSelect] = useState(true);
    let isMount = true
    const [news, setNews] = useState([])
    const [relation, setRelation] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        const getInformation = async () => {
            if (isMount) {
                console.log("info");
                const instance = axios.create({
                    withCredentials: true
                })
                await instance.get(global.local + "/getinformation")
                    .then(res => {
                        setNews(res.data)
                        // console.log(res.data)

                    })
                isMount = false
            }
        }
        return (
            getInformation()
        )
    }, [])

    useEffect(() => {
        const getPublicRelation = async () => {
            if (isMount) {
                console.log("public");

                const instance = axios.create({
                    withCredentials: true
                })
                await instance.get(global.local + "/getpublicrelation")
                    .then(res => {
                        setRelation(res.data)
                        // console.log(res.data)

                    })
                isMount = false
            }
        }
        return (
            getPublicRelation()
        )
    }, [])


    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}

            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <Bg Text1='หน้าหลัก' />
            <View style={styles.contentContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {
                        setSelect(true)
                    }} style={{ ...styles.tabSelect, backgroundColor: Select === true ? '#309397' : '#e46472' }} >
                        <Text style={styles.tabFont}>ข้อมูลข่าวสาร</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setSelect(false)
                    }} style={{ ...styles.tabSelect, backgroundColor: Select === false ? '#309397' : '#e46472' }} >
                        <Text style={styles.tabFont}>ตารางแพทย์</Text>
                    </TouchableOpacity>
                </View>
                {Select === true ? <SafeAreaView style={styles.content}>
                    <Information datalist={news} />
                </SafeAreaView>
                    :
                    <View style={{
                        height: hp('22%'),
                        marginVertical: hp('4.5%')
                    }}>
                        <ScrollView>
                            <DataTable style={{
                                backgroundColor: '#FFF9EC',
                                borderRadius: RFPercentage(5),
                                padding: RFPercentage(2),
                            }}>
                                <DataTable.Header >
                                    <DataTable.Title><Text style={styles.title}>วัน</Text></DataTable.Title>
                                    <DataTable.Title><Text style={styles.title}>เฉพาะทาง</Text></DataTable.Title>
                                    <DataTable.Title ><Text style={styles.title}>ชื่อเเพทย์</Text></DataTable.Title>
                                </DataTable.Header>

                                <DataTable.Row>
                                    <DataTable.Cell><Text style={styles.text}>จันทร์</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.text}>จิตแพทย์ </Text></DataTable.Cell>
                                    <DataTable.Cell ><Text style={styles.text}>แพทย์หญิงสมดี ไม่มีพิษภัย</Text></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.text}>สูตินารีเวช </Text></DataTable.Cell>
                                    <DataTable.Cell ><Text style={styles.text}>นายแพทย์สมหมาย  พิษภัยไม่มี</Text></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell><Text style={styles.text}>อังคาร</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.text}>ระบบทางเดินอาหาร</Text> </DataTable.Cell>
                                    <DataTable.Cell ><Text style={styles.text}>ดร.คิดดี มีใจใฝ่รู้</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text style={styles.text}>พุธ</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.text}>กายภาพบำบัด </Text> </DataTable.Cell>
                                    <DataTable.Cell ><Text style={styles.text}>ก.ภ.รักษาได้ หายเร็ว</Text></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.text}>สมองและเส้นประสาท </Text>  </DataTable.Cell>
                                    <DataTable.Cell ><Text style={styles.text}>นายแพทย์สมชาย มีใจรักดี</Text></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell><Text style={styles.text}>พฤหัส</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.text}>จิตแพทย์  </Text>  </DataTable.Cell>
                                    <DataTable.Cell ><Text style={styles.text}>แพทย์หญิงสมดี ไม่มีพิษภัย</Text></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.text}>หู คอ จมูก</Text> </DataTable.Cell>
                                    <DataTable.Cell ><Text style={styles.text}>แพทย์หญิงสมหญิง มีใจรักสงบ</Text></DataTable.Cell>
                                </DataTable.Row>

                                <DataTable.Row>
                                    <DataTable.Cell><Text style={styles.text}>ศุกร์</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.text}>โรคผิวหนัง </Text></DataTable.Cell>
                                    <DataTable.Cell ><Text style={styles.text}>นายแพทย์สมควร ไม่มีพิษภัย</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.text}>จักษุ </Text> </DataTable.Cell>
                                    <DataTable.Cell ><Text style={styles.text}>นายแพทย์ปกป้อง เก่งกล้า</Text></DataTable.Cell>
                                </DataTable.Row>

                            </DataTable>
                        </ScrollView>
                    </View>
                }
                <View style={{ ...styles.tabSelect }} >
                    <Text style={styles.tabFont}>ข่าวสารสุขภาพ</Text>
                </View>

                <SafeAreaView style={styles.content}>
                    <Information datalist={relation} />
                </SafeAreaView>


            </View >
        </ScrollView >
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
    contentContainer: {
        alignSelf: 'center',
        position: 'absolute',
        transform: [{ translateY: RFPercentage(21.) }]
    },
    content: {
    },
    tabSelect: {
        backgroundColor: '#e46472',
        paddingVertical: RFPercentage(1.5),
        width: wp('38%'),
        borderRadius: RFPercentage(5),
    },

    tabFont: {
        alignSelf: 'center',
        fontFamily: 'Kanit',
        fontSize: RFPercentage(2)
    },
    title: {
        fontFamily: 'Kanit',
        fontSize: RFPercentage(2),
    },
    text: {
        fontFamily: 'Kanit',

    }



})
