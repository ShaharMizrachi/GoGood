import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {BackHandler, Image, StyleSheet, Text, View} from 'react-native';
import {
  changingStatusOfPost,
  connectProffesionalToPost,
  ConvertLoctionToAddress,
  detachedPostToProfessional,
  getPost,
  getRecommendationsForPost,
  getUserById,
  GetUserProfilePic,
} from '../component/api';
import {useLoginContext} from '../component/context/Context';
import DistanceBetweenTwoPoints from '../component/DistanceBetweenTwoPoints';
import {hebrew} from '../component/Hebrew';
import {
  GetAvailablePostByprofessionalInter,
  Ifeedback,
  RootStackParamList,
  UserGoGood,
} from '../component/Interfaces';
import NavBar from '../component/ui/NavBar';
import ReadMore from '../component/ui/ReadMore';
import SeconderyButton from '../component/ui/SeconderyButton';
import {
  calculatingTime,
  roundKilometer,
} from '../component/GeneralFunction_ForReUse';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LoadingSpinner from '../component/ui/LoadingSpinner';
import PostsGallery from '../component/ui/PostsGallery';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const PostDetailes = () => {
  const {user, EnumProfessionsGlobal} = useLoginContext();
  const route = useRoute<RouteProp<RootStackParamList, 'PostDetailes'>>();
  const [post, setPost] = useState<any>(); //GetAvailablePostByprofessionalInter it was this to check that shahar
  const [getingHelpDetailes, setGetingHelpDetailes] = useState<UserGoGood>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [picProblemArray, setPicProblemArray] = useState<string[] | undefined>(
    undefined,
  );
  const [recommendtionPostDisplay, setRecommendtionPostDisplay] = useState<
    Ifeedback[]
  >([]);
  const amountOfStars = [1, 2, 3, 4, 5];
  const [cityPulled, setCityPulled] = useState<string>(hebrew.israel);

  const getRecoomendtionPost = async (postId: number | undefined) => {
    if (postId != undefined) {
      const data = await getRecommendationsForPost(postId);
      setRecommendtionPostDisplay(data);
    }
  };

  const convertingToCity = async () => {
    if (post) {
      const city = await ConvertLoctionToAddress(post.latitude, post.longitude);
      if (city) setCityPulled(city);
    }
  };

  useEffect(() => {
    console.log("route?.params?.post",route?.params?.post)
    console.log("route",route?.params?.post.categoryId)
    console.log("route",route?.params?.post.id)
    if (route && route?.params?.post) {
      //setLoading(true);
      setPost(route.params.post);
      route.params.post.statusTypeId > 3 &&
        getRecoomendtionPost(route.params.post.id);
    }

    // avoidign going back at android buttom bar
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getHelpDetailes();
    if (post?.problemPic && post.problemPic.length > 2) {
      const picArray = post?.problemPic?.slice(0, -1).split('#');
      setPicProblemArray([...picArray]);
    }
    if (post) convertingToCity();
  }, [post]);

  const getHelpDetailes = async () => {
    if (post?.gettingHelpId) {
      let userData = await getUserById(post?.gettingHelpId);

      //getUpdateted Proflie pic from from s3
      const imgUrl = await GetUserProfilePic(userData.id);
      userData = {...userData, imgUrl};
      if (userData) {
        setGetingHelpDetailes(userData);
        setLoading(false);
      }
    }
  };

  const setUpdatePost = async () => {
    if (post) {
      const updatedPost: GetAvailablePostByprofessionalInter = await getPost(
        post.id,
      );
      setPost(updatedPost);
      setLoading(false);
    }
  };

  const detachedPost = async () => {
    if (post) {
      setLoading(true);
      const data = await detachedPostToProfessional(post.id);
      const data2 = await changingStatusOfPost(post, 1, user.id);
      setUpdatePost();
    }
  };

  const OffferHelpToPerson = async () => {
    if (post) {
      setLoading(true);
      const data2 = await changingStatusOfPost(post, 2, user.id);
      const data = await connectProffesionalToPost(post.id, user.id);
      setUpdatePost();
    }
  };
  return (
    <>
      <NavBar
        title={hebrew.request_details}
        navigateBack={() => {
          navigation.pop(2);
          navigation.push('TabNavigatorGivingHelp');
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <View style={styles.spinner}>
            <LoadingSpinner color={'blue'} setHeight={100} />
          </View>
        ) : (
          <View style={styles.postContainer}>
            <View style={styles.postDetailes}>
              {post && (
                <View style={styles.typeAndDate}>
                  <Text style={styles.dateText}>
                    · {calculatingTime(post.dateUpdete)}
                  </Text>
                  <Text style={styles.typeText}>
                    {EnumProfessionsGlobal.find(
                      category => category.id === post.categoryId,
                    )?.he + ' '}
                  </Text>
                </View>
              )}
              <View style={styles.place}>
                {post && (
                  <Text style={styles.textStyle}>
                    {roundKilometer(
                      DistanceBetweenTwoPoints({
                        lat1: post.latitude,
                        lat2: user.lat,
                        lon1: post.longitude,
                        lon2: user.long,
                      }),
                    )}{' '}
                  </Text>
                )}
                <Text style={styles.textStyle}>·</Text>
                <Text style={styles.textStyle}>{cityPulled}</Text>
              </View>
            </View>
            <View style={styles.postCreatorDetailes}>
              <View style={styles.postCreatorDetailesRightSide}>
                {getingHelpDetailes && getingHelpDetailes.imgUrl.length > 2 ? (
                  <Image
                    style={styles.avatar}
                    source={{uri: getingHelpDetailes.imgUrl}}
                  />
                ) : (
                  <Image
                    style={styles.avatar}
                    source={require('../assets/images/avatar.jpg')}
                  />
                )}
                <View style={styles.nameAndButton}>
                  {getingHelpDetailes && (
                    <Text style={styles.name}>
                      {getingHelpDetailes.fullName}
                    </Text>
                  )}
                  <Text
                    style={styles.profileLink}
                    onPress={() =>
                      navigation.navigate('ProfileDetail', {
                        getingHelpDetailes: getingHelpDetailes,
                      })
                    }>
                    {hebrew.profile_details}
                  </Text>
                </View>
              </View>
              {post && post.statusTypeId === 3 && (
                <View style={styles.phoneContainer}>
                  {getingHelpDetailes && (
                    <Text style={styles.phone}>{getingHelpDetailes.phone}</Text>
                  )}
                  <Image
                    style={styles.messageIcon}
                    source={require('../assets/images/message.png')}
                  />
                </View>
              )}
            </View>
            <View style={styles.postContent}>
              {post && <Text style={styles.title}>{post.problemTitle}</Text>}
              {post && (
                <ReadMore text={post.problemDescription} minSize={400} />
              )}
            </View>
            <View>
              {picProblemArray && picProblemArray.length > 0 && (
                <PostsGallery picProblemArray={picProblemArray} />
              )}
            </View>

            {recommendtionPostDisplay && recommendtionPostDisplay.length > 0 && (
              <View style={styles.feedBackContainer}>
                <Text style={styles.readFeedBackTitle}>
                  {hebrew.read_feedback}
                </Text>
                <Text style={styles.feedBacktext}>
                  {recommendtionPostDisplay[0].review}
                </Text>
                <View style={styles.imagesContainer}>
                  {amountOfStars.map((num, index) => {
                    return (
                      <Image
                        key={index}
                        style={styles.imageS}
                        source={
                          num <= recommendtionPostDisplay[0].rate
                            ? require('../assets/images/star_filled.png')
                            : require('../assets/images/star_empty.png')
                        }
                      />
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        )}
        <View style={styles.buttonContainer}>
          {post?.statusTypeId === 3 && (
            <View style={styles.actions}>
              <Text style={styles.textButton} onPress={detachedPost}>
                {hebrew.cancel_post}
              </Text>
              <View style={styles.offerHelp}>
                <SeconderyButton
                  title={hebrew.set_time}
                  onPress={() => console.log('set time button')}
                />
              </View>
            </View>
          )}
          {post?.statusTypeId === 1 && (
            <View style={styles.actions}>
              {/* <Text style={styles.textButton}>{hebrew.share}</Text> */}
              <View style={styles.offerHelp}>
                <SeconderyButton
                  extraStyles={styles.offerButton}
                  title={hebrew.offerHelp}
                  onPress={OffferHelpToPerson}
                />
              </View>
            </View>
          )}
          {post?.statusTypeId === 2 && (
            <View style={styles.actions}>
              <Text style={styles.textButton} onPress={detachedPost}>
                {hebrew.cancel_post}
              </Text>
              <Text style={styles.textStyle}>
                {hebrew.waiting_to_gettingHelpPerson}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default PostDetailes;

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1, height: '100%'},
  typeAndDate: {flexDirection: 'row'},
  postContainer: {
    padding: 26,
    backgroundColor: 'white',
    flex: 5,
  },
  buttonContainer: {
    flex: 1,
  },
  postDetailes: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  place: {
    flexDirection: 'row-reverse',
  },
  avatarContainer: {
    width: 60,
    height: 60,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 30,
  },
  postCreatorDetailes: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  postCreatorDetailesRightSide: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  nameAndButton: {
    marginRight: 6,
  },
  name: {
    color: 'black',
    fontFamily: fonts.bold,
  },
  phoneContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.blue500,
    padding: 10,
    borderRadius: 10,
  },
  messageIcon: {
    width: 20,
    height: 20,
  },
  phone: {
    color: 'white',
    marginStart: 10,
    textDecorationLine: 'underline',
  },
  actions: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
  },
  postContent: {
    marginTop: 20,
  },
  offerHelp: {
    width: '90%',
    alignSelf: 'center',
    height: 80,
  },
  offerButton: {
    height: 57,

    justifyContent: 'center',
    backgroundColor: '#FED433',
  },
  textButton: {
    textDecorationLine: 'underline',
    color: 'black',
    fontFamily: fonts.regular,
  },
  profileLink: {
    textDecorationLine: 'underline',
    marginBottom: 1,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  title: {
    color: 'black',
    fontFamily: fonts.bold,
  },
  typeText: {
    color: '#B4B4B4',
    fontWeight: '900',
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  dateText: {
    color: '#B4B4B4',

    fontSize: 14,
    fontFamily: fonts.regular,
  },
  textStyle: {
    color: 'black',
    fontFamily: fonts.regular,
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
  imageS: {
    height: 40,
    width: 40,
    marginHorizontal: 5,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  feedBacktext: {
    color: 'black',
    fontFamily: fonts.regular,
    marginBottom: 10,
  },
  feedBackContainer: {
    padding: 15,
    marginTop: 20,
  },
  readFeedBackTitle: {
    color: 'black',
    fontFamily: fonts.bold,
    fontSize: 14,
  },
});
