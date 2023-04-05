import { Touchable as BetterTouchable } from 'react-native-better-touchable';

function Touchable(props) {
  return <BetterTouchable activeOpacity={0.8} {...props} />;
}

export { Touchable };
