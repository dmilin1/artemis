import React, { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ThemeContext } from '../../contexts/ThemeContext';
import RedditView from '../../components/RedditView';
import Posts from './posts';
import Inbox from './inbox';



const Tab = createBottomTabNavigator();

export default function Tabs() {
  const theme = useContext(ThemeContext);

  const tabBarStyle = {
    backgroundColor: theme.background,
    borderTopWidth: 0,
  }
  
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      sceneContainerStyle={{ backgroundColor: theme.background }}
    >
      <Tab.Screen
        name="Posts"
        options={{
          title: 'Posts',
          headerShown: false,
          tabBarStyle,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="post" size={size} color={color} />,
        }}
        component={Posts}
      />
      <Tab.Screen
        name="Inbox"
        options={{
          title: 'Inbox',
          headerShown: false,
          tabBarStyle,
          tabBarIcon: ({ color, size }) => <Entypo name="mail" size={size} color={color} />,
        }}
        component={Inbox}
      />
    </Tab.Navigator>
  );
}