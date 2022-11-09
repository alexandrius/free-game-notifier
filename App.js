import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fill } from 'styles/common';

import Root from './src/root';

StatusBar.setBarStyle('light-content');

export default function App() {
  return (
    <GestureHandlerRootView style={fill}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
