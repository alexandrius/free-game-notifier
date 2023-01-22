import { Image as RNImage } from 'react-native';
import { isStandaloneBuild } from 'utils/quick';

let ExpoImage;
if (isStandaloneBuild()) {
  ExpoImage = require('expo-image').Image;
}

export default ExpoImage || RNImage;
