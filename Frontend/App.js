import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screen/Login';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>

      <Login />
      <StatusBar style='inverted' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9EC',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins'
  },
});
