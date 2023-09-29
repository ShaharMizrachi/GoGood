import {PermissionsAndroid, Linking} from 'react-native';
import notifee, {AuthorizationStatus} from '@notifee/react-native';

export async function checkNotificationPermission() {
  const settings = await notifee.getNotificationSettings();

  if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
    return true;
  } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
    return false;
  }
}
export async function askNotificationPermissions() {
 return notifee.requestPermission().then(settings => {
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      return true;
    } else {
      console.log('User declined permissions');
      return false;
    }
  });
}

export const checkLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted;
  } catch (error) {
    console.warn('Error checking location permission:', error);
    return false;
  }
};
export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === 'never_ask_again') {
      changeFromSettings();
      return false;
    }
    return true;
  } catch (error) {
    console.warn('Error asking for location permission:', error);
  }
};
export const changeFromSettings = async () => {
  Linking.openSettings();
};
