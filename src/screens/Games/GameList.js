import { FlashList } from '@shopify/flash-list';
import FloatingSwitcher from 'components/FloatingSwitcher';
import ScreenWrapper from 'components/ScreenWrapper';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'rn-iphone-helper';
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
  const [selectedStore, setSelectedStore] = useState(0);

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

      <FloatingSwitcher
        selected={selectedStore}
        onSelect={(selected) => setSelectedStore(selected)}
        options={[
          { title: 'All' },
          { title: 'Steam' },
          { title: 'Epic Games Launcher' },
          { title: 'Xbox Store' },
          { title: 'Nintendo eShop' },
        ]}
      />
    </ScreenWrapper>
  );
}
