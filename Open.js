import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

const Open=(props)=>{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={{justifyContent: 'center', width: 30, height: 30}}  onPress={() => props.navigation.goBack()}>
                <FastImage source={require('../assets/ba.png')} style={styles.image}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <FastImage source={require('../assets/up.png')} style={styles.up}/>
            </TouchableOpacity>

            <TouchableOpacity>
                <FastImage source={require('../assets/a.png')} style={styles.menu}/>
            </TouchableOpacity>

        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#0E3F8B',
        width: screen.width,
        height: 68,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
      

    },
    image:{
        width:30,
        height:30,
    },
    up:{
        height:20,
        width:11.5,
        marginLeft:220
    },
    menu:{
        height:20,
        width:30,
        marginLeft:40

    }
});
export default Open;