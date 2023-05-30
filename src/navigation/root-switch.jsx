import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';


import MainStack from './main-stack';
import SplashScreen from 'react-native-splash-screen';
import Modal from 'src/modal';
import {modalTransition} from './TransitionConfiguration';
const Stack = createStackNavigator();

function RootStack() {
  /**
   * Hide Splash after fetch data
   */
  SplashScreen.hide();
  function ModalScreen() {
    return Object.entries(Modal).map(([key, screen]: any) => (
      <Stack.Screen
        key={key}
        name={screen.name}
        component={screen.component}
        initialParams={screen.params}
        options={screen.options}
      />
    ));
  }

  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'transparentModal',
        headerShown: false,
        ...modalTransition,
      }}>
      <Stack.Screen
      name={'main'}
      component={MainStack}
      options={{
        animationEnabled: false,
      }}
    />
      {ModalScreen()}
    </Stack.Navigator>
  );
}

export default RootStack;
