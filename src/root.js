import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import GameList from './screens/Games/GameList';

const Stack = createStackNavigator();

const StackNavigatorConfig = ({ route }) => {
  return {
    headerShown: false,
    gestureEnabled: false,
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };
};

export default function Root() {
  return (
    <Stack.Navigator screenOptions={StackNavigatorConfig}>
      <Stack.Screen name='GameList' component={GameList} />
    </Stack.Navigator>
  );
}
