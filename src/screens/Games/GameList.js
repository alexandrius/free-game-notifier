import { FlashList } from '@shopify/flash-list';
import FloatingSwitcher from 'components/FloatingSwitcher';
import ScreenWrapper from 'components/ScreenWrapper';
import React, { useEffect, useState } from 'react';
import { getGames } from 'services/supabase';

import GameItem, { ITEM_HEIGHT } from './GameItem';

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
      />

      <FloatingSwitcher options={[{ title: 'All' }, { title: 'Steam' }]} />
    </ScreenWrapper>
  );
}
