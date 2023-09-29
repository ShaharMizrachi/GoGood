import PrimaryScreen from '../component/ui/PrimaryScreen';
import {hebrew} from '../component/Hebrew';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import IconButton from './ui/IconButton';
import {
  RootStackParamList,
  userWithToken,
  user_pulled_fromDB,
} from './Interfaces';
import {GetUserProfilePic, addUser, uploadPic} from './api';
import {useLoginContext} from './context/Context';
import ThankYouForCooperation from '../screens/ThankYouForCooperation';
import compressionFileSystem from './compressionFileSystem';
import LoadingSpinner from './ui/LoadingSpinner';
import Monster_yay from '../assets/images/Monster_yay';
import fonts from '../styles/fonts';
import AddImageIcon from '../assets/images/AddImageIcon';
import CheckedIcon from '../assets/images/CheckedIcon';

const PicPicker = () => {
  const {user, setUser} = useLoginContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [imageUri, setImageUri] = useState<any>();
  const [activeCamera, setActiveCamera] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [isUploadedPic, setIsUploadedPic] = useState<boolean>(false);

  const devices = useCameraDevices();
  const device = devices.front;
  const camera = useRef<Camera>(null);

  useEffect(() => {
    if (imageUri) setActiveCamera(false);
  }, [imageUri]);

  const onPressButton = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({
        flash: 'off',
        qualityPrioritization: 'speed',
      });
      setImageUri(photo.path);
    }
  };
  const imageSource = useMemo(() => ({uri: `file://${imageUri}`}), [imageUri]); // my picture

  const Choosedpics = async () => {
    const compressedImage = await compressionFileSystem(imageUri);

    const data = new FormData();
    data.append('image', {
      name: `${user.phone}.jpg`,
      type: 'image/jpeg',
      uri: compressedImage,
    });
    data.append('picType', 'IdCard');

    setLoading(true);
    let userId: string = user.id.toString();
    let userToSumbit: user_pulled_fromDB | undefined;
    if (user.id === 0) {
      // in case useer does not exist and we are not doing put
      userToSumbit = await postUser();
    }
    userId = userToSumbit?.id.toString() ?? userId;
    data.append('userId', userId);
    const response = await uploadPic(data);

    const regexPattern = /^(\d{10})\.jpg$/;
    const match = response[0].match(regexPattern);
    if (match) {
      setIsUploadedPic(true);
    } else {
      console.log('response to upload Id Card was not good');
      //sholud be future work: to recognize the picture is id
    }

    if (userToSumbit != undefined) {
      setUser(userToSumbit);
    }
    setLoading(false);
  };

  const postUser = async () => {
    const userPulled: userWithToken = await addUser(user);
    if (userPulled) {
      const existUser: user_pulled_fromDB = {
        id: userPulled.userGoGood?.id,
        fullName: userPulled.userGoGood?.fullName,
        imei: userPulled.userGoGood?.imei,
        imgUrl: userPulled.userGoGood?.imgUrl,
        phone: userPulled.userGoGood?.phone,
        type: userPulled.userGoGood?.userType,
        categoryArray: [],
        lat: user.lat,
        long: user.long,
        token: userPulled.token,
        FcmToken: user.FcmToken,
      };
      return existUser;
    }
  };

  return (
    <>
      {device && (
        <>
          <Camera
            ref={camera}
            style={{flex: activeCamera ? 1 : 0}}
            device={device}
            isActive={activeCamera}
            photo={true}
            enableZoomGesture
          />
          <Pressable
            style={({pressed}) =>
              pressed
                ? [styles.picButton, styles.picButtonPressed]
                : styles.picButton
            }
            android_ripple={{color: 'black', radius: 16}}
            onPress={onPressButton}
          />
        </>
      )}
      {loading ? (
        <View style={styles.spinner}>
          <LoadingSpinner color={'blue'} setHeight={100} />
        </View>
      ) : user?.token?.length > 0 && isUploadedPic ? (
        <ThankYouForCooperation />
      ) : (
        imageUri && (
          <View style={styles.container}>
            <View style={styles.upper}>
              <Monster_yay />
              <Text style={styles.headline}>{hebrew.img_recived}</Text>
              <Text style={styles.bodyText}>{hebrew.img_cleard}</Text>
            </View>
            <View style={styles.picsContainer}>
              <View>
                <Image style={styles.picDisplayOnPage} source={imageSource} />
                <View style={styles.checkedIcon}>
                  <CheckedIcon />
                </View>
              </View>
              <TouchableOpacity
                style={styles.replaceImage}
                onPress={() => navigation.goBack()}>
                <Text style={styles.addImageText}>{hebrew.replace_image}</Text>
                <AddImageIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={Choosedpics}>
                <Text style={styles.buttonText}>{hebrew.approve}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      )}
    </>
  );
};
export default PicPicker;

const styles = StyleSheet.create({
  bodyText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 30,
    fontFamily: fonts.regular,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.regular,
  },
  checkedIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  headline: {
    paddingTop: 25,
    color: 'black',
    fontSize: 32,
    fontFamily: fonts.regular,
    fontWeight: '700',
  },
  upper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 25,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picButton: {
    position: 'absolute',
    bottom: 70,
    left: 190,
    right: 0,
    backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 3,
  },
  picButtonPressed: {
    height: 60,
    width: 60,
  },
  test: {
    color: 'black',
    backgroundColor: 'red',
  },
  imageStyle: {
    width: 250,
    height: 250,
  },
  buttonViewContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 50,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fed433',
    width: '80%',
    borderRadius: 35,
    height: 57,
    elevation: 5,
  },
  picsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picDisplayOnPage: {
    width: 110,
    height: 110,

    margin: 10,
  },
  replaceImage: {
    width: '60%',
    marginTop: 10,
    backgroundColor: 'white',
    height: 56,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 25,
    borderStyle: 'dashed',
    borderColor: '#0064C3',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#0064C3',
    textDecorationLine: 'underline',
    paddingRight: 5,
    paddingBotoom: 2,
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
