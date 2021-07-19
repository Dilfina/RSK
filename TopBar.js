import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
console.log(screen.width);

const TopBar=(props)=>{

    const id = props.id;

    const routes = [
        {
            title: 'Главная',
            route: 'Home'
        },
        {
            title: 'РСК',
            route: 'RSK'
        },
        {
            title: 'Новости',
            route: 'NewsHome'
        },
        {
            title: 'Брифинг',
            route: 'Briefing'
        },
        {
            title: 'Медиагалерея',
            route: 'Media'
        },
    ]

    const renderItem = ({item, index}) => (
        <TouchableOpacity style={styles.head} onPress={() => props.navigation.navigate(item.route)}>
            <Text style={{fontSize:21, fontWeight:'700'}}>{item.title}</Text>
            {
                id == index &&
                <View style={{
                    width:'100%' ,
                    borderBottomColor: '#0E3F8B',
                    backgroundColor:'#0E3F8B',
                    borderWidth: 3.2
                    }}
                />
                
                
            }
        </TouchableOpacity>
    )

    return(
        <View style={styles.container}>
            <FlatList 
                data={routes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                initialScrollIndex={id}
                getItemLayout={(data, index) => (
                    {length: 120, offset: 120 * index, index}
                  )}
            />
        </View>

    );

}
const styles=StyleSheet.create({
    container:{
       
        width:screen.width

    },
    head:{
        margin:6
        
    }

})
export default TopBar;
