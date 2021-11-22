import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert, Modal, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Moment from 'moment';


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
            <Text style={styles.boxTop}>ชื่อแพทย์ :   {props.detail.doctor_firstname} {props.detail.doctor_lastname}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Text style={styles.dateTime}>วัน : {Moment(props.date).format('L')}</Text>
              <Text style={[styles.dateTime,]}>เวลา : {Moment(props.date).format('HH.mm A')}</Text>
            </View>

            <KeyboardAwareScrollView style={{ height: hp('70%'), marginTop: RFPercentage(3) }}>
              <View style={styles.box}>
                <Text style={styles.boxHeader}>อาการ :</Text>
                <Text style={styles.boxInfo} > {props.detail.symptom}</Text>
                <Text style={styles.boxHeader}>ผลวินิจฉัย :</Text>
                <Text style={styles.boxInfo} > {props.detail.diagnose}</Text>
                <Text style={styles.boxHeader}>คำแนะนำแพทย์ : </Text>
                <Text style={styles.boxInfo} > {props.detail.doctor_advice}</Text>
                <Text style={styles.boxHeader}>ยา และการใช้:</Text>
                <Text style={styles.boxInfo} > {props.detail.medicine}</Text>
                {/* <Text style={styles.boxHeader}>How to use:</Text> */}
                {/* <Text style={styles.boxInfo} > {props.detail.usage}</Text> */}
              </View>
            </KeyboardAwareScrollView>

            <Pressable
              style={[styles.button, styles.buttonClose, { flexDirection: "column", justifyContent: "flex-end" }]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>ปิด</Text>
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
            {Moment(props.date).format('LL')}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {Moment(props.date).format('HH.mm A')}
          </Text>
          <Text style={styles.date} >
            {props.title}
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
    borderRadius: RFPercentage(5),
    shadowColor: "black",
    shadowOpacity: RFPercentage(1),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: RFPercentage(0.5),
    elevation: 3,
    padding: RFPercentage(2),
    backgroundColor: '#6488e4',
  },

  title: {
    fontFamily: 'Poppins',
    fontSize: RFPercentage(3),
    fontWeight: "bold",

  },

  date: {
    fontFamily: 'Kanit',
    fontSize: RFPercentage(1.8),
    paddingLeft: RFPercentage(1.8),
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: RFPercentage(50),

  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff9ec",
    borderRadius: RFPercentage(1.5),
    padding: RFPercentage(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp('80%'),
    height: wp('90%'),

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "center",
    marginTop: RFPercentage(1.6)



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
    textAlign: "center",
    fontSize: RFPercentage(1.8),
    fontFamily: 'Kanit'
  },
  boxTop: {
    marginBottom: RFPercentage(1.3),
    fontFamily: 'Kanit',
    fontSize: RFPercentage(2.2),
    alignSelf: 'center'
  },

  dateTime: {
    fontFamily: 'Kanit',
    fontSize: RFPercentage(1.8),
  },
  box: {
    backgroundColor: 'rgba(239, 216, 147, 0.8)',
    // borderWidth: RFPercentage(),
    borderRadius: RFPercentage(1.5),
    width: wp('70%'),
    justifyContent: 'center',
    alignSelf: 'center',
    padding: RFPercentage(2),
    paddingLeft: RFPercentage(2.5),

  },
  boxHeader: {
    // margin: RFPercentage(1),
    fontFamily: 'Kanit',
    fontSize: RFPercentage(2),
    // textAlign: 'left'
  },
  boxInfo: {
    fontFamily: 'Kanit',
    fontSize: RFPercentage(1.7),
    marginLeft: RFPercentage(2),
    marginBottom: RFPercentage(2)

  }
});

export default HistoryGridTile;
