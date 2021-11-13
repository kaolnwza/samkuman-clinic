import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';


const NotiGridTile = (props) => {
  return (
    <View
      style={styles.gridItem}
    //   onPress={() => {
    //     props.onSelect();
    //   }}
    >
      <View
        // style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        style={styles.container}
      >
        {/* <Text>{itemData.item.title}</Text> */}
        <Text style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>
        <Text style={styles.info} >
          {props.info}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    marginHorizontal: RFPercentage(4),
    marginVertical: RFPercentage(1),
  },
  container: {
    flex: 1,
    borderRadius: RFPercentage(1),
    shadowColor: "black",
    shadowOpacity: RFPercentage(1),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: RFPercentage(0.5),
    elevation: 3,
    padding: RFPercentage(1.2),
    backgroundColor: "#fff9ec",
  },

  title: {
    fontFamily: 'Poppins',
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },

  info: {
    fontFamily: 'Poppins',
    fontSize: RFPercentage(1.8),
  }
});

export default NotiGridTile;
