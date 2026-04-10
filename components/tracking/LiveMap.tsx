import { Platform } from 'react-native';
import { LiveMap as NativeLiveMap } from './LiveMap.native';
import { LiveMap as WebLiveMap } from './LiveMap.web';

export const LiveMap = Platform.OS === 'web' ? WebLiveMap : NativeLiveMap;
