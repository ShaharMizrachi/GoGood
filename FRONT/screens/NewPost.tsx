import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import IconButton from '../component/ui/IconButton';
import Input from '../component/ui/Input';
import KeyboradDiscoverInput from '../component/ui/KeyboradDiscoverInput';
import PrimaryButton from '../component/ui/PrimaryButton';
import {hebrew} from '../component/Hebrew';
import {
  categoryInter,
  IEnumProfessions,
  newRequstedPost,
  PostSend,
  RootStackParamList,
} from '../component/Interfaces';
import {
  ConvertLocationToAddressObject,
  ConvertLoctionToAddress,
  GetPostPics,
  editPost,
  postNewRequest,
  uploadPic,
} from '../component/api';
import {useLoginContext} from '../component/context/Context';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import AlertModel from '../component/ui/AlertModel';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import compressionFileSystem from '../component/compressionFileSystem';
import LoadingSpinner from '../component/ui/LoadingSpinner';
import NavBar from '../component/ui/NavBar';
import fonts from '../styles/fonts';
import AddImageIcon from '../assets/images/AddImageIcon';
import TrashIcon from '../assets/images/TrashIcon';
import Avatar from '../assets/images/Avatar';
import ManualLocation from './ManualLocation';
import ModalPopup from '../component/ui/ModalPopup';
import {PostModal} from '../component/ui/PostModal/PostModal';
import MonsterSuprise from '../assets/images/MonsterSuprise';
import MonsterYaySvg from '../assets/images/MonsterYaySvg';
import MonsterHappy from '../assets/images/MonsterHappy';
import DeleteModal from '../component/ui/DeleteModal';
import {useModal} from 'react-native-modalfy';
import ManualLocationInput from '../component/ManualLocationInput/ManualLocationInput';
import PostsGallery from '../component/ui/PostsGallery';

