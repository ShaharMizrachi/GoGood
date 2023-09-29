import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import React, {useEffect, useCallback} from 'react';
import {useLoginContext} from '../component/context/Context';

export const useGetToken = () => {
  const {setUser, user} = useLoginContext();

  useEffect(() => {
    const getFcmToken = async () => {
      const token = await messaging().getToken();
      if (token) {
        setUser({...user, FcmToken: token});
        console.log('Your Firebase Token is:', token);
      } else {
        console.log('Failed', 'No token received');
      }
    };

    getFcmToken();
  }, []);
};
