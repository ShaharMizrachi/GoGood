import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {RootStackParamList, user_pulled_fromDB} from './Interfaces';
import AreasOfInterest from '../screens/AreasOfInterest';
import FirstTimeEntery from '../screens/FirstTimeEntery';
import GalleryDisplay from '../screens/GalleryDisplay';
import LoginScreen from '../screens/LoginScreen';
import SelfiPicAsk from '../screens/SelfiPicAsk';
import SmsLoginScreen from '../screens/SmsLoginScreen';
import {
  TabNavigatorGivingHelp,
  TabNavigatorGettingHelp,
} from './ui/TabNavigatorsMain';
import PicPicker from './PicPicker';
import MapPrimary from './ui/MapPrimary';
import {getData, clearAll} from './UserInStorage';
import {
  EnumProfessions,
  getUser,
  ifUserWasBeforeInApp,
  updateUser,
} from './api';
import {useLoginContext} from './context/Context';
import NewPost from '../screens/NewPost';
import ManualLocation from '../screens/ManualLocation';
import PostDetailes from '../screens/PostDetailes';
import EditUser from '../screens/EditUser';
import StatisticsUser from '../screens/StatisticsUser';
import Profile from '../screens/Profile/Profile';
import Reviews from '../screens/Reviews/Reviews';
import Archive from '../screens/Archive/Archive';
import ProfileDetail from '../screens/ProfileDetail';
import AddNewRecommendation from '../screens/AddNewRecommendation';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import ProfileOfOtherUser from '../screens/ProfileOfOtherUser';
import {AboutUs} from './AboutUs';
import {Settings} from './Settings';
import {ContactUs} from './ContactUs';
import messaging from '@react-native-firebase/messaging';
import {useOnMesssage} from '../Hooks/useOnMesssage';
import onBackgroundMessagingSetup from '../Hooks/onBackgroundMessagingSetup';

const MainStackNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const {
    setUser,
    user,
    setLogin,
    login,
    setEnumProfessionsGlobal,
    setActiveCurrentType,
    activeCurrentType,
  } = useLoginContext();
  onBackgroundMessagingSetup();
  useOnMesssage();

  useEffect(() => {
    const initializeApp = async () => {
      await getUserFrom();
      await gettingEnumPro();
      SplashScreen.hide();
    };
  
    initializeApp();
  }, []);
  const getUserFrom = async () => {
    const userPhone = await getData(); 
    if (userPhone != null) {
      await pullingUser(userPhone); 
    } else {
      setLogin(false);
    }
  };

  const pullingUser = async (userPhone: any) => {
    const FcmToken = await messaging().getToken();
    if (FcmToken) {
      console.log('Your Firebase Token is:', FcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
    if (userPhone) {
      const userPulled = await getUser(userPhone);
      const existUser: user_pulled_fromDB = {
        id: userPulled.userGoGood?.id,
        fullName: userPulled.userGoGood?.fullName,
        imei: userPulled.userGoGood?.imei,
        userDescription: userPulled.userGoGood?.userDescription,
        imgUrl: userPulled.userGoGood?.imgUrl,
        phone: userPulled.userGoGood?.phone,
        type: userPulled.userGoGood?.userType,
        categoryArray: [],
        lat: user.lat,
        long: user.long,
        token: userPulled.token,
        FcmToken: FcmToken || '',
      };
      if (userPulled.userGoGood.fcmToken !== FcmToken) {
        await updateUser(existUser, FcmToken);
      }
      if (existUser.id !== 0) {
        setUser(existUser);
        setLogin(true);
        existUser.type === 'GettingHelp'
          ? setActiveCurrentType('GettingHelp')
          : setActiveCurrentType('GivingHelp');
      } else {
        await clearAll();
      }
    }
  };

  const gettingEnumPro = async () => {
    try {
      const data = await EnumProfessions();
      if (data != undefined) {
        setEnumProfessionsGlobal(data?.data);
      }
    } catch {
      console.log(
        'Error: pulling gettingEnumPro from MainStackNavigator failed',
      );
    }
  };

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <>
        {!login ? (
          <>
            <RootStack.Screen
              options={{headerShown: false}}
              name="Login"
              component={LoginScreen}
            />

            <RootStack.Screen
              options={{headerShown: false}}
              name="OTP"
              component={SmsLoginScreen}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="FirstTime"
              component={FirstTimeEntery}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="SelfiPicAsk"
              component={SelfiPicAsk}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="AreasOfInterest"
              component={AreasOfInterest}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="PicPicker"
              component={PicPicker}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="AboutUs"
              component={AboutUs}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Gallery"
              component={GalleryDisplay}
              initialParams={{amountOfPics: 1}}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="ContactUs"
              component={ContactUs}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Settings"
              component={Settings}
            />
          </>
        ) : activeCurrentType === 'GettingHelp' ? (
          <>
            <RootStack.Screen
              options={{headerShown: false}}
              name="TabNavigatorGettingHelp"
              component={TabNavigatorGettingHelp}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="ManualLocation"
              component={ManualLocation}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="MapPrimary"
              component={MapPrimary}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="NewPost"
              component={NewPost}
              initialParams={{post: undefined}}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Profile"
              component={Profile}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Reviews"
              component={Reviews}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Archive"
              component={Archive}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="EditUser"
              component={EditUser}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="StatisticsUser"
              component={StatisticsUser}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="ProfileDetail"
              component={ProfileDetail}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="AddNewRecommendation"
              component={AddNewRecommendation}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="AboutUs"
              component={AboutUs}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="ProfileOfOtherUser"
              component={ProfileOfOtherUser}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="ContactUs"
              component={ContactUs}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Settings"
              component={Settings}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              options={{headerShown: false}}
              name="TabNavigatorGivingHelp">
              {() => <TabNavigatorGivingHelp />}
            </RootStack.Screen>
            <RootStack.Screen
              options={{headerShown: false}}
              name="ManualLocation"
              component={ManualLocation}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="MapPrimary"
              component={MapPrimary}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="PostDetailes"
              component={PostDetailes}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Profile"
              component={Profile}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Reviews"
              component={Reviews}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Archive"
              component={Archive}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="EditUser"
              component={EditUser}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="StatisticsUser"
              component={StatisticsUser}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="ProfileDetail"
              component={ProfileDetail}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="AddNewRecommendation"
              component={AddNewRecommendation}
            />

            <RootStack.Screen
              options={{headerShown: false}}
              name="ProfileOfOtherUser"
              component={ProfileOfOtherUser}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="AboutUs"
              component={AboutUs}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="Settings"
              component={Settings}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="ContactUs"
              component={ContactUs}
            />
          </>
        )}
      </>
    </RootStack.Navigator>
  );
};

export default MainStackNavigator;
