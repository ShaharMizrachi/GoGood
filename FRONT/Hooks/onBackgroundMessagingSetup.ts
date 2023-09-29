import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoginContext} from '../component/context/Context';
const onBackgroundMessagingSetup = () => {
  const {setLastNotification} = useLoginContext();
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // try {
      //   setLastNotification(remoteMessage);

      //   console.log('Last message saved in AsyncStorage:', remoteMessage);
      // } catch (error) {
      //   console.error('Error saving last message in AsyncStorage:', error);
      // }
    });
  }, []);

  return null;
};

export default onBackgroundMessagingSetup;
