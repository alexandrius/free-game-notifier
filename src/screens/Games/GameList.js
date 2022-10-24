import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getGames } from 'services/supabase';

export default function GameList() {
  const [games, setGames] = useState();
  useEffect(() => {
    getGames().then((data) => {
      setGames(data.data);
    });
  }, []);

  return (
    <View style={styles.root}>
      <Text>{JSON.stringify(games)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
