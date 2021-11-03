import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';

const Main = ({ navigation }) => {
    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
    });
    if (!loaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <View style={styles.image, styles.im2}>
                    <Image source={require('../assets/normal_u5.png')} />
                </View>
                <View style={styles.image}>
                    <Image source={require('../assets/normal_u4.png')} />
                </View>
                <View style={styles.Name}>
                    <Text style={styles.FN}>FirstName</Text>
                    <Text style={styles.LN}>LastName</Text>
                </View>
            </View>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#007AFF',
    },
    header: {
        transform: [{ translateY: "20%" }]
    },
    image: {
        justifyContent: "center",
        transform: [{ translateX: "-50%" }, { translateY: "-20%" }],
        position: 'absolute'
    },
    im2: {
        transform: [{ translateX: "-10%" }, { translateY: "-30%" }],
        justifyContent: "center"
    },
    Name: {
        position: 'absolute',
        right: 0,
        paddingTop: 30,
        paddingRight: 20
    },
    FN: {
        fontSize: 25,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#0d253f',

    },
    LN: {
        fontSize: 25,
        color: '#0d253f',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
    },
})
