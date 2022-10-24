import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';

import Details from './screens/Games/Details';
import GameList from './screens/Games/GameList';

const Stack = createStackNavigator();

const StackNavigatorConfig = ({ route }) => {
  return {
    ...TransitionPresets.SlideFromRightIOS,
    headerShown: false,
    cardStyle: { backgroundColor: 'white' },
    gestureEnabled: Platform.select({ ios: route.params?.gestureEnabled, default: false }),
  };
};

export default function Root() {
  return (
    <Stack.Navigator screenOptions={StackNavigatorConfig}>
      <Stack.Screen name='GameList' component={GameList} />
      <Stack.Screen name='Details' component={Details} />
    </Stack.Navigator>
  );
}
