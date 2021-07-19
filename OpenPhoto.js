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
import {FlatListSlider} from 'react-native-flatlist-slider';



const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);

const OpenPhoto=(props)=>{

    const id = props.route.params.id;

    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

  

    const getData = () => {
        axios.get(`photo/${id}`)
        .then(res => {
            console.log(res);
            setData(res);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, []);

    const RenderItem = ({item,index}) => (
        <View style={styles.slider}>
            <FastImage style={styles.sliderImage} source={{uri: domen + item}}/>

        </View>
    )

    return(
        <View style={{flex:1}}>
            <Open {...props}/>
            {
            loading == true ?
            <ActivityIndicator color='red'/>
            :
            <View>
            <Text style={styles.text}>{data.data.photogallery.title_kz}</Text>
            <FlatListSlider
                data={data.data.photogallery.images}
                height={240}
                // timer={5000}
                component={<RenderItem/>}
                autoScroll={false}
                // onPress={item => alert(JSON.stringify(item))}
                contentContainerStyle={{paddingHorizontal: 16}}
                indicatorContainerStyle={{position:'absolute', bottom: 20}}
                indicatorActiveColor={'#8e44ad'}
                indicatorInActiveColor={'#ffffff'}
                indicatorActiveWidth={30}
                animation
            />

            </View>
            
            }
            <Footer/>
            

        </View>
    );
}

    const styles=StyleSheet.create({
        text:{
            fontSize:24,
            fontFamily:'SF Pro Display',
            fontWeight:'500',
            lineHeight:24.2,
            margin:20
        },
        slider: {
            width: screen.width,
            height: 350,
            justifyContent: 'center',
            alignItems: 'center',
            // padding: 16
        },
        sliderImage:{
            borderRadius: 6,
            width: screen.width-32,
            height: 310,
            marginLeft: -30
        }
        
    }

    );
    export default OpenPhoto;
