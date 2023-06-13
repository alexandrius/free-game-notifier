import Constants, { AppOwnership } from 'expo-constants';
import { Platform } from 'react-native';

// eslint-disable-next-line no-undef
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(price) {
  return formatter.format(price / 100);
}

export const ExpoGo = Constants.appOwnership === AppOwnership.Expo;
export const iOS = Platform.OS === 'ios';
export const Android = Platform.OS === 'android';
