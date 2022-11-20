import Constants, { AppOwnership } from 'expo-constants';

export function isStandaloneBuild() {
  return Constants.appOwnership !== AppOwnership.Expo;
}
