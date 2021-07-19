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

const Footer =()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Все права защищены © 2021 РСКА</Text>
        </View>

    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        width:screen.width,
        height:62,
        backgroundColor:'#0E3F8B',
        position: 'absolute',
        bottom: 0
    },
    text:{
        textAlign:'center',
        color:'white',
        marginTop:20,
        fontSize:18

    }

}
    


)
export default Footer;