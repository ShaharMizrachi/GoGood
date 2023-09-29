import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import React, {createContext, useContext, useState} from 'react';
import {Logger} from '../api';
import {IEnumProfessions} from '../Interfaces';

type LoginContextType = {
  activeCurrentType: string;
  setActiveCurrentType: (activeCurrentType: string) => void;
  login: boolean;
  setLastNotification: Function;
  lastNotification: any;
  setLogin: (bool: boolean) => void; // become true once OTP is true
  user: {
    id: number;
    fullName: string;
    phone: string;
    imgUrl: string;
    imei: string;
    userDescription?: string;
    type: string;
    categoryArray: number[];
    lat: number;
    long: number;
    token: string;
    FcmToken: string;
  }; // in case it's a person who getting help array would be zero
  setUser: (user: {
    id: number;
    fullName: string;
    phone: string;
    imgUrl: string;
    imei: string;
    userDescription?: string;
    type: string;
    categoryArray: number[];
    lat: number;
    long: number;
    token: string;
    FcmToken: string;
  }) => void;
  getUserGeoLocation: (errorCB: Function) => void;
  pathToPic: string;
  EnumProfessionsGlobal: IEnumProfessions[];
  setEnumProfessionsGlobal: (EnumProfessionsGlobal: IEnumProfessions[]) => void;
  navigationBarOpen: boolean;
  setNavigationBarOpen: (navigationBarOpen: boolean) => void;
};
const LoginContext = createContext<LoginContextType>(undefined!);

export const useLoginContext = () => useContext(LoginContext);

type Props = {
  children: React.ReactNode;
};

export const LoginContextProvider = ({children}: Props) => {
  const pathToPic = 'https://gogoodweb.azurewebsites.net/api/Posts/GetImages/';
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    fullName: '',
    phone: '',
    imgUrl: '',
    imei: '',

    type: '',
    categoryArray: Array(),
    lat: -1,
    long: -1,
    token: '',
    FcmToken: '',
  });
  const [activeCurrentType, setActiveCurrentType] = useState<string>('Temp'); // the current Status type user is. (Both/GivingHelp/GettingHelp)
  const [EnumProfessionsGlobal, setEnumProfessionsGlobal] = useState<
    IEnumProfessions[]
  >([]);
  const [navigationBarOpen, setNavigationBarOpen] = useState(false);
  const [lastNotification, setLastNotification] = useState(null);

  const getUserGeoLocation = (errorCB: Function) => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        try {
          setUser({
            ...user,
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
          console.log(position);
        } catch (e) {
          console.log(`[getUserGeoLocation->position:]${e}`);
        }
      },
      error => {
        if (error.code === 1) {
          // Permission denied by user
          console.log('Location permission denied by user.');
          errorCB();
        } else {
          console.log(`[getUserGeoLocation:]`, {...error});
          Logger('getUserGeoLocation', 0, error);
        }
      },
    );
  };

  return (
    <LoginContext.Provider
      value={{
        login,
        setLogin,
        user,
        lastNotification,
        setLastNotification,
        setUser,
        getUserGeoLocation,
        setActiveCurrentType,
        activeCurrentType,
        pathToPic,
        EnumProfessionsGlobal,
        setEnumProfessionsGlobal,
        navigationBarOpen,
        setNavigationBarOpen,
      }}>
      {children}
    </LoginContext.Provider>
  );
};
