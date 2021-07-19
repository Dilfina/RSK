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



const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);

const OpenBriefing=(props)=>{

    const id = props.route.params.id;

    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // const htmlContent = `data.data.briefing.content_kz`;

    const getData = () => {
        axios.get(`briefing/${id}`)
        .then(res => {
            console.log(res);
            setData(res);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, []);
    return(
        <View style={styles.container}> 
            <Open {...props}/>
            
               
            {
            loading == true ?
            <ActivityIndicator color='red'/>
            :
            <ScrollView>
                <FastImage style={styles.im} source={{uri: domen + data.data.briefing.image}}/>
                <Text style={styles.title}>{data.data.briefing.title_kz}</Text>
                <Text style={styles.date}>{data.data.briefing.created_at}</Text>
                <HTML source={{ html: data.data.briefing.content_kz }} contentWidth={screen.width} tagsStyles={{p:{margin:15}}} />       
            </ScrollView>
            }
            <Footer/>
        </View>
        
    );
}
const styles=StyleSheet.create({
    container:{
        // marginBottom:100
        flex: 1
    },
    im:{
        width:screen.width,
        height:189,
        borderRadius:8
    },
    title:{
        fontFamily:'SF Pro Display',
        color:'black',
        fontSize:24,
        fontWeight:'600',
        letterSpacing:0.2,
        marginLeft:15,
        marginTop:23,
        lineHeight:31.2
    },
    date:{
    color:'grey',
        margin:15,
        fontSize:18
    },
    html:{
        margin:15

    }
});
export default OpenBriefing;