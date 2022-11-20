import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { isStandaloneBuild } from 'utils/quick';

export default isStandaloneBuild() ? FastImage : Image;
