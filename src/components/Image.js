import Constants, { AppOwnership } from 'expo-constants';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

export default Constants.appOwnership !== AppOwnership.Expo ? FastImage : Image;
