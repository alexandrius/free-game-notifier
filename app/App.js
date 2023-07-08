import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FetchProvider from 'services/fetch/fetch-provider';
import { fill } from 'styles/common';
import { Android } from 'utils/bits';

import Root from './src/root';

if (Android) {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}

StatusBar.setBarStyle('light-content');

export default function App() {
  return (
    <GestureHandlerRootView style={fill}>
      <NavigationContainer>
        <FetchProvider
          aliases={{ default: { baseUrl: 'https://freegames.s-pataridze.workers.dev' } }}>
          <Root />
        </FetchProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
