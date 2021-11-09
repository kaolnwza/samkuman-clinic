import React from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import GridInformation from './GridInformation'
import Carousel from 'react-native-snap-carousel';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Information = (props) => {
    const renderItem = ({ item }) => (
        <GridInformation title={item.title} color={item.color} info={item.info} />

    );
    return (
        // <FlatList
        //     data={props.datalist}
        //     renderItem={renderItem}
        //     keyExtractor={item => item.id}
        //     numColumns={2}
        // />
        <Carousel
            data={props.datalist}
            renderItem={renderItem}
            sliderWidth={wp('80%')}
            itemWidth={wp('80%')}
        />

    )
}

export default Information

const styles = StyleSheet.create({})
