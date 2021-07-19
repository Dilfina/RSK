import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HTML from "react-native-render-html";
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';

import axios from 'axios';
import { useEffect } from 'react';
import Open from '../components/Open';
import Footer from '../components/Footer';
import Cards from '../components/Cards';



const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);

const OpenNews=(props)=>{
    const id = props.route.params.id;

    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // const htmlContent = `data.data.briefing.content_kz`;

    const getData = () => {
        axios.get(`news/${id}`)
        .then(res => {
            console.log(res);
            setData(res);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, []);
    const renderers = {
        iframe: IframeRenderer
      }
      
      const customHTMLElementModels = {
        iframe: iframeModel
      }
      
      
      

    const renderHeader = () => (
        <View style={{flex:1}}>
            <View>        
                <FastImage style={styles.im} source={{uri: domen + data.data.news.image}}/>
                <Text style={styles.title}>{data.data.news.title_kz}</Text>
                <Text style={styles.date}>{data.data.news.created_at}</Text>
                <HTML source={{ html: data.data.news.content_kz}} 
                renderers={renderers}
                contentWidth={screen.width}
                WebView={WebView}
                customHTMLElementModels={customHTMLElementModels}
                defaultWebViewProps={{ /* Any prop you want to pass to all WebViews */ }}
                renderersProps={{ iframe: { scalesPageToFit: true, webViewProps: { /* Any prop you want to pass to iframe WebViews */ } }}}
                tagsStyles={{p:{margin:15, fontSize:18}, iframe:{width:screen.width,
                    height:189,
                    borderRadius:8}}} />  
                <View style={{
                    width: screen.width,
                    borderBottomColor: '#F0F0F0',
                    borderWidth: 1  
                    }}
                />   
                </View>
            <View/> 
            <Text style={styles.new1}>Другие новости</Text>
        </View>
    )

    const renderItem = ({item, index}) => (
        <View>
        <Cards image={domen + item.image} title={item.title_kz} date={item.created_at} onPress={()=>props.navigation.push("OpenNews", {id: item.id})}/>
        </View>
    )
    return(
        <View style={{flex:1}}>
            <Open {...props}/>
                {
            loading == true ?
            <ActivityIndicator color='red'/>
            :
            <FlatList
                data={data.data.other_news}
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
    im:{
        width:screen.width,
        height:189,
        borderRadius:8
    },
    title:{
        fontFamily:'SF Pro Display',
        color:'black',
        fontSize:24,
        fontWeight:'700',
        marginLeft:15,
        marginTop:23,
        lineHeight:28.8
    },
    date:{
    color:'grey',
        margin:15,
        fontSize:18
    },
    html:{
        margin:15

    },
    new1:{
        fontFamily:'SF Pro Display',
        fontWeight:'600',
        fontSize:20,
        lineHeight:21.6,
        marginLeft:20,
        paddingTop:25
    }

}

);

export default OpenNews;