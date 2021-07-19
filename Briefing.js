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

const Briefing =(props)=>{
    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        axios.get('briefings')
        .then(res => {
            console.log(res);
            setData(res);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, []);

    const renderItem = ({item, index}) => (
        <Cards image={domen + item.image} title={item.title_kz} date={item.created_at} onPress={()=>props.navigation.navigate("OpenBriefing", {id: item.id})}/>
    )
    return(
        <View style={styles.container}>
           <Header {...props}/>
           <TopBar {...props} id={3}/>
            
            <View style={styles.div1}>

                <Text style={styles.text}>Брифинги</Text>        
            </View>
            {
            loading == true ?
            <ActivityIndicator color='red'/>
            :
            <FlatList
                data={data.data.briefings}
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
    container:{
        flex:1,
        

    },
    text:{
        color:'black',
        fontSize:24,
        fontWeight:'700',
        marginLeft:20,
        marginTop:23
    }


})

export default Briefing;