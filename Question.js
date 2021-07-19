import React, { Fragment, useState, useCallback,useEffect} from 'react';
import { StyleSheet, Linking, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Open from '../components/Open';
import Name from '../components/Name';


const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width); 
const Question=(props)=>{

    const domen = 'https://rsk.almaty.kz';

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        axios.get('questions')
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
        <View style={{flex:1}}>
            <Open {...props}/>
            <Name {...props} style={{
                button1: {
                    borderColor:'white',
                    borderWidth:2,
                    height:50,
                    justifyContent:'center',
                    alignItems:'center',
                    width:screen.width-36,
                    margin:18
                },
                button2: {
                    borderColor:'white',
                    backgroundColor:'white',
                    borderWidth:2,
                    height:50,
                    justifyContent:'center',
                    alignItems:'center',
                    width:screen.width-36,
                    margin:18
                },
                text1: {
                    fontFamily:'SF Pro Display',
                    fontWeight:'600',
                    fontSize:18,
                    color:'white'
                },
                text2: {
                    fontFamily:'SF Pro Display',
                    fontWeight:'600',
                    fontSize:18,
                    color:'#0E3F8B'
                }
            }}/>
            
        </View>
    );
}
const styles=StyleSheet.create({

}

);
export default Question;