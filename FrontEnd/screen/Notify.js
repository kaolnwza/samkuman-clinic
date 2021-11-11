import React from 'react'
import { StyleSheet, Text, View, FlatList, } from 'react-native'
import Bg from '../components/Pagebg'
import NotiGridTile from '../components/NotiGridTile';
import { useFonts } from 'expo-font';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DATA1 = [
    {
        title: 'Notification 1',
        info: "Lorem Ipsum is  it",
    },
    {
        title: 'Notification 2',
        info: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap inLorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap inLorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap inLorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap inLorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum        ",
    },
    {
        title: 'Notification 3',
        info: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum        ",
    },
    {
        title: 'Notification 4',
        info: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum        ",
    },
    {
        title: 'Notification 5',
        info: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum        ",
    },
    {
        title: 'Notification 6',
        info: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum        ",
    },
    {
        title: 'Notification 7',
        info: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum        ",
    },
    {
        title: 'Notification 8',
        info: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum        ",
    },


];

const Notify = ({ navigation }) => {
    const renderGridItem = (itemData) => {
        return (
            <NotiGridTile
                // style={{ height: "50", }}
                title={itemData.item.title}
                info={itemData.item.info}
            // color={itemData.item.color}
            // onSelect={() => {
            //   // เขียนโค้ดเพิ่ม
            //   navigation.navigate("CategoryMeals", {categoryId : itemData.item.id , categoryTitle : itemData.item.title})
            // }}
            />

        );
    };


    return (



        <View style={styles.container}>
            <Bg Text1='Notification' />
            <View style={styles.position}>
                <KeyboardAwareScrollView style={{ height: hp('70%') }}>
                    <FlatList data={DATA1} renderItem={renderGridItem} keyExtractor={item => item.title} numColumns={1} />
                </KeyboardAwareScrollView>
            </View>
        </View>

    );



}

export default Notify

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
        transform: [{ translateY: RFPercentage(20) }]
    }
})