const NewPost = () => {
  interface modalShow {
    show: boolean;
    text: string;
  }
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [optionsShow, setOptionsShow] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [pickerResponse, setPickerResponse] = useState<Asset[]>([]);
  const [images, setImages] = useState<Array<string>>([]);
  const [selectedImages, setSelectedImages] = useState<
    Array<{selected: boolean}>
  >([]);
  const [enumProfessionsData, setEnumProfessionsData] = useState<
    IEnumProfessions[]
  >([]);
  const {user, pathToPic, EnumProfessionsGlobal} = useLoginContext();
  const [newPost, setNewPost] = useState<newRequstedPost>({
    category: '',
    categoryId: 0,
    titlePost: '',
    postBody: '',
    imgUri: '',
  });
  const [showModalError, setModalError] = useState<modalShow>({
    show: false,
    text: hebrew.missing_Fileds,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showModalsuccses, setShowModalsuccses] = useState<modalShow>({
    show: false,
    text: hebrew.post_sending_succsed,
  });
  const [isEditStatus, setIsEditStatus] = useState<boolean>(false); // new Post status false| edit post status true.
  const [loading, setLoading] = useState(false);

  const route = useRoute<RouteProp<RootStackParamList, 'NewPost'>>();
  useEffect(() => {
    gettingEnumPro();
    getPics();
  }, []);
  const initImages = (data: Array<string>) => {
    setImages(data);
    setSelectedImages(buildSelectedImages(data));
  };

  const buildSelectedImages = (data: Array<string>) => {
    const arr: {selected: boolean}[] = [];
    data.forEach((key: string) => {
      arr.push({selected: false});
    });
    return arr;
  };
  const getPics = async () => {
    let picsPost = await GetPostPics(String(route.params?.post.postId));
    console.log('picsPost.data', picsPost.data);
    initImages(picsPost.data);
  };
  const gettingEnumPro = async () => {
    setEnumProfessionsData(
      EnumProfessionsGlobal.map((categoryItem: categoryInter) => {
        return {...categoryItem, choosed: false};
      }),
    );
    if (route.params?.post !== undefined) {
      setIsEditStatus(true);
      const passedPost = route.params?.post;
      const hebrewCategory = EnumProfessionsGlobal.find(
        (categoryItem: categoryInter) =>
          categoryItem.id === passedPost.categoryId,
      );
      hebrewCategory &&
        setNewPost({
          category: hebrewCategory.he,
          categoryId: passedPost.categoryId,
          titlePost: passedPost.problemTitle,
          postBody: passedPost.problemDescription,
          imgUri: passedPost.problemDescription,
        });
    }
  };

  const onImageLibrary = async () => {
    if (images.length === 3) {
      return setError(true);
    }
    const result = await launchImageLibrary({
      selectionLimit: 3,
      mediaType: 'photo',
      includeBase64: false,
    });
    if (result.assets !== undefined) {
      let uriArray: string[] = result.assets
        .map((asset: Asset) => asset.uri || '')
        .slice(0, 3);
      if (images.length !== 0) {
        uriArray = [...images, ...uriArray.slice(0, 3 - images.length)];
      }
      setImages(uriArray);
      setSelectedImages(buildSelectedImages(uriArray));
    }
  };
  const publishPost = async () => {
    setLoading(true);
    if (newPost.categoryId == 0) {
      setLoading(false);
      setModalError({...showModalError, show: true});
    } else {
      let combineString = '';
      console.log('send', initialLocation);
      const PostToSend: PostSend = {
        categoryId: newPost.categoryId,
        gettingHelpId: user.id,
        problemTitle: newPost.titlePost,
        problemDescription: newPost.postBody,
        problemPic: combineString,
        statusTypeId: 1,
        dateUpdete: new Date().toISOString(),
        latitude: initialLocation.latitude ?? user.lat,
        longitude: initialLocation.longitude ?? user.long,
      };
      let postId: number | undefined;
      const mypost = route.params?.post;
      if (isEditStatus) {
        // edit post
        PostToSend.id = route.params?.post.postId;
        // if (route.params?.post.latitude && route.params?.post.longitude) {
        //   PostToSend.latitude = route.params?.post.latitude;
        //   PostToSend.longitude = route.params?.post.longitude;
        // }
        if (route.params?.post.statusTypeId)
          PostToSend.statusTypeId = route.params?.post.statusTypeId;
        const editPostResponse = await editPost(PostToSend);
        postId = PostToSend.id;
      } else {
        // new post
        const responsePostSended = await postNewRequest(user.token, PostToSend);
        postId = responsePostSended.data.id;
      }

      // picture upload zone

      const data = new FormData();
      for (let index = 0; index < images.length; index++) {
        const picker = images[index];
        if (picker !== undefined) {
          try {
            const compressedImage = await compressionFileSystem(picker);
            data.append('imageGallery', {
              name: `${index + 1}`,
              type: 'image/jpeg',
              uri: compressedImage,
            });
          } catch {
            data.append('imageGallery', {
              name: `${index + 1}`,
              type: 'image/jpeg',
              uri: picker,
            });
          }
        }
      }
      data.append('picType', 'posts');
      data.append('postId', postId);

      const response = await uploadPic(data); // upload pic to server and getting URLS in response

      for (const imageName of response) {
        combineString += imageName;
        combineString += '#';
      }
      //}

      setLoading(false);
      setShowPublishModal(true);
      setShowModalsuccses({...showModalsuccses, show: true});
    }
  };

  const closePopUp = () => {
    setModalError({...showModalError, show: false});
  };

  const workingAndGoout = () => {
    navigation.pop(2);
    navigation.navigate('TabNavigatorGettingHelp');
  };
  const {openModal} = useModal();
  const twoOptionAlertHandler = () => {
    openModal('DeleteModal', {
      onBack: () => navigation.pop(),
      onNext: () => navigation.goBack(),
    });
  };

  const deleteSelectedImages = () => {
    setError(false);
    setSelectedImages(prevSelected => {
      setImages(prevImages => {
        const newArray = [...prevImages];
        for (let i = prevSelected.length - 1; i >= 0; i--) {
          if (prevSelected[i].selected) {
            newArray.splice(i, 1);
          }
        }
        return newArray;
      });
      const newImages = [...prevSelected];
      for (let i = prevSelected.length - 1; i >= 0; i--) {
        if (prevSelected[i].selected) {
          newImages.splice(i, 1);
        }
      }
      return newImages;
    });
  };
  const onImageSelect = (index: number) => {
    setSelectedImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index].selected = !newImages[index].selected;

      return newImages;
    });
  };
  const [initialLocation, setInitialLocation] = useState({
    name: '',
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      let lon = route.params?.post.longitude;
      let lat = route.params?.post.latitude;
      if (lat && lon)
        ConvertLocationToAddressObject(lat, lon).then(res => {
      console.log({res})
          const name = res.results[0].formatted_address;
          const {location} = res.results[0].geometry;
          setInitialLocation({
            latitude: location.lat,
            longitude: location.lng!,
            name: name,
          });
        });
    };
    fetchData();
  }, [route.params?.post]);
  console.log(initialLocation);
  return (
    <>
      <NavBar
        title={
          route.params?.post ? hebrew.edit_requst : hebrew.adding_new_requst
        }
        navigateBack={() => {
          navigation.pop(2);
          navigation.push('TabNavigatorGettingHelp');
        }}
      />
      {loading ? (
        <View style={styles.spinner}>
          <LoadingSpinner color={'blue'} setHeight={100} />
        </View>
      ) : (
        <KeyboradDiscoverInput>
          <View style={styles.newPostContainer}>
            <View style={{flex: 8}}>
              {showModalError.show && (
                <AlertModel text={showModalError.text} setShow={closePopUp} />
              )}

              {showPublishModal && (
                <PostModal
                  title={hebrew.success_publish}
                  subTitle={hebrew.success_publish_subTitle}
                  Icon={MonsterHappy}>
                  <View style={styles.modalButtons}>
                    <Text
                      onPress={() => navigation.pop()}
                      style={styles.modalButtonTextClose}>
                      {hebrew.close}
                    </Text>
                  </View>
                </PostModal>
              )}
              <View style={styles.header}>
                <View style={styles.rightSideHeader}>
                  <View style={styles.avatarContainer}>
                    {user.imgUrl.length > 0 ? (
                      <Image
                        style={styles.avatar}
                        source={{uri: user.imgUrl}}
                      />
                    ) : (
                      <Avatar h={80} w={80} />
                    )}
                  </View>
                  <View style={styles.nameAndDetailesBtn}>
                    <Text style={styles.name}>{user.fullName}</Text>
                    <Text
                      style={styles.textBtn}
                      onPress={() => navigation.navigate('Profile')}>
                      {hebrew.profile_details}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity onPress={twoOptionAlertHandler}>
                  <TrashIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Input
                  text={newPost.category}
                  placeHolder={hebrew.choosen_Category}
                  editable={false}
                  extraStyles={styles.input}
                />
                <IconButton
                  icon={require('../assets/images/arrow.png')}
                  onPress={() => setOptionsShow(prev => !prev)}
                  extraStyles={[
                    styles.openIcon,
                    optionsShow && styles.arrowIconUp,
                  ]}
                />
                {optionsShow && (
                  <ScrollView
                    scrollEnabled
                    nestedScrollEnabled={true}
                    style={styles.dropDown}>
                    {enumProfessionsData.map((item, index) => {
                      return (
                        <Pressable
                          key={index}
                          android_ripple={{color: '#ffffff'}}
                          onPress={() => {
                            setNewPost({
                              ...newPost,
                              category: item.he,
                              categoryId: item.id,
                            });
                            setOptionsShow(false);
                          }}>
                          <View style={styles.listItem}>
                            <Text style={styles.itemText}>{item.he}</Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                )}
              </View>
              {/* <View style={styles.inputContainer}> */}
              {/* <Input
                  text={newPost.titlePost}
                  textChanged={(t: string) =>
                    setNewPost({...newPost, titlePost: t})
                  }
                  placeHolder={hebrew.location}
                  extraStyles={styles.input}
                />
              </View> */}
              <View style={styles.inputContainer}>
                <ManualLocationInput
                  initialLocation={initialLocation}
                  setInitialLocation={setInitialLocation}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  text={newPost.postBody}
                  textChanged={(t: string) =>
                    setNewPost({...newPost, postBody: t})
                  }
                  placeHolder={hebrew.body_of_request}
                  extraStyles={styles.input}
                  multiline={true}
                  numberOfLines={6}
                />
              </View>
              <Text style={styles.title}>{hebrew.markPicture}</Text>
              <View style={styles.trashContainer}>
                <TouchableOpacity
                  style={styles.deleteContainer}
                  onPress={() => deleteSelectedImages()}>
                  <Text style={styles.deleteText}>{hebrew.deleting}</Text>
                  <TrashIcon />
                </TouchableOpacity>
                {error ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{hebrew.tooManyImages}</Text>
                    <Image
                      style={styles.iconStyle}
                      source={require('../assets/images/alert-circle.png')}
                    />
                  </View>
                ) : null}
              </View>

              <View style={styles.picsContainer}>
                <ScrollView horizontal={true}>
                  <PostsGallery
                    selectedImages={selectedImages}
                    onClick={(i: number) => onImageSelect(i)}
                    picProblemArray={images}
                  />
                </ScrollView>
              </View>
            </View>
            <TouchableOpacity onPress={onImageLibrary} style={styles.dropZone}>
              <Text style={styles.addImageText}>{hebrew.add_image}</Text>
              <AddImageIcon />
            </TouchableOpacity>
            <View style={styles.primaryBtnContainer}>
              <PrimaryButton
                title={
                  route.params?.post
                    ? hebrew.publish__edit_request
                    : hebrew.publish_request
                }
                onPress={publishPost}
              />
            </View>
          </View>
        </KeyboradDiscoverInput>
      )}
    </>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  newPostContainer: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  modalButtonText: {
    fontSize: 18,
    fontFamily: fonts.regular,
  },
  modalButtonTextClose: {
    fontSize: 18,
    fontFamily: fonts.regular,
    textDecorationLine: 'underline',
  },
  backButton: {
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#FED433',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    elevation: 5,
    width: 145,
    borderRadius: 35,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightSideHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  dropDown: {
    borderColor: '#dbdbdb',
    borderWidth: 2,
    maxHeight: 200,
    flex: 1,
    borderRadius: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  avatarContainer: {
    width: 80,
    height: 80,
  },
  nameAndDetailesBtn: {
    margin: 10,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: 'black',
    lineHeight: 18,
  },
  arrowIconUp: {
    transform: [{rotate: '180deg'}],
  },
  textBtn: {
    fontSize: 16,
    fontFamily: fonts.regular,
    textDecorationLine: 'underline',
    color: 'black',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: 'black',
  },
  dropZone: {
    width: '80%',
    marginTop: 10,
    backgroundColor: 'white',
    height: 60,
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
  errorText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: 'black',
  },
  deleteText: {
    fontSize: 12,
    marginHorizontal: 4,
    fontFamily: fonts.regular,
    color: 'black',
    textDecorationLine: 'underline',
  },

  iconStyle: {
    width: 20,
    height: 20,
    paddingLeft: '2.5%',
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    borderColor: '#dbdbdb',
    borderWidth: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    textAlignVertical: 'top',
    textAlign: 'right',
    color: 'black',
  },
  primaryBtnContainer: {
    marginTop: 40,
  },
  addPicture: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  openIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -50,
    left: 20,
  },
  options: {
    position: 'absolute',
    top: 70,
    width: '100%',
    height: 400,
    zIndex: 2,
  },
  listItem: {
    marginVertical: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
    textAlign: 'right',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    paddingRight: 15,
  },
  itemText: {fontSize: 16, color: 'black'},
  picsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picDisplayOnPage: {
    width: 110,
    height: 110,
    borderRadius: 15,
    margin: 10,
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
  trashContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
  },
  deleteContainer: {
    width: '25%',
    flexDirection: 'row',
  },
  errorContainer: {
    width: '70%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
});
