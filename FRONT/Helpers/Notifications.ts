import notifee from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { hebrew } from '../component/Hebrew';

export async function displayNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    mainComponent: string
) {
    try {
        const channelId = await notifee.createChannel({
            id: remoteMessage.messageId ?? 'testId',
            name: 'Default Channel',
        });

        await notifee.displayNotification({
            title: `<p style="color: #333333;">${remoteMessage.notification?.title}</p>`,
            subtitle: '&#129395;',
            body: `<p style="color: #333333;">${remoteMessage.notification?.body}</p>`,
            android: {
                channelId,
                color: '#333333',
                actions: [
                    {
                        title: `<u><span style="font-weight: bold; text-decoration: underline; color: black;">${hebrew.push_watch_details}</span></u>`,
                        pressAction: { id: 'continueToModal', mainComponent },
                    },
                ],
            },
        });
    } catch (error) {
        console.error('Error displaying notification:', error);
    }
}
