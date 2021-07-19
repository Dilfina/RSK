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


const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);

const NewsHome=(props)=>{
    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        axios.get('home')
        .then(res => {
            console.log(res);
            setData(res);
            setLoading(false);
        })
    }

    useEffect(() => {
        getData();
    }, []);


    const renderItem = ({item, index}) => (
        <View style={{flex:1}}>
        <Text style={styles.text}>{item.title_kz}</Text>
        <Cards image={domen + item.latest?.image} title={item.latest?.title_kz} date={item.latest?.created_at}/>
        <TouchableOpacity style={{flexDirection:'row', marginBottom:5}} onPress={()=>props.navigation.navigate("News", {id: item.id})}>
            <Text style={{fontSize:18, marginLeft:12,color:'#0E3F8B'}}>Смотреть все</Text>
            <FastImage source={require('../assets/arr.png')} style={styles.image}/>
        </TouchableOpacity>
        </View>
    )
    return(
        <View style={{flex:1}}>
            <Header {...props}/>
            
            <TopBar {...props} id={2}/>
            
            

            {
            loading == true ?
            <ActivityIndicator color='red'/>
            :
            <FlatList
                data={data.data}
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
        fontSize:22,
        lineHeight:26.4,
        marginLeft:20,
        margin:10,
        paddingTop:5
    },
    image:{
        margin:9,
        width:9,
        height:9

    }
   

});
export default NewsHome;