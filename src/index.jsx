import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRouter from './AppRouter';
import storeInit from './redux';
const { store } = storeInit();
function App() {
  /**
   * Hide Splash after fetch data
   */
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
        <AppRouter />
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
