export type PermissionNameType =
  | 'notifications'
  | 'camera'
  | 'photo'
  | 'writeExternalStorageAndroid'
  | 'locationAlways'
  | 'locationWhenInUse'
  | 'contact'
  | 'record';

export type StatusType = {
  isGranted: boolean;
  status: 'unavailable' | 'denied' | 'blocked' | 'granted' | 'unknown';
  settings?: Object;
};

export type PermissionStatusType = { [key in PermissionNameType]?: StatusType } | undefined;
