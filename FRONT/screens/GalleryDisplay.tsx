import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {hebrew} from '../component/Hebrew';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  RootStackParamList,
  userWithToken,
  user_pulled_fromDB,
} from '../component/Interfaces';
import {GetUserProfilePic, addUser, uploadPic} from '../component/api';
import {useLoginContext} from '../component/context/Context';
import ThankYouForCooperation from './ThankYouForCooperation';
import compressionFileSystem from '../component/compressionFileSystem';
import LoadingSpinner from '../component/ui/LoadingSpinner';
import AddImageIcon from '../assets/images/AddImageIcon';
import CheckedIcon from '../assets/images/CheckedIcon';
import Monster_yay from '../assets/images/Monster_yay';
import fonts from '../styles/fonts';

const GalleryDisplay = () => {
  const [pickerResponse, setPickerResponse] = useState<Asset[] | undefined>(
    undefined,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Gallery'>>();
  const {user, setUser, pathToPic} = useLoginContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // opening library images function
    onImageLibrary();
  }, []);

  const onImageLibrary = async () => {
    setLoading(true);

    const result = await launchImageLibrary({
      selectionLimit: route.params.amountOfPics,
      mediaType: 'photo',
      includeBase64: false,
    });
    setLoading(false);

    if (result.assets !== undefined) setPickerResponse(result.assets);
    else navigation.goBack();
  };

  const Choosedpics = async () => {
    if (!pickerResponse) return;
    const data = new FormData();

    if (pickerResponse[0].uri !== undefined) {
      const compressedImage = await compressionFileSystem(
        pickerResponse[0].uri,
      );
      data.append('imageGallery', {
        name: `${user.phone}.jpg`,
        type: pickerResponse[0].type,
        uri: compressedImage,
      });
      data.append('picType', 'user');
    }
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
    const uploadprofilePic = await GetUserProfilePic(userId);

    if (
      uploadprofilePic &&
      uploadprofilePic.data &&
      uploadprofilePic.data.url
    ) {
      const imgUrl = uploadprofilePic.data.url;

      if (userToSumbit) {
        userToSumbit = {...userToSumbit, imgUrl};
      }
    }

    if (userToSumbit !== undefined) {
      setUser(userToSumbit);
      setLoading(false);
    }
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
        FcmToken: '',
      };
      return existUser;
    }
  };

  return (
    <>
      {loading ? (
        <View style={styles.spinner}>
          <LoadingSpinner color={'blue'} setHeight={100} />
        </View>
      ) : pickerResponse !== undefined && user?.token?.length > 0 ? (
        <ThankYouForCooperation />
      ) : (
        <View style={styles.container}>
          <View style={styles.upper}>
            <Monster_yay />
            <Text style={styles.headline}>{hebrew.img_recived}</Text>
            <Text style={styles.bodyText}>{hebrew.img_cleard}</Text>
          </View>
          <View style={styles.picsContainer}>
            <View>
              <View style={styles.picsContainer}>
                {pickerResponse &&
                  pickerResponse.map((pic, index) => {
                    return (
                      <View key={index}>
                        <Image
                          style={styles.picDisplayOnPage}
                          source={{uri: pic.uri}}
                        />
                      </View>
                    );
                  })}
              </View>
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
      )}
    </>
  );
};

export default GalleryDisplay;

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
    top: '20%',
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
