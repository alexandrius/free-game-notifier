import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Details from './screens/Games/Details';
import GameList from './screens/Games/GameList';

const Stack = createSharedElementStackNavigator();

const StackNavigatorConfig = ({ route }) => {
  return {
    headerShown: false,
    gestureEnabled: false,
  };
};

export default function Root() {
  return (
    <Stack.Navigator detachInactiveScreens={false} screenOptions={StackNavigatorConfig}>
      <Stack.Screen name='GameList' component={GameList} />
      <Stack.Screen
        name='Details'
        component={Details}
        sharedElements={(route, otherRoute, showing) => {
          const { game } = route.params;
          return [`${game.id}.photo`];
        }}
      />
    </Stack.Navigator>
  );
}
