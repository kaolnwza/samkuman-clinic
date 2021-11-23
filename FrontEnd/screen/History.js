import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Alert, Modal, RefreshControl, ScrollView, SafeAreaView } from 'react-native'
import Bg from '../components/Pagebg'
import HistoryGridTile from '../components/HistoryGridTile';
import { useFonts } from 'expo-font';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const History = () => {
    const [userHistory, setuserHistory] = useState([])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    useEffect(() => {
        const getUserInfo = async () => {
            await axios.get(global.local + "/gethistory")
                .then(res => {
                    setuserHistory(res.data)
                })

        }

        return (
            getUserInfo()
        )
    })
    const renderGridItem = (itemData) => {
        return (
            <HistoryGridTile
                date={itemData.item.date}
                title={itemData.item.symptom}
                detail={itemData.item}
                keyExtractor={itemData.history_id}

            // color={itemData.item.color}
            // onSelect={() => {
            //   // เขียนโค้ดเพิ่ม
            //   navigation.navigate("CategoryMeals", {categoryId : itemData.item.id , categoryTitle : itemData.item.title})
            // }}
            />

        );
    };
    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <Bg Text1='ประวัติการรักษา' />
            <View style={styles.position}>
                <FlatList data={userHistory} renderItem={renderGridItem} keyExtractor={item => item._id} numColumns={1} />
            </View>
        </ScrollView>
    )
}

export default History


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
        transform: [{ translateY: hp('25%') }],
        height: hp('70%')
    },
})
