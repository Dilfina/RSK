import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Briefing from '../screens/Briefing';
import Home from '../screens/Home';
import MenuBar from '../screens/MenuBar';
import News from '../screens/News';
import OpenBriefing from '../screens/open_briefing';
import Media from '../screens/Media';
import Photo from '../screens/Photo';
import Video from '../screens/Video';
import OpenPhoto from '../screens/OpenPhoto';
import NewsHome from '../screens/NewsHome';
import OpenNews from '../screens/OpenNews';
import Question from '../screens/Question';
import Name from '../components/Name';


const Stack = createStackNavigator();

const Navigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Briefing" component={Briefing} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="News" component={News} options={{headerShown: false}}/>
                <Stack.Screen name="MenuBar" component={MenuBar} options={{headerShown: false}}/>
                <Stack.Screen name="OpenBriefing" component={OpenBriefing} options={{headerShown: false}}/>
                <Stack.Screen name="Media" component={Media} options={{headerShown: false}}/>
                <Stack.Screen name="Photo" component={Photo} options={{headerShown: false}}/>
                <Stack.Screen name="Video" component={Video} options={{headerShown: false}}/>
                <Stack.Screen name="OpenPhoto" component={OpenPhoto} options={{headerShown: false}}/>
                <Stack.Screen name="NewsHome" component={NewsHome} options={{headerShown: false}}/>
                <Stack.Screen name="OpenNews" component={OpenNews} options={{headerShown: false}}/>
                <Stack.Screen name="Question" component={Question} options={{headerShown: false}}/>
                <Stack.Screen name="Name" component={Name} options={{headerShown: false}}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;