import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HTML from "react-native-render-html";

import axios from 'axios';
import { useEffect } from 'react';
import Open from '../components/Open';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TopBar from '../components/TopBar';



const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);



const Media=(props)=>{

    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        axios.get('media')
        .then(res => {
            console.log(res);
            setData(res);
            setLoading(false);
        })
    }

    useEffect(() => {
        getData();
    }, []);
    return(
        <View style={{flex:1}}>
            <Header {...props}/>
            <TopBar {...props} id={4}/>
            

            {
            loading == true ?
            <ActivityIndicator color='red'/>
            :
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                <Text style={styles.text}>Фотогалерея</Text>
                <View style={styles.block}>
                    <FastImage style={styles.im} source={{uri: domen + data.data.photogallery.images[0]}}/>
                    <Text style={styles.title}>{data.data.photogallery.title_kz}</Text>
                    <TouchableOpacity style={{flexDirection:'row', marginBottom:5}} onPress={()=>props.navigation.navigate("Photo")}>
                        <Text style={{fontSize:18, marginLeft:12,color:'#0E3F8B'}}>Смотреть все</Text>
                        <FastImage source={require('../assets/arr.png')} style={styles.image}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>Видеогалерея</Text>
                <View style={styles.block}>
                <FastImage style={styles.im} source={{uri: domen + data.data.video.image}}/>
                    <Text style={styles.title}>{data.data.video.title_kz}</Text>
                    <TouchableOpacity style={{flexDirection:'row', marginBottom:5}} onPress={()=>props.navigation.navigate("Video")}>
                        <Text style={{fontSize:18, marginLeft:12,color:'#0E3F8B'}}>Смотреть все</Text>
                        <FastImage source={require('../assets/arr.png')} style={styles.image}/>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        }
        <Footer/>
        </View>
    );
}

const styles=StyleSheet.create({
    image:{
        margin:9,
        width:9,
        height:9

    },
    text:{
        color:'black',
        fontSize:26,
        fontWeight:'700',
        marginLeft:15,
        marginTop:23
        
    },
    im:{
        width:screen.width - 30,
        height:189,
        borderRadius:8,
        // margin:15
    },
    title:{
        fontFamily:'SF Pro Display',
        color:'black',
        fontSize: 22,
        lineHeight: '100%',
        fontWeight:'600',
        margin:10,
        lineHeight:31.2
    },
    block: {
        
        marginHorizontal: 15,
        // width: screen.width - 32,
        justifyContent: 'center'
        
    }
}

);


export default Media;