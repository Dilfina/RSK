import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useEffect } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { createStackNavigator } from '@react-navigation/stack';


const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);


const News = (props)=>{
    const id = props.route.params.id;
    console.log(props);

    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        axios.get('news', {params:{category:id}})
        .then(res => {
            console.log(res);
            setData(res);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, []);


    const renderHeader = () => (
        <View style={{flex:1}}> 
            <FastImage style={styles.sliderImage} source={{uri: domen + data.data.latest.image}}/>
            <Text style={styles.sliderTitle}>{data.data.latest.title_kz}</Text>
            <Text style={styles.date}>{data.data.latest.created_at}</Text>
            <Text style={styles.new1}>Новости</Text>
        </View>
    )

    const renderItem = ({item, index}) => (
        <View>
        <Cards image={domen + item.image} title={item.title_kz} date={item.created_at} onPress={()=>props.navigation.navigate("OpenNews", {id: item.id})}/>
        </View>
    )


    return(
        <View style={styles.container}>
           <Header {...props}/>
           <TopBar {...props}/>
        
        {
            loading == true ?
            <ActivityIndicator color='red'/>
            :
            <FlatList
                data={data.data.news.data}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingBottom:50
    },
    sliderImage:{
        width: screen.width,
        height: 200,
        borderRadius:5,
        marginTop:5
    },
    sliderTitle: {
        width: screen.width,
        fontSize:30,
        fontWeight:'700',
        letterSpacing:0.3,
        margin:15
    },
    date:{
        color:'grey',
        marginLeft:15,
        fontSize:18

    },
    new1:{
        color:'black',
        fontSize:26,
        fontWeight:'700',
        marginLeft:15,
        marginTop:23
        
    }

})

export default News;