import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useEffect } from 'react';


const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
const Cards = (props)=>{

    console.log(props);

    return(
        <TouchableOpacity style={styles.container} onPress={props?.onPress}>
            <FastImage style={styles.sliderImage} source={{uri: props?.image}}/>
            <View style={{flex: 1}}>
                <Text style={styles.sliderTitle} numberOfLines={3}>{props?.title}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
        </TouchableOpacity>

        
        

    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
       // marginHorizontal: 16,
        // width: screen.width - 32
    },
    sliderImage:{
        width: 162,
        height: 90,
        borderRadius:6,
        marginLeft:20,
        margin:10

    },
    sliderTitle:{
        margin:3,
        marginTop:10,
        marginLeft:20,
        fontSize:17,
        color:'black'
    },
    date:{
        marginLeft:17,
        marginTop:10,
        color:'grey'

        
    }
})
export default Cards;