import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import Bg from '../components/Pagebg'

const Queue = ({ navigation }) => {
    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
    });
    if (!loaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Bg Text1='Queue' />
        </View>
    )
}

export default Queue

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6488e4',
    },


})
