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
console.log(screen.width);

const Header =(props)=>{
    

return(
        <View style={styles.container}>
            <FastImage source={require('../assets/logo.png')} style={styles.image}/>
            <Text style={styles.headText}>Региональная служба коммуникаций Алматы</Text>
            <TouchableOpacity onPress={()=>props.navigation.navigate("MenuBar")}>
                <FastImage source={require('../assets/a.png')} style={styles.menu}/>
            </TouchableOpacity>
        </View>
    );
    
    
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        
        backgroundColor:'#0E3F8B',
        height:80,
        
        

    },
    image: {
        width: 55,
        height: 60,
        margin:5
    },
    headText:{
        fontSize: 20,
        width: 250,
        margin:5,
        fontWeight:'bold',
        color:'white',
        
        
    },
    menu:{
        width:30,
        height:40,
        margin:10

    }
});


export default Header;