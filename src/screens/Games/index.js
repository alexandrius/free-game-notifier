import { FlashList } from '@shopify/flash-list';
import FloatingSwitcher from 'components/FloatingSwitcher';
import ScreenWrapper from 'components/ScreenWrapper';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getBottomInset, getTopInset } from 'rn-iphone-helper';
import { getGames } from 'services/supabase';

import Details from './Details';
import Item from './Item';

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: getTopInset() + 60,
    paddingBottom: 80 + getBottomInset(),
  },
});

export default function GameList({ navigation }) {
  const [games, setGames] = useState();
  const [selectedStore, setSelectedStore] = useState(0);
  const itemPageYRef = useRef(0);
  const [expanded, setExpanded] = useState(-1);

  useEffect(() => {
    getGames().then(({ data }) => {
      setGames(data);
    });
  }, []);

  return (
    <ScreenWrapper title='100% Discount'>
      <View style={StyleSheet.absoluteFill}>
        <FlashList
          contentContainerStyle={styles.contentContainerStyle}
          estimatedItemSize={310}
          data={games}
          extraData={expanded}
          renderItem={({ item, index }) => {
            return (
              <Item
                {...item}
                expanded={index === expanded}
                onPress={({ pageY }) => {
                  itemPageYRef.current = pageY;
                  setExpanded(index);
                  setGames([...games]);
                }}
              />
            );
          }}
        />
      </View>

      <FloatingSwitcher
        hidden={expanded >= 0}
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
      {expanded >= 0 && (
        <Details pageYRef={itemPageYRef} game={games[expanded]} onClose={() => setExpanded(-1)} />
      )}
    </ScreenWrapper>
  );
}
