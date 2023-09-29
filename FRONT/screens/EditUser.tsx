import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNRestart from 'react-native-restart';
import {ScrollView} from 'react-native-gesture-handler';
import {
  GetUserProfilePic,
  getUsersProfessions,
  phoneExists,
  updateCategories,
  updateUser,
  uploadPic,
} from '../component/api';
import {useLoginContext} from '../component/context/Context';
import {hebrew} from '../component/Hebrew';
import {
  categoryInter,
  IEnumProfessions,
  RootStackParamList,
  User,
  user_pulled_fromDB,
} from '../component/Interfaces';
import Input from '../component/ui/Input';
import {clearAll} from '../component/UserInStorage';
import LoadingSpinner from '../component/ui/LoadingSpinner';
import NavBar from '../component/ui/NavBar';
import PrimaryButton from '../component/ui/PrimaryButton';
import SeconderyButton from '../component/ui/SeconderyButton';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import IconButton from '../component/ui/IconButton';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import compressionFileSystem from '../component/compressionFileSystem';
import Avatar from '../assets/images/Avatar';
import EditPenIcon from '../assets/images/EditPenIcon';
import AddImageIcon from '../assets/images/AddImageIcon';
import Lock from '../assets/images/Lock';

const UserDetailes = () => {
  const [editedUser, setEditedUser] = useState<User>({
    fullName: '',
    phone: '',
    imgUrl: '',
    userType: '',
    userDescription: '',
  });
  const [comment, setComment] = useState<string>('');
  const {user, setUser, activeCurrentType, EnumProfessionsGlobal, pathToPic} =
    useLoginContext();
  const [enumProfessionsData, setEnumProfessionsData] = useState<
    IEnumProfessions[]
  >([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [pickerResponse, setPickerResponse] = useState<Asset[] | undefined>(
    undefined,
  );

  const onImageLibrary = async () => {
    Alert.alert(
      hebrew.chenge_pic,
      hebrew.DoYouWant_selfi_gallery,
      [
        {
          text: hebrew.picFromGallery,
          style: 'default',
          onPress: async () => {
            let result = await launchImageLibrary({
              selectionLimit: 1,
              mediaType: 'photo',
              includeBase64: false,
            });
            if (result.assets !== undefined) setPickerResponse(result.assets); // array of objects,
          },
        },
        {
          text: hebrew.your_Selfi_Pic,
          style: 'default',
          onPress: async () => {
            let result = await launchCamera({
              mediaType: 'photo',
              includeBase64: false,
            });
            if (result.assets !== undefined) setPickerResponse(result.assets); // array of objects,
          },
        },
        {
          text: hebrew.cancelB,
          style: 'default',
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    if (pickerResponse !== undefined && pickerResponse?.length > 0)
      Choosedpics();
  }, [pickerResponse]);

  const Choosedpics = async () => {
    if (!pickerResponse) return;
    const data = new FormData();

    if (pickerResponse[0].uri !== undefined && data) {
      const compressedImage = await compressionFileSystem(
        pickerResponse[0].uri,
      );
      data.append('imageGallery', {
        name: `${user.phone}.jpg`,
        type: pickerResponse[0].type,
        uri: compressedImage,
      });
      data.append('picType', 'user');
      data.append('userId', user.id);
    }
    setLoading(true);
    console.log({data});
    await uploadPic(data);
    const profileImage = await GetUserProfilePic(user.id.toString());
    setEditedUser({...editedUser, imgUrl: profileImage.data.url});
    setLoading(false);
  };

  useEffect(() => {
    console.log('Asdasdasd', {user});
    getProfilePic();
  }, []);

  const getProfilePic = async () => {
    try {
      setLoading(true);
      const profileImage = await GetUserProfilePic(user.id.toString());
      setEditedUser({
        ...editedUser,
        fullName: user.fullName,
        phone: user.phone,
        imgUrl: profileImage.data.url ?? '',
        userType: user.type,
        userDescription: user.userDescription,
      });
      setLoading(false);
    } catch (e) {
      setEditedUser({
        ...editedUser,
        fullName: user.fullName,
        phone: user.phone,
        imgUrl: '',
        userType: user.type,
        userDescription: user.userDescription,
      });
      console.log(e);
    }
  };

  useEffect(() => {
    if (EnumProfessionsGlobal.length !== 0) {
      if (user.type !== 'GettingHelp') {
        insertUserProfessions();
      } else {
        const enumsArray = EnumProfessionsGlobal.map(
          (categoryItem: categoryInter) => {
            return {...categoryItem, choosed: false};
          },
        );
        setEnumProfessionsData(enumsArray);
        setLoading(false);
      }
    }
  }, [EnumProfessionsGlobal]);

  const insertUserProfessions = async () => {
    const professionsArray = await getUsersProfessions(user.id);
    user.categoryArray = professionsArray;
    const enumsArray = EnumProfessionsGlobal.map(
      (categoryItem: categoryInter) => {
        return {...categoryItem, choosed: false};
      },
    );
    for (const category of professionsArray) {
      if (category - 1 >= 0 && category <= enumsArray.length)
        enumsArray[category - 1].choosed = true;
    }
    setEnumProfessionsData(enumsArray);
    setLoading(false);
  };

  const findProChoosed = (item: categoryInter) => {
    const enumProfessionsDataNewArray: categoryInter[] =
      enumProfessionsData.map((category, index) => {
        if (category.id === item.id) item.choosed = !item.choosed;
        return category;
      });
    setEnumProfessionsData(enumProfessionsDataNewArray);
  };
  const navigateBack = () => {
    navigation.goBack();
  };
  const onEditUserHandler = async () => {
    if (user.phone !== editedUser.phone) {
      const phoneAlreadyExists = await phoneExists(editedUser.phone);
      if (phoneAlreadyExists) {
        Alert.alert(
          hebrew.phone_exists_inSystem,
          hebrew.phone_exists_tryagain,
          [{text: hebrew.ok, style: 'default'}],
          {cancelable: false},
        );
        return;
      }
    }
    const currentUserCategories = Array.from(
      new Set(user.categoryArray.sort((a, b) => a - b)),
    );
    const enumDataArray = enumProfessionsData.map(element =>
      element.choosed ? element.id : 0,
    );
    const categoriesToDelete = [];
    for (const number of currentUserCategories) {
      if (enumDataArray[number - 1] === 0) {
        categoriesToDelete.push(number);
      }
      enumDataArray[number - 1] = 0;
    }
    const categoriesToAdd = enumDataArray.filter(num => num !== 0);
    if (categoriesToDelete.length > 0 || categoriesToAdd.length > 0) {
      await updateCategories(
        user.id,
        categoriesToDelete.toString(),
        categoriesToAdd.toString(),
        user.token,
      );
    }
    const userData: user_pulled_fromDB = {
      id: user.id,
      fullName:
        editedUser.fullName.length > 0 ? editedUser.fullName : user.fullName,
      phone: editedUser.phone.length > 0 ? editedUser.phone : user.phone,
      imgUrl: editedUser.imgUrl,
      userDescription: comment,
      type: editedUser.userType,
      imei: user.imei,
      categoryArray: [],
      lat: 0,
      long: 0,
      token: '',
      FcmToken: user.FcmToken,
    };
    await updateUser(userData, user.token);
    if (user.phone !== editedUser.phone && editedUser.phone.length > 0) {
      Alert.alert(
        hebrew.phone_changed,
        hebrew.phone_change_appRestart,
        [
          {
            text: hebrew.ok,
            onPress: () => {
              clearAll();
              RNRestart.Restart();
            },
            style: 'default',
          },
        ],
        {cancelable: false},
      );
    } else {
      setUser({
        ...user,
        fullName: editedUser.fullName,
        imgUrl: editedUser.imgUrl,
        type: 'Both',
      });
      navigateBack();
    }
  };

  const toggleUserType = () => {
    if (editedUser.userType !== 'Both') {
      setEditedUser({...editedUser, userType: 'Both'});
    } else {
      setEditedUser({...editedUser, userType: user.type});
    }
  };
  return (
    <>
      {loading ? (
        <View style={styles.spinner}>
          <LoadingSpinner setHeight={100} color={'blue'} />
        </View>
      ) : (
        <>
          <NavBar title={hebrew.edit_profile} navigateBack={navigateBack} />
          <ScrollView horizontal={false}>
            <View style={styles.userDetailesContainer}>
              <View style={styles.userDetailesHeader}>
                <View style={styles.avatarContainer}>
                  {editedUser?.imgUrl?.length > 2 ? (
                    <Image
                      style={styles.avatar}
                      source={{uri: editedUser?.imgUrl}}
                    />
                  ) : (
                    <Avatar />
                  )}
                </View>
                <View style={styles.updateImageBtnContaimer}>
                  <TouchableOpacity onPress={onImageLibrary}>
                    <EditPenIcon />
                  </TouchableOpacity>
                </View>
                <Text style={styles.editPic}>{hebrew.edit_pic}</Text>
              </View>
              <View style={styles.inputs}>
                <Text style={styles.helper}>{hebrew.update_profile}</Text>
                <View>
                  <Lock style={styles.lockIcon} />
                  <Input
                    placeHolder={editedUser.fullName}
                    editable={false}
                    text={editedUser.fullName}
                    textChanged={(t: string) =>
                      setEditedUser({...editedUser, fullName: t})
                    }
                  />
                </View>

                <Text style={styles.helper}>{hebrew.update_phone}</Text>
                <View>
                  <Lock style={styles.lockIcon} />
                  <Input
                    editable={false}
                    placeHolder={editedUser.phone}
                    text={editedUser.phone}
                    keybordType={'number-pad'}
                    textChanged={(t: string) =>
                      setEditedUser({...editedUser, phone: t})
                    }
                  />
                </View>

                <View>
                  <Input
                    extraStyles={{marginTop: 35}}
                    placeHolder={hebrew.tell_us}
                    editable={true}
                    text={editedUser.userDescription}
                    multiline={true}
                    numberOfLines={5}
                    textChanged={(t: string) =>
                      setEditedUser({...editedUser, userDescription: t})
                    }
                  />
                </View>
              </View>

              {/* {user.type !== 'Both' && (
                <View style={styles.EditProfileType}>
                  <View style={styles.EditProfileBtn}>
                    <SeconderyButton
                      title={hebrew.upgrade_givingAndGetting}
                      onPress={toggleUserType}
                    />
                  </View>
                </View>
              )} */}
              {/* <ScrollView horizontal={true}>
                {editedUser?.userType !== 'GettingHelp' && (
                  <View style={styles.proffesionsList}>
                    <Text style={styles.helper}>
                      {hebrew.update_categories}
                    </Text>
                    {enumProfessionsData && (
                      <FlatList
                        horizontal={false}
                        numColumns={3}
                        columnWrapperStyle={styles.row}
                        data={enumProfessionsData}
                        renderItem={item => (
                          <View style={styles.buttonPro}>
                            <SeconderyButton
                              onPress={() => findProChoosed(item.item)}
                              title={item.item?.he}
                              defulteButtonStatus={item.item?.choosed}
                            />
                          </View>
                        )}
                      />
                    )}
                  </View>
                )}
              </ScrollView> */}
              <View style={styles.idContainer}>
                <Text style={styles.idTitle}>{hebrew.insert_id}</Text>
                <TouchableOpacity style={styles.dropZone}>
                  <Text style={styles.addImageText}>{hebrew.add_image}</Text>
                  <AddImageIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.saveBtn}>
                <PrimaryButton
                  title={hebrew.save_changes}
                  onPress={onEditUserHandler}
                />
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default UserDetailes;

const styles = StyleSheet.create({
  userDetailesContainer: {
    backgroundColor: colors.gray500,
  },
  userDetailesHeader: {
    padding: 20,
    backgroundColor: colors.blue500,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120,
  },
  lockIcon: {position: 'absolute', top: '30%', left: 15, zIndex: 50},
  editPic: {
    color: 'white',
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    textDecorationLine: 'underline',
    paddingBottom: 1,
  },
  inputs: {
    padding: 20,
  },
  idTitle: {textAlign: 'center', fontSize: 16},
  EditProfileType: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  EditProfileBtn: {
    width: 200,
  },
  editButton: {position: 'absolute', zIndex: 150, top: '20%', right: '-3%'},
  dropZone: {
    width: '80%',
    marginTop: 10,
    backgroundColor: 'white',
    height: '60%',
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
  buttonProContainer: {
    height: 220,
    marginTop: 10,
  },
  buttonPro: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: 98,
  },
  primaryButton: {
    marginTop: 70,
  },
  addImageText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#0064C3',
    textDecorationLine: 'underline',
    paddingRight: 5,
    paddingBotoom: 2,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proffesionsList: {
    padding: 20,
  },
  saveBtn: {
    padding: 20,
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
  helper: {
    fontFamily: fonts.regular,
    marginRight: 2,
    color: 'black',
  },
  idContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: '90%',
    alignSelf: 'center',
  },
  updateImageBtnContaimer: {
    position: 'absolute',
    top: '10%',
    left: 225,
  },
  updateImageBtn: {
    width: 40,
    height: 30,
  },
});
