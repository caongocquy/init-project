import React from 'react';
import { StatusBar, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import RootStack from 'src/navigation/root-switch';

function AppRouter(props) {
  const barStyle = 'dark-content';
  
  return(
    <View style={{ flex: 1 }}>
        <StatusBar
            translucent
            barStyle={barStyle}
            backgroundColor="transparent"
          />
          <RootStack />
        <FlashMessage position="top" />
      </View>
  )

}
export default AppRouter;
