import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import Bg from '../components/Pagebg'
import { RFPercentage } from 'react-native-responsive-fontsize';
import Information from '../components/Information';
import GridInformation from '../components/GridInformation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios"

const DATA1 = [
    {
        title: 'PUBLIC RELATION',
        info: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum        ",
        color: '#f9be7c'
    },
    {
        title: 'I want to go out!',
        info: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).        ",
        color: '#e46472'

    },
    {
        title: 'Covid is take over',
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in fringilla libero, a ultrices mi. Nam dapibus dolor nec tristique eleifend. Proin luctus arcu id gravida tempus. Mauris interdum, augue in volutpat pellentesque, eros neque pretium magna, at consectetur libero nisi eget ex. Aenean leo purus, imperdiet id leo sit amet, accumsan bibendum odio. Aliquam erat volutpat. Curabitur ultricies, metus sit amet bibendum fringilla, tortor ante malesuada risus, a laoreet ex purus vitae odio.",
        color: '#309397'

    },
    {
        title: 'we all gonna die',
        info: "Duis sed dolor mauris. Duis in iaculis libero. Donec id metus et sapien dignissim dapibus. Morbi molestie metus at nibh scelerisque, eget semper metus luctus. Nunc in velit nec tortor interdum laoreet ac in nunc. Phasellus facilisis luctus risus tincidunt blandit. Proin tincidunt suscipit tempor. Aenean libero diam, luctus quis dictum sed, maximus eget massa. Sed maximus tortor sit amet eros bibendum, quis fermentum purus eleifend. Phasellus nec risus nec odio aliquam molestie. Phasellus sollicitudin dui dolor, nec condimentum felis convallis at.",
        color: '#f9be7c'

    },
    {
        title: 'some time i dream about chesse',
        info: "Nullam blandit pellentesque ex, et varius velit rutrum lacinia. Nunc at diam interdum massa dictum tincidunt sit amet a justo. Duis no",
        color: '#e46472'

    },
    {
        title: 'I want to see her ;-;',
        info: "nulla vel nibh elementum vestibulum. In lorem urna, imperdiet non blandit eget, dapibus vitae tortor. Sed non orci eu arcu rutrum rutrum. Praesent viverra, sem non blandit dictum.",
        color: '#309397'

    },
];



const Main = ({ navigation }) => {
    const [Select, setSelect] = useState(true);
    let isMount = true
    const [news, setNews] = useState([])
    useEffect(() => {
        console.log("use eff");
        const getUserInfo = async () => {
            console.log("in");
            if (isMount) {
                console.log("getting");
                const instance = axios.create({
                    withCredentials: true
                })
                const local = "http://172.20.10.3:12345"
                await instance.get(local + "/getinformation")
                    .then(res => {
                        setNews(res.data)
                        // console.log(res.data)

                    })
                isMount = false
            }
        }
        return (
            getUserInfo()
        )
    }, [])


    return (
        <View style={styles.container}>
            <Bg Text1='Home' />
            <View style={styles.contentContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {
                        setSelect(true)
                    }} style={{ ...styles.tabSelect, backgroundColor: Select === true ? '#309397' : '#e46472' }} >
                        <Text style={styles.tabFont}>INFORMATION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setSelect(false)
                    }} style={{ ...styles.tabSelect, backgroundColor: Select === false ? '#309397' : '#e46472' }} >
                        <Text style={styles.tabFont}>Doctor Schedule</Text>
                    </TouchableOpacity>
                </View>
                {Select === true ? <SafeAreaView style={styles.content}>
                    <Information datalist={news} />
                </SafeAreaView> : null}
                <View style={{ ...styles.tabSelect }} >
                    <Text style={styles.tabFont}>PUBLIC RELATION</Text>
                </View>

                <SafeAreaView style={styles.content}>
                    <Information datalist={DATA1} />
                </SafeAreaView>


            </View >
        </View >
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
        fontFamily: 'Poppins',
        fontSize: RFPercentage(2)
    },



})
