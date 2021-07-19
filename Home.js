import React, { useState } from 'react';
import { StyleSheet,ImageBackground, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useEffect } from 'react';
import {FlatListSlider} from 'react-native-flatlist-slider';

import Header from '../components/Header';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { strings } from '../../localization/localization';


const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);


const Home = (props)=>{

    console.log(props);

    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingVideo, setLoadingVideo] = useState(false);
    const [newsLoading, setNewsLoading] = useState(false);
    const [newsURL, setNewsURL] = useState(null);
    const [videos, setVideos]=useState(null);
    const [videoURL, setVideoURL]=useState(null);


    const getData = () => {
        axios.get('index')
        .then(res => {
            console.log(res);
            setData(res); // data = res
            setNews(res.data.news.data); // news = []
            setNewsURL(res.data.news.next_page_url); // newsURL = ''
            setVideos(res.data.videos.data);
            setVideoURL(res.data.videos.next_page_url);
            setLoading(false); // loading = false  
        })
    }

    const getNews=()=>{
        axios.get(newsURL) // newsURL = page2
        .then(res => {
            console.log("News", res);
            setNews(news.concat(res.data.news.data)); // news = [].concat(res)
            setNewsURL(res.data.news.next_page_url); // newsURL = ''
            setNewsLoading(false);
        })
    }

    const seeNews=()=>{
        setNewsLoading(true);
        getNews();
    }

    const seeMoreVideoPressed = () => {
        setLoadingVideo(true);
        getVideos();
    }
    const getVideos=()=>{
        axios.get(videoURL)
        .then(res=> {
            console.log("Videos", res);
            setVideos(videos.concat(res.data.videos.data));
            setVideoURL(res.data.videos.next_page_url);
            setLoadingVideo(false);
        })
    }

    useEffect(() => {
        getData();  // 1
    }, []);


    const RenderSlider = ({item, index}) => (
        <View style={styles.slider}>
            <FastImage style={styles.sliderImage} source={{uri: domen + item.image}}/>
            <Text style={styles.sliderTitle}>{item[`title_${strings.language}`]}</Text>
            <Text style={styles.date}>{item.created_at}</Text>
        </View>
    )

    const renderHeader = () => (
        <View>
        
           <FlatListSlider
                data={data.data.slider}
                height={310}
                component={<RenderSlider/>}
                autoScroll={false}
                contentContainerStyle={{}}
                indicatorContainerStyle={{position:'absolute',top:270}}
                indicatorActiveColor={'#8e44ad'}
                indicatorInActiveColor={'#ffffff'}
                indicatorActiveWidth={30}
                animation
            />
           {/*<FlatList
            /> */} 
            <Text style={{fontFamily:'SF Pro Display', fontWeight:'600', fontSize:24,marginLeft:20, margin:5, marginTop:20}}>Новости</Text>
        </View>     
  
    )
    const renderItem = ({item, index}) => (
        <Cards image={domen + item.image} title={item.title_kz} date={item.created_at} onPress={()=>props.navigation.navigate("OpenNews", {id: item.id})}/>
    )
    const renderVideo=({item,index})=>(
        <View>
            <TouchableOpacity onPress={()=>props.navigation.navigate("OpenNews", {id: item.id})}>
            <FastImage style={styles.video} source={{uri: domen + item.image}}>
                <FastImage source={require('../assets/play.png')} style={styles.play}/> 
                <Text style={styles.desc} numberOfLines={2}>{item.title_kz}</Text>
                <Text style={styles.new}>{item.created_at}</Text> 
            </FastImage>
            </TouchableOpacity>
        </View>
    )

    const renderPhoto=({item,index})=>(
        <View>
            <TouchableOpacity style={{margin:18}} onPress={()=>props.navigation.navigate("OpenPhoto", {id: item.id})}>
            <FastImage style={styles.photo} source={{uri: domen + item.images[0]}}></FastImage>
            <Text style={styles.photodes} numberOfLines={2}>{item.title_kz}</Text>
            </TouchableOpacity>
            
        </View>

    )

    const renderFooter = () => (
        <View>
            {
                (newsURL != null && newsLoading == false) ?
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
                marginTop:20}} onPress={seeNews} >
                    <Text style={styles.more}>Показать больше</Text>
                    <FastImage source={require('../assets/down.png')} style={styles.image}/>
                </TouchableOpacity>
                :
                <ActivityIndicator color={'red'}/>
            }

                <View style={{
                    width: screen.width,
                    borderBottomColor: '#F3F3F3',
                    borderWidth: 1,
                    marginTop:15
                    }}
                />   
                <Text  style={{fontFamily:'SF Pro Display', fontWeight:'600', fontSize:22,marginLeft:20, margin:5, marginTop:20}}>Видео</Text>
            <FlatList
                data={data.data.videos.data}
                renderItem={renderVideo}     
                keyExtractor={(item, index) => index.toString()}   
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            />
                    {
                (videoURL!=null && loadingVideo == false) ?
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
                marginTop:20}} onPress={seeMoreVideoPressed} >
                    <Text style={styles.more}>Показать больше</Text>
                    <FastImage source={require('../assets/down.png')} style={styles.image}/>
                </TouchableOpacity>
                   :
                   <ActivityIndicator color={'red'}/>
                }

                <View style={{
                    width: screen.width,
                    borderBottomColor: '#F3F3F3',
                    borderWidth: 1,
                    marginTop:15
                    }}
                />
                <Text style={{fontFamily:'SF Pro Display', fontWeight:'700', fontSize:23,marginLeft:20, margin:5, marginTop:17}}>Фото</Text>
            <FlatList
                data={data.data.photo.data}
                renderItem={renderPhoto}     
                keyExtractor={(item, index) => index.toString()}   
                horizontal
                showsVerticalScrollIndicator={false}
                
            />
        </View>
    )

    return(
    <View style={styles.container}>
        <Header {...props}/>
        <TopBar {...props} id={0}/>
        {
            loading==true ?
            <ActivityIndicator color='#0E3F8B'/>
            :
            <FlatList
                data={news}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                contentContainerStyle={{paddingBottom:100}}
                vertical
                showsVerticalScrollIndicator={false}
            />
        }
        <Footer/>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    photo:{
        width:182,
        height:144,
        borderRadius:6

    },
    photodes:{
        fontFamily:'SF Pro Display',
        fontWeight:'400',
        fontSize:16,
        width:182,
        height:48

    },
    image:{
        width:15,
        height:15,
        marginLeft:4,
        marginTop:2
    },
    

    navbar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'blue',
        height:80
    
    },
    date:{
        color:'grey',
        marginLeft:20    
    },
    headText:{
        fontSize: 20,
        width: 250,
        margin:5,
        fontWeight:'bold',
        color:'white',
        
        
    },
    play:{
        width:50,
        height:50,
        marginLeft:40,
        marginTop:20
        
        

    },
    menu:{
        width:30,
        height:40,
        margin:10
    },
    sliderImage:{
        width: screen.width,
        height: 310
        
    },
    slider: {
        width: screen.width
        
    },
    sliderTitle: {
        fontFamily:'SF Pro Display',
        fontSize:20,
        fontWeight:'600',
        lineHeight:24,
        paddingLeft:5,
        margin:10
    },
    more:{
        fontFamily:'SF Pro Display',
        fontWeight:'400',
        fontSize:20
    },
    desc:{
        fontFamily:'SF Pro Display',
        fontWeight:'600',
        fontSize:23,
        marginLeft:40,
        color:'black',
        marginTop:30
    },
    video:{
        backgroundColor: 'rgba(0,0,0,0.5)' ,
        width:screen.width-32,
        borderRadius:6,
        height:200,
        margin:16,
       
    },
    new:{ 
        marginLeft:40,
        color:'black',
        marginTop:10


    }
})


export default Home;