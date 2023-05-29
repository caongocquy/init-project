import React from 'react';
import { AppState, AppStateStatus } from 'react-native';
import {
  checkMultiple,
  checkNotifications,
  RESULTS,
  /* Type */ Permission,
  PermissionStatus,
} from 'react-native-permissions';

import { PermissionNameType, PermissionStatusType, StatusType } from './type';

import { getPermissionName } from './requestPermission';

export default function useCheckPermissions(permissionNames: PermissionNameType[]) {
  const [permissionStatusList, setPermissionStatusList] = React.useState<PermissionStatusType>({});
  const appState = React.useRef<AppStateStatus>(AppState.currentState);

  const permissionList = React.useMemo<Record<string, Permission>>(() => {
    let temp = {};
    permissionNames.forEach((permissionName: PermissionNameType) => {
      const nameFromModule = getPermissionName(permissionName);
      if (nameFromModule) temp = { ...temp, [permissionName]: nameFromModule };
    });
    return temp || {};
  }, []);

  React.useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') checkPermission();
      appState.current = nextAppState;
    };

    const checkPermission = async () => {
      let statusList: PermissionStatusType;

      let notificationResponse = {};
      try {
        notificationResponse = await checkNotifications();
      } catch (error) {
        /* */
      }
      statusList = {
        notifications: {
          ...getPermissionStatus(notificationResponse?.status),
          settings: notificationResponse?.settings || {},
        },
      };

      let permissionResponse = {};
      try {
        permissionResponse = await checkMultiple(Object.values(permissionList));
      } catch (error) {
        /* */
      }
      Object.entries(permissionList).forEach(([key, value]) => {
        statusList = {
          ...statusList,
          [key]: getPermissionStatus(permissionResponse?.[value]),
        };
      });
      setPermissionStatusList(currentStatusList => {
        const isDifferent = currentStatusList
          ? Object.keys(statusList || {}).some(
              key => statusList?.[key]?.isGranted !== currentStatusList?.[key]?.isGranted
            )
          : true;
        return isDifferent ? statusList : currentStatusList;
      });
    };

    const getPermissionStatus = (permissionStatus: PermissionStatus): StatusType => {
      switch (permissionStatus) {
        case RESULTS.GRANTED:
          return { isGranted: true, status: 'granted' };
        case RESULTS.UNAVAILABLE:
          return { isGranted: false, status: 'unavailable' };
        case RESULTS.DENIED:
          return { isGranted: false, status: 'denied' };
        case RESULTS.BLOCKED:
          return { isGranted: false, status: 'blocked' };
        default:
          return { isGranted: false, status: 'unknown' };
      }
    };

    checkPermission();
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return permissionStatusList;
}
