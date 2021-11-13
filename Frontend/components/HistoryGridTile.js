import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert, Modal, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
const DATA1 = [
  {
    title: 'Puad Hua',
    date: "10/11/2020",
    symptom: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
    diagnose: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
    doctorAdvice: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
    medicine: ["1", "2", "3"],
    howToUse: ["HTU1", "HTU2", "HTU3"],

  },

  {
    title: 'Jeb Korrr',
    date: "10/11/2020",
    symptom: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
    diagnose: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
    doctorAdvice: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
    medicine: ["1", "2", "3"],
    howToUse: ["HTU1", "HTU2", "HTU3"],

  },

  {
    title: 'Puad Tong',
    date: "10/11/2020",
    symptom: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
    diagnose: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
    doctorAdvice: "Lorem Ipsum is  it to make a type specimen book. It has survived not only five centuries, but also the leap into electr",
    medicine: ["1", "2", "3"],
    howToUse: ["HTU1", "HTU2", "HTU3"],
  }]



const HistoryGridTile = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >

        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


      <Pressable
        style={styles.gridItem}
        //   onPress={() => {
        //     props.onSelect();
        //   }}
        onPress={() => setModalVisible(true)}
      >

        <View
          // style={{ ...styles.container, ...{ backgroundColor: props.color } }}
          style={styles.container}
        >
          {/* <Text>{itemData.item.title}</Text> */}
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
          <Text style={styles.date} >
            {props.date}
          </Text>
        </View>
      </Pressable></View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    marginVertical: RFPercentage(1),
    width: wp('80%'),
  },
  container: {
    borderRadius: RFPercentage(1),
    shadowColor: "black",
    shadowOpacity: RFPercentage(1),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: RFPercentage(0.5),
    elevation: 3,
    padding: RFPercentage(1.2),
    backgroundColor: '#6488e4',
  },

  title: {
    fontFamily: 'Poppins',
    fontSize: RFPercentage(3),
    fontWeight: "bold",

  },

  date: {
    fontFamily: 'Poppins',
    fontSize: RFPercentage(1.8),
    paddingLeft:RFPercentage(1.8),
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,

  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp('70%'),
    height: wp('70%'),
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,

  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {

    backgroundColor: '#e46472',
    width: wp('40%'),
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default HistoryGridTile;
