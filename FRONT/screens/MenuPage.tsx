import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useLoginContext} from '../component/context/Context';
import {hebrew} from '../component/Hebrew';
import {RootStackParamList} from '../component/Interfaces';
import IconButton from '../component/ui/IconButton';
import colors from '../styles/colors';
import AreYouSureExit from './AreYouSureExit';
import SeeYouNextTime from './SeeYouNextTime';
import PoweredByZigit from '../assets/images/PoweredByZigit';
import {useModal} from 'react-native-modalfy';

const MenuPage = ({setOpenMenu}: {setOpenMenu: Function}) => {
  const {user, setActiveCurrentType, activeCurrentType} = useLoginContext();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [currentTypeNevigetorHolder, setCurrentTypeNevigetorHolder] =
    useState<string>('');

  const navigationTO = () => {
    setOpenMenu(false);
    if (currentTypeNevigetorHolder.length > 0)
      setActiveCurrentType(
        activeCurrentType === 'GettingHelp' ? 'GivingHelp' : 'GettingHelp',
      );
    else
      activeCurrentType === 'GettingHelp'
        ? navigation.navigate('TabNavigatorGettingHelp')
        : navigation.navigate('TabNavigatorGivingHelp');
  };
  const {openModal, closeModal} = useModal();
  const disconnect = () => {
    openModal('AreYouSureExit', {
      pushContnueButton: continueToExitButton,
    });
  };
  const continueToExitButton = () => {
    openModal('SeeYouNextTime');
  };
  const [contentVisible, setContentVisible] = useState(false);

  const handleContentLayout = () => {
    console.log('handleContentLayout');
    setContentVisible(true);
  };

  return (
    <>
      <Modal transparent={true}>
        <TouchableWithoutFeedback onPress={() => setOpenMenu(false)}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContainer}
            onPress={() => setOpenMenu(false)}>
            <View style={styles.modalContainer} onLayout={handleContentLayout}>
              {contentVisible && (
                <LinearGradient
                  style={{
                    flex: 1,
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50,
                  }}
                  colors={[colors.blue700, colors.blue500]}>
                  <View style={{margin: 10}}>
                    <IconButton
                      extraStyles={styles.hamburgerStyle}
                      icon={require('../assets/images/xx.png')}
                      onPress={navigationTO}
                    />
                  </View>
                  <View style={styles.upperPartContiner}>
                    <Text style={styles.upperPartTitle}>
                      {user.fullName} :)
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}></View>
                  </View>

                  <View style={styles.menuTextsContainer}>
                    <Text style={styles.menuText} onPress={navigationTO}>
                      {hebrew.homePage}
                    </Text>
                    <View style={styles.borderMenu} />
                    <Text
                      style={styles.menuText}
                      onPress={() => {
                        setOpenMenu(false);
                        // navigation.push('EditUser');
                        navigation.push('Profile');
                      }}>
                      {hebrew.profile}
                    </Text>
                    <View style={styles.borderMenu} />
                    <Text
                      style={styles.menuText}
                      onPress={() => navigation.navigate('Settings')}>
                      {hebrew.settings}
                    </Text>
                    <View style={styles.borderMenu} />
                    <Text
                      style={styles.menuText}
                      onPress={() => navigation.navigate('AboutUs')}>
                      {hebrew.littleBit_aboutUs}
                    </Text>
                    <View style={styles.borderMenu} />
                    <Text
                      style={styles.menuText}
                      onPress={() => navigation.navigate('ContactUs')}>
                      {hebrew.contect_Us}
                    </Text>
                    <View style={styles.borderMenu} />
                    <Text style={styles.menuText} onPress={disconnect}>
                      {hebrew.disconnect}
                    </Text>
                  </View>
                  <View style={styles.bottom}>
                    <PoweredByZigit />
                  </View>
                </LinearGradient>
              )}
            </View>
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default MenuPage;

const styles = StyleSheet.create({
  modalContainer: {
    width: '80%',
    height: '100%',
    alignSelf: 'flex-end',
  },
  upperPartContiner: {
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
  upperPartTitle: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Medium',
  },
  bottom: {alignSelf: 'center', marginBottom: 25},
  seconderyButton: {
    marginHorizontal: 16,
    minWidth: 150,
    marginTop: 30,
  },

  bodyContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
  menuText: {
    color: 'white',
    alignSelf: 'flex-end',
    padding: 15,
    marginRight: 25,
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  menuTextsContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  borderMenu: {
    borderBottomWidth: 1,
    borderColor: '#B9CBE6',
    minWidth: '80%',
    alignSelf: 'center',
    opacity: 0.3,
  },
  hamburgerStyle: {
    height: 25,
    width: 20,
    marginLeft: '5%',
    marginTop: '5%',
  },
});
