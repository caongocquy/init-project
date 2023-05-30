import React from 'react';
import {
  createStackNavigator, TransitionPresets,
} from '@react-navigation/stack';

import HomeTabs from 'src/navigation/home-tabs';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={'home_tab'}
      mode="card"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
        // presentation: 'transparentModal',
        headerShown: false,
        // ...modalTransition,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'home_tab'}
        component={HomeTabs}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
