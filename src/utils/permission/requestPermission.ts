import { Linking, Alert, AlertButton, Platform } from 'react-native';
import {
  request,
  requestMultiple,
  requestNotifications,
  /* type */ Permission,
  PERMISSIONS,
} from 'react-native-permissions';

import { PermissionNameType } from './type';

export function getPermissionName(permissionName: PermissionNameType): Permission | undefined {
  if (Platform.OS === 'android') {
    switch (permissionName) {
      case 'camera':
        return PERMISSIONS.ANDROID.CAMERA;
      case 'photo':
        return PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE; // only read photo and file
      // special platform permission
      case 'writeExternalStorageAndroid':
        return PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
      // case 'locationAlways':
      //   return PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
      // case 'locationWhenInUse':
      //   return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      case 'contact':
        return PERMISSIONS.ANDROID.READ_CONTACTS;
      case 'record':
        return PERMISSIONS.ANDROID.RECORD_AUDIO;
      default:
        return undefined;
    }
  } else {
    switch (permissionName) {
      case 'camera':
        return PERMISSIONS.IOS.CAMERA;
      case 'photo':
        return PERMISSIONS.IOS.PHOTO_LIBRARY; // read and write, only photo
      // special platform permission
      case 'locationAlways':
        return PERMISSIONS.IOS.LOCATION_ALWAYS;
      case 'locationWhenInUse':
        return PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      case 'contact':
        return PERMISSIONS.IOS.CONTACTS;
      case 'record':
        return PERMISSIONS.IOS.MICROPHONE;
      default:
        return undefined;
    }
  }
}

type PermissionNameWithNotificationType = PermissionNameType | 'notifications';

const DEFAULT_MESSAGE: Partial<
  Record<PermissionNameWithNotificationType | 'default', { title: string; blocked: string; unavailable: string }>
> = {
  camera: {
    title: 'You need to allow access camera',
    blocked: 'Please go to app Setting -> allow access camera ',
    unavailable: 'Your device does not support or have limited camera usage',
  },
  photo: {
    title: 'You need to allow access photo',
    blocked: 'Please go to app Setting -> allow access photo',
    unavailable: 'Your device does not support or have limited photo usage',
  },
  notifications: {
    title: 'MGI need access notifications permission',
    blocked: 'Please go to app Setting -> allow access notification',
    unavailable: 'Your device does not support or have limited photo usage',
  },
  writeExternalStorageAndroid: {
    title: 'Save to device',
    blocked: 'Please go to app Setting -> allow access save to device',
    unavailable: 'Your device does not support',
  },
  locationAlways: {
    title: 'MGI need access location always permission',
    blocked: 'Please go to app Setting -> allow access location',
    unavailable: 'Your device does not support',
  },
  locationWhenInUse: {
    title: 'MGI need access location in use permission',
    blocked: 'Please go to app Setting -> allow access location in use',
    unavailable: 'Your device does not support',
  },
  record: {
    title: 'You need to allow access microphone',
    blocked: 'Please go to app Setting -> allow access microphone',
    unavailable: 'Your device does not support or have limited microphone usage',
  },
};

function alertPermission(name: PermissionNameWithNotificationType, status: 'blocked' | 'unavailable') {
  const buttonConfig: AlertButton[] = [{ text: 'Bỏ qua' }];
  if (status === 'blocked') {
    const openSetting = () => {
      Linking.openSettings().catch(() => Alert.alert('Không thể mở cài đặt, vui lòng thao tác thủ công'));
    };
    buttonConfig.push({ text: 'Mở cài đặt', onPress: openSetting });
  }

  const defaultMessage = name in DEFAULT_MESSAGE ? DEFAULT_MESSAGE[name] : DEFAULT_MESSAGE.default;

  if (defaultMessage) {
    Alert.alert(defaultMessage.title, defaultMessage[status], buttonConfig, { cancelable: true });
  }
}

async function requestPermission(permissionNames: PermissionNameWithNotificationType[]) {
  const realNameList: Permission[] = [];
  const permissionNameList: PermissionNameType[] = [];

  let hasNotification = false;
  permissionNames.forEach(name => {
    if (name === 'notifications') {
      hasNotification = true;
      return;
    }
    const realName = getPermissionName(name);
    if (realName) {
      realNameList.push(realName);
      permissionNameList.push(name);
    }
  });

  if (hasNotification) {
    try {
      const { status } = (await requestNotifications(['alert', 'badge', 'sound'])) || {};
      if (status === 'blocked' || status === 'unavailable') {
        alertPermission('notifications', status);
        return;
      }
    } catch (error) {
      /* TODO tracking */
    }
  }

  if (realNameList.length === 0) return;
  if (realNameList.length === 1) {
    try {
      const indexOfFistItem = 0;
      const status = await request(realNameList[indexOfFistItem]);
      if (status === 'blocked' || status === 'unavailable') {
        alertPermission(permissionNameList[indexOfFistItem], status);
        return;
      }
    } catch (error) {
      /* TODO tracking */
    }
    return;
  }

  try {
    const result = await requestMultiple(realNameList);
    Object.entries(result).every(([realName, status]) => {
      if (!(status === 'blocked' || status === 'unavailable')) return true;
      const index = realNameList.findIndex(name => name === realName);
      if (index >= 0) alertPermission(permissionNameList[index], status);
      return false;
    });
  } catch (error) {
    /* TODO tracking */
  }
}

export default requestPermission;
