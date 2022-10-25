import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { getGames } from 'services/supabase';
import Colors from 'styles/colors';

import GameItem, { ITEM_HEIGHT } from './Game';

export default function GameList() {
  const [games, setGames] = useState();

  useEffect(() => {
    getGames().then(({ data }) => {
      setGames(data);
    });
  }, []);

  return (
    <View style={styles.root}>
      <FlashList
        data={games}
        renderItem={({ item }) => <GameItem {...item} />}
        estimatedItemSize={ITEM_HEIGHT}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: getStatusBarHeight() + 10,
  },
});
