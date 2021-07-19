import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
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

const Photo =(props)=>{

    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        axios.get('photogalleries')
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
            <Text style={styles.text}>Фотогалерея</Text>
        </View>

    )

    const renderItem = ({item, index}) => (
        <Cards image={domen + item.images[0]} title={item.title_kz} style={styles.cards} onPress={()=>props.navigation.navigate("OpenPhoto", {id: item.id})}/>
    )
    return(
        <View style={{flex:1}}>
            <Open {...props}/>

            {
            loading == true ?
            <ActivityIndicator color='red'/>
            :
            <FlatList
                data={data.data.photogalleries}
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
        margin:20
    },
    cards:{
        margin:20
    }

});

export default Photo;