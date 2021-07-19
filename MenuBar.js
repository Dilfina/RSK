import React, { Fragment, useState, useCallback } from 'react';
import { StyleSheet, Linking, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { useEffect } from 'react';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { strings } from '../../localization/localization';

import Name from '../components/Name';


const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);


const MenuBar = (props) => {
    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [contacts, setContacts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openRSK, setOpenRSK] = useState(false);
    const menu = useRef(null);


    const getData = () => {
        axios.get('pages')
        .then(res => {
            console.log(res);
            setData(res);
            getContact();
        }).catch(err => console.log(err));
    }

    const getContact = () => {
        axios.get('contacts')
        .then(res => {
            console.log(res);
            setContacts(res);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, []);

    const openDialScreen = (num) => {
        let number;
        if (Platform.OS === 'ios') {
            number = `telprompt:${num}`;
        } else {
            number = `tel:${num}`;
        }
        Linking.openURL(number);
    }

    const SMButton = ({url, children}) => {
        const handlePress = useCallback(async () => {

        const supported = await Linking.canOpenURL(url);
            
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
        }, [url]);
        return(
            <TouchableOpacity style={styles.socials} onPress={handlePress}>
                {children}
            </TouchableOpacity>
        )
    }

//onPress={() => Linking.openURL('mailto:' + contacts.email + '?subject=abcdefg&body=body')}
    const showMenu = () => {
        menu.current.show();
    }

    const hideMenu = (option) => {
        AsyncStorage.setItem('lang', option);
        RNRestart.Restart();
    }

    const routes = [
        {
            title: strings.main,
            route: 'Home'
        },
        {
            title: strings.rsk,
            route: 'RSK'
        },
        {
            title: strings.news,
            route: 'NewsHome'
        },
        {
            title: strings.briefing,
            route: 'Briefing'
        },
        {
            title: strings.photo,
            route: 'Photo'
        },
        {
            title: strings.video,
            route: 'Video'
        },
        {
            title: strings.answer,
            route: 'answer'
        }
    ]

    const renderItems=({item})=>(
        <View>
           <TouchableOpacity>
               <Text style={styles.txt}>{item.title_kz}</Text>
           </TouchableOpacity>

        </View>
    )

    const renderItem = ({item}) => (
        <Fragment>
            {
                item.title != strings.rsk ?
                <TouchableOpacity style={styles.head} onPress={() => props.navigation.navigate(item.route)}>
                    <Text style={styles.txt}>{item.title}</Text>
                    
                </TouchableOpacity>
                :
                <View style={{flex:1}}>
                    <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setOpenRSK(openRSK ? false : true)}>
                        <Text style={styles.txt}>{item.title}</Text>
                        {
                            openRSK ?
                            <FastImage source={require('../assets/upload.png')} style={{width:15, height:15,marginTop:18}}/>
                            :
                            <FastImage source={require('../assets/white.png')} style={{width:15, height:15,marginTop:18}}/>
                        }
                    </TouchableOpacity>
                {
                    openRSK &&  
                    <FlatList
                        data={data.data.pages}
                        renderItem={renderItems}     
                        keyExtractor={(item, index) => index.toString()}   
                        vertical
                        showsVerticalScrollIndicator={false}   
                    />
                }
                </View>
               
            }
            
        </Fragment>
    )
    const renderFooter=()=>(
        <View style={{flex:1}}>
            <Text style={{fontFamily:'SF Pro Display',fontWeight:'500',fontSize:22,margin:10,marginLeft:24,marginTop:20,
        color:'white'}}>Контакты</Text>
        <TouchableOpacity style={{flexDirection:'row', marginLeft:24, marginTop:5, margin:10}} onPress={() => openDialScreen(contacts.data.phone1)}>
        <FastImage source={require('../assets/phone.png')} style={styles.cont}/>
        <Text style={styles.con}>{contacts.data.phone1}</Text>

        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row', marginLeft:24, marginTop:5, margin:10}} onPress={() => openDialScreen(contacts.data.phone2)}>
        <FastImage source={require('../assets/phone.png')} style={styles.cont}/>
        <Text style={styles.con}>{contacts.data.phone2}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row', marginLeft:24, marginTop:5, margin:10}} onPress={() => Linking.openURL('mailto:' + contacts.email + '?subject=abcdefg&body=body')}>
        
        <SMButton url={contacts.data.email}>
            <FastImage source={require('../assets/email.png')} style={styles.cont}/>                           
        </SMButton>
        <Text style={styles.con}>{contacts.data.email}</Text>
        </TouchableOpacity>

        <Name {...props}/>


       {/* <TouchableOpacity style={{marginTop:10}} onPress={()=>props.navigation.navigate("Question")}>
        <View style={styles.hover}>
            <Text style={styles.quest}>Отправить вопрос</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:-10, marginBottom:30}}>
        <View style={styles.hover1}>
            <Text style={styles.quest1}>Акредитация на брифинг</Text>
        </View>
    </TouchableOpacity>*/}
        </View>
    )

    return(
        <View style={styles.container}> 
        <Menu style={styles.menu}
            ref={menu}
            button={
                <TouchableOpacity onPress={() => showMenu()} style={{flexDirection:'row', marginTop:45, marginLeft:20}}>
                    <Text style={styles.text}> {strings.lang}</Text>
                    <FastImage source={require('../assets/white.png')} style={styles.image}/>
                </TouchableOpacity>
            }
        >
            <MenuItem onPress={() => hideMenu('kz')} >Қазақша</MenuItem>
            <MenuItem onPress={() => hideMenu('ru')}>Русский</MenuItem>
            <MenuItem onPress={() => hideMenu('en')}>English</MenuItem>
            <MenuDivider />
            </Menu>

            <TouchableOpacity style={{marginTop:-40, marginLeft:340}}  onPress={() => props.navigation.goBack()}>
                    <FastImage source={require('../assets/cancel.png')} style={{width:20, height:20}}/>
                </TouchableOpacity>
     
            <View style={{
                    width: screen.width,
                    borderBottomColor: '#496FAA',
                    borderWidth: 1,
                    marginTop:35
                    }}
                />
                {
                    loading ?
                    <ActivityIndicator color='red'/>
                    :
            <FlatList 
                data={routes}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                keyExtractor={(item, index) => index.toString()}
                vertical
            />
                }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E3F8B'
    },
    hover:{
        borderColor:'white',
        borderWidth:2,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        width:screen.width-36,
        margin:18
    },
    hover1:{
        borderColor:'white',
        backgroundColor:'white',
        borderWidth:2,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        width:screen.width-36,
        margin:18
    },
    quest:{
        fontFamily:'SF Pro Display',
        fontWeight:'600',
        fontSize:18,
        color:'white'

    },
    quest1:{
        fontFamily:'SF Pro Display',
        fontWeight:'600',
        fontSize:18,
        color:'#0E3F8B'
    },
    cont:{
        width:17,
        height:17,
        marginTop:3

    },
    con:{
        fontFamily:'SF Pro Display',
        fontWeight:'400',
        fontSize:16,
        color:'white',
        marginLeft:20

    },
    txt:{
        fontFamily:'SF Pro Display',
        fontWeight:'400',
        fontSize:24,
        margin:10,
        marginLeft:24,
        color:'white'
    },
    touch:{


    },
    menu:{
        marginTop:70,
        marginLeft:16
    },
    image:{
        margin:9,
        width:15,
        height:12
    }
    ,
    text:{
        fontFamily:'SF Pro Display',
        fontWeight:'400',
        fontSize:20,
        color:'white',
        

    }
})

export default MenuBar;