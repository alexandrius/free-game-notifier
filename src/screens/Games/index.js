import FloatingSwitcher from 'components/FloatingSwitcher';
import ScreenWrapper from 'components/ScreenWrapper';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { getBottomSpace } from 'rn-iphone-helper';
import { getGames } from 'services/supabase';

import GameItem from './Item';

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 16,
    paddingBottom: 80 + getBottomSpace(),
  },
});

export default function GameList({ navigation }) {
  const [games, setGames] = useState();
  const [selectedStore, setSelectedStore] = useState(0);
  const [expanded, setExpanded] = useState();

  useEffect(() => {
    getGames().then(({ data }) => {
      setGames(data);
    });
  }, []);

  return (
    <ScreenWrapper title='100% Discount'>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {games?.map((game, index) => (
          <GameItem
            {...game}
            key={game.id.toString()}
            expanded={index === expanded}
            onPress={() => {
              if (expanded === index) setExpanded();
              else setExpanded(index);
            }}
          />
        ))}
      </ScrollView>

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
