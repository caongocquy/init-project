import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Screen1 from 'src/screen/screen-1';
import Screen2 from 'src/screen/screen-2';
import Screen3 from 'src/screen/screen-3';
import Screen4 from 'src/screen/screen-4';


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      // tabBar={props => <Tabbar {...props} />}
      tabBarOptions={{keyboardHidesTabBar: true}}>
      <Tab.Screen
        name={'Screen1'}
        component={Screen1}
        options={{keyboardHidesTabBar: true, headerShown: false}}
      />
      <Tab.Screen options={{keyboardHidesTabBar: true, headerShown: false}} name={'Screen2'} component={Screen2} />
      <Tab.Screen options={{keyboardHidesTabBar: true, headerShown: false}} name={'Screen3'} component={Screen3} />
      <Tab.Screen options={{keyboardHidesTabBar: true, headerShown: false}} name={'Screen4'} component={Screen4} />
    </Tab.Navigator>
  );
}
