import Constants, { AppOwnership } from 'expo-constants';
import { Image as RNImage } from 'react-native';
import FastImage from 'react-native-fast-image';

const Image = Constants.appOwnership !== AppOwnership.Expo ? FastImage : RNImage;

export default Image;
