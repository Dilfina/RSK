import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import axios from 'axios';
import { useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import TopBar from '../components/TopBar';
import Open from '../components/Open';

const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);



const Video =(props)=>{

    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        axios.get('videogalleries')
        .then(res => {
            console.log(res);
            setData(res);
            setLoading(false);
        })
    }

    useEffect(() => {
        getData();
    }, []);
    const renderHeader = () => (
        <View>
            <Text style={styles.text}>Видеогалерея</Text>
        </View>

    )
    const renderItem = ({item, index}) => (
        <Cards image={domen + item.image} title={item.title_kz} date={item.created_at}/>
    )
    return(
        <View style={{flex:1}}>
            <Open {...props}/>

            {
            loading == true ?
            <ActivityIndicator color='red'/>
            :
            <FlatList
                data={data.data.videogalleries}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}     
                keyExtractor={(item, index) => index.toString()}   
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            />
        }
          
          <Footer/>


        </View>
    );
}

const styles=StyleSheet.create({
    text:{
        fontFamily:'SF Pro Display',
        fontWeight:'600',
        fontSize:24,
        lineHeight:28.8,
        marginLeft:20,
        margin:10,
        paddingTop:10
    }
    
});

export default Video;