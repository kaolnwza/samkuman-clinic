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
            <View style={styles.position}>
            
                <View style={styles.queueBorder}>
                    <Text style={[styles.font1 ,{fontSize: 50}]}>5</Text>    
                </View>
                <Text style={[styles.font1 ,{fontSize: 20}]}>Current Queue</Text>


                <Text style={[styles.font1 ,{fontSize: 50 , marginTop: 70}]}>Your Queue</Text> 
                <Text style={[styles.font1 ,{fontSize: 30}]}>Is</Text> 
                <View style={styles.queueBorder2}>
                    <Text style={[styles.font1 ,{fontSize: 70}]}>6</Text>    
                </View>
                <Text style={[styles.font1 ,{fontSize: 15}]}>1 more queue</Text> 


                <View style={styles.cancel}>
                    <Text style={{fontSize: 28, fontFamily: 'Poppins', color: '#0d253f'}}>CANCEL</Text>
                </View>   
                
                

            </View>
            
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

    queueBorder: {
        borderColor: "#309397",
        borderWidth: 5,
        borderRadius: 25,
        height: 100,
        width: 100,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    
    },

    queueBorder2: {
        borderColor: "#e46472",
        borderWidth: 5,
        borderRadius: 25,
        height: 120,
        width: 120,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    
    },

    position: {
        flexDirection: 'column',
        alignItems: 'center',
        transform: [{ translateX: "0%" }, { translateY: "-600%" }],
    },



    cancel: {
        backgroundColor: '#e46472',
        borderRadius: 40,
        height: 80,
        width: 375,
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    font1: {
        fontFamily: 'Poppins',
        color: '#fff9ec'
    }

})
