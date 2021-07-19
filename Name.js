import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

const Name=(props)=>{

    console.log(props.style);

    const extraStyle = props.style;

    return(
        <View style={{flex:1}}>
            <TouchableOpacity style={extraStyle.button1} onPress={()=>props.navigation.navigate("Question")}>
                <Text style={extraStyle.text1}>Отправить вопрос</Text>
            </TouchableOpacity>
            <TouchableOpacity style={extraStyle.button2}>
                <Text style={extraStyle.text2}>Акредитация на брифинг</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles=StyleSheet.create({
    hover:{
        borderColor:'white',
        borderWidth:2,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        width:screen.width-36,
        margin:18
    },
    hover1:{
        borderColor:'white',
        backgroundColor:'white',
        borderWidth:2,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        width:screen.width-36,
        margin:18
    },
    quest:{
        fontFamily:'SF Pro Display',
        fontWeight:'600',
        fontSize:18,
        color:'white'

    },
    quest1:{
        fontFamily:'SF Pro Display',
        fontWeight:'600',
        fontSize:18,
        color:'#0E3F8B'
    }
});
export default Name;