import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import React, {useEffect, useRef} from 'react';
import {useModal} from 'react-native-modalfy';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../component/Interfaces';
import {displayNotification} from '../Helpers/Notifications';
import {convertKeysToLowercase} from '../Helpers/objects';
import {useLoginContext} from '../component/context/Context';
import {Alert} from 'react-native';

export const useOnMesssage = () => {
  const {openModal, closeAllModals} = useModal();
  const notificationRef = useRef<FirebaseMessagingTypes.RemoteMessage>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNotificationEvent = async (e: any) => {
    closeAllModals();
    const pressAction: string = e.detail?.pressAction?.id || '';
    const mainComponent = e.detail.pressAction?.mainComponent;
    if (pressAction === 'continueToModal') {
      if (mainComponent) {
        let jsonData = notificationRef.current?.data?.post ?? '';
        let idToDisplay = notificationRef.current?.data?.idToDisplay ?? '';
        try {
          jsonData = JSON.parse(jsonData);
          if (idToDisplay !== '') {
            idToDisplay = JSON.parse(idToDisplay);
          }
        } catch {
          console.log('error parsing post in useOnMessage');
        }
        if (mainComponent === 'Reviews') {
          return navigation.navigate('Reviews', {id: idToDisplay});
        }
        if (mainComponent === 'PostDetailes') {
          return navigation.navigate('PostDetailes', {
            post: convertKeysToLowercase(jsonData as any) as any,
          });
        } else {
          openModal(mainComponent, {
            post: jsonData,
            idToDisplay,
          });
        }
      }
    }
  };

  useEffect(() => {
    const onMessage = messaging().onMessage(async remoteMessage => {
      notificationRef.current = remoteMessage;
      const mainComponent = remoteMessage.data?.popUpName ?? '';
      await notifee.createChannel({
        id: remoteMessage.messageId ?? 'testId',
        name: 'Default Channel',
      });
      await displayNotification(remoteMessage, mainComponent);
    });

    messaging()
      .getInitialNotification()
      .then(async notification => {
        if (notification) {
          notificationRef.current = notification;
          const mainComponent = notification.data?.popUpName ?? '';
          await handleNotificationEvent({
            detail: {pressAction: {id: 'continueToModal', mainComponent}},
          });
        }
      });
    const notificationOpenedAppSubscription =
      messaging().onNotificationOpenedApp(async remoteMessage => {
        notificationRef.current = remoteMessage;
        const mainComponent = remoteMessage.data?.popUpName ?? '';
        await notifee.createChannel({
          id: remoteMessage.messageId ?? 'testId',
          name: 'Default Channel',
        });
        await handleNotificationEvent({
          detail: {pressAction: {id: 'continueToModal', mainComponent}},
        });
      });

    const foregroundEventSubscription = notifee.onForegroundEvent(
      handleNotificationEvent,
    );

    return () => {
      onMessage();
      notificationOpenedAppSubscription();
      foregroundEventSubscription();
    };
  }, []);

  return null;
};
