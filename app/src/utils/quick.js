import Constants, { AppOwnership } from 'expo-constants';

export function isStandaloneBuild() {
  return Constants.appOwnership !== AppOwnership.Expo;
}

// eslint-disable-next-line no-undef
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(price) {
  return formatter.format(price / 100);
}
