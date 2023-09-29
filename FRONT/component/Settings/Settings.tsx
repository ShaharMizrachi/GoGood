import {View, Text, TouchableOpacity, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SettingsProps} from './SettingsProps';
import styles from './SettingsStyles';
import NavBar from '../ui/NavBar';
import {hebrew} from '../Hebrew';
import SideArrow from '../../assets/images/SideArrow';
import {useModal} from 'react-native-modalfy';
import {privacyText, termsText} from '../../assets/Text/const';
import {
  askNotificationPermissions,
  changeFromSettings,
  checkLocationPermission,
  checkNotificationPermission,
  requestLocationPermission,
} from '../../Helpers/Permissions';

export const Settings = ({navigation}: SettingsProps) => {
  const [notification, setNotification] = useState(false);
  const [location, setLocation] = useState(false);
  const {openModal} = useModal();

  const openTermsModal = () => {
    openModal('TermsModal', {title: hebrew.terms, body: termsText});
  };
  const openPrivacyModal = () => {
    openModal('TermsModal', {
      title: hebrew.privacy_policy,
      body: privacyText,
      withButton: false,
    });
  };
  useEffect(() => {
    checkLocationPermission().then(res => {
      setLocation(res);
    });
    checkNotificationPermission()
      .then(res => {
        setNotification(res!);
      })
      .catch(e => console.log(e));
  }, []);
  const onLocationPress = () => {
    if (location) changeFromSettings();
    else requestLocationPermission().then((r: any) => setLocation(r));
  };
  const onNotificationPress = () => {
    if (!notification)
      askNotificationPermissions().then(r => setNotification(r));
    else changeFromSettings();
  };
  const deleteAccount = () => {
    openModal('ConfirmDeleteAccount');
  };
  return (
    <>
      <NavBar
        title={hebrew.settings}
        navigateBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.notification}>
          <Text style={styles.title}>{hebrew.notification}</Text>
          <View style={styles.row}>
            <Switch
              trackColor={{false: '#cecece', true: '#69d7c7'}}
              thumbColor={notification ? 'white' : '#f4f3f4'}
              onValueChange={onNotificationPress}
              value={notification}
            />
            <Text style={styles.rowText}>{hebrew.receive_notification}</Text>
          </View>
          <View style={styles.row}>
            <Switch
              trackColor={{false: '#cecece', true: '#69d7c7'}}
              thumbColor={location ? 'white' : '#f4f3f4'}
              onValueChange={onLocationPress}
              value={location}
            />
            <Text style={styles.rowText}>{hebrew.location_permission}</Text>
          </View>
        </View>
        <View style={styles.general}>
          <Text style={styles.title}>{hebrew.general}</Text>
          <TouchableOpacity style={styles.row} onPress={openPrivacyModal}>
            <SideArrow />
            <Text style={styles.rowText}>{hebrew.privacy}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={openTermsModal}>
            <SideArrow />
            <Text style={styles.rowText}>{hebrew.terms}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteAccount()} style={styles.row}>
            <SideArrow />
            <Text style={styles.rowText}>{hebrew.deleteAccount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
