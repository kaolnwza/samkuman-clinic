import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Bg from '../components/Pagebg'


const DATA1 = [
    {
        title: 'อาการปวดหัว',
        date: "Lorem Ipsum is  it",
        symptom: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        diagnose: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        doctorAdvice: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
        medicine: ["1", "2", "3" ],
        howToUse: ["HTU1",["HTU2",["HTU3"],
        doctor

    },



];

const History = () => {
    return (
        <View style={styles.container}>
            <Bg Text1='History' />

        </View>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },
})
