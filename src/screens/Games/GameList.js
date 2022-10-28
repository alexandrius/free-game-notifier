import { FlashList } from '@shopify/flash-list';
import FloatingSwitcher from 'components/FloatingSwitcher';
import ScreenWrapper from 'components/ScreenWrapper';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { getGames } from 'services/supabase';

import GameItem, { ITEM_HEIGHT } from './GameItem';

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 16,
    paddingBottom: 80 + getBottomSpace(),
  },
});

export default function GameList() {
  const [games, setGames] = useState();

  useEffect(() => {
    getGames().then(({ data }) => {
      setGames(data);
    });
  }, []);

  return (
    <ScreenWrapper title='100% Discount'>
      <FlashList
        data={games}
        renderItem={({ item }) => <GameItem {...item} />}
        estimatedItemSize={ITEM_HEIGHT}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <FloatingSwitcher options={[{ title: 'All' }, { title: 'Steam' }]} />
    </ScreenWrapper>
  );
}
