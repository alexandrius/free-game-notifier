import { StyleSheet, View } from 'react-native';

import Root from './src/root';

export default function App() {
  return (
    <View style={styles.container}>
      <Root />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
