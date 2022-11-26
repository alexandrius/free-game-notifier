import { View, StyleSheet } from 'react-native';
import { getTopInset } from 'rn-iphone-helper';
import Colors from 'styles/colors';

import Text from './Text';

export default function ScreenWrapper({ title, renderHeaderRight, children }) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {renderHeaderRight?.()}
      </View>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: getTopInset() + 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 40,
  },
});
