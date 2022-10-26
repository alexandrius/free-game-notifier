import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import Root from './src/root';

StatusBar.setBarStyle('light-content');

export default function App() {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
