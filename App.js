import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import News from './src/screens/News';
import Briefing from './src/screens/Briefing';
import axios from 'axios';
import 'react-native-gesture-handler';
import Navigator from './src/navigations/index';
import Open from './src/components/Open';
import Media from './src/screens/Media';
import { strings } from './localization/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect } from 'react/cjs/react.production.min';

import Name from './src/components/Name';



const App = () => {

  axios.defaults.baseURL = 'https://rsk.almaty.kz/api/';

  const getLang=async()=>{
    try {
      const value = await AsyncStorage.getItem('lang');
      console.log(value);
      if(value !== null) {
        // value previously stored
        strings.setLanguage(value);
        axios.defaults.headers.locale = value;
      }
      else {
        strings.setLanguage('kz');
        axios.defaults.headers.locale = 'kz';
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getLang();
  }, []);

  return(
    <Navigator/>
    //<Name/>
    // <Open/>
    //<Media/>
  );
}

export default App;



