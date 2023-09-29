import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import NavBar from '../component/ui/NavBar';
import {hebrew} from '../component/Hebrew';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ProfileOfOtherUserIN,
  RootStackParamList,
} from '../component/Interfaces';
import Avatar from '../assets/images/Avatar';
import fonts from '../styles/fonts';
import EmptyRequstsUser from '../component/ui/EmptyRequstsUser';
import {getAllWhoGotItRecommendationsByUserId} from '../component/api';
import StarsRate from '../component/ui/StarsRate';
import ReviewBox from '../component/ui/ReviewBox';

const ProfileOfOtherUser = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProfileOfOtherUser'>>();
  const [displayData, setDisplayData] = useState<ProfileOfOtherUserIN>({
    userId: 0,
    profilePic: '',
    AvgRate: 0,
    fullName: '',
  });
  const [userGaveRec, setUserGaveRec] = useState<any[]>();

  // export interface ProfileOfOtherUserIN {
  //   userId: number;
  //   profilePic: string;
  //   AvgRate: number;
  //   fullName: string;
  // }
  useEffect(() => {
    console.log('route.params', route.params);
    setDisplayData({
      userId: route.params?.userId,
      profilePic: route.params?.profilePic,
      AvgRate: route.params?.AvgRate,
      fullName: route.params?.fullName,
      userDescription: route.params?.userDescription,
    });
    getAllWhoGotItRecommendations();
  }, []);

  const getAllWhoGotItRecommendations = async () => {
    const alluserssgaveToMe = await getAllWhoGotItRecommendationsByUserId(
      route.params?.userId,
    );
    setUserGaveRec(alluserssgaveToMe);
  };

  useEffect(() => {
    console.log({userGaveRec});
  }, [userGaveRec]);

  const setRate = () => {};

  return (
    <>
      <NavBar
        title={hebrew.profile_of + ' ' + displayData.fullName}
        navigateBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.imgContainer}>
            {displayData && displayData.profilePic.length > 0 ? (
              <Image
                style={styles.avatar}
                source={{uri: displayData.profilePic}}
              />
            ) : (
              <Avatar />
            )}
          </View>
          <View style={styles.paragraph}>
            <Text style={styles.title}>{displayData.fullName}</Text>
            <Text style={styles.p}>{displayData.userDescription}</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <View style={styles.starsContainer}>
            <StarsRate
              setRatingNumber={setRate}
              defultStarNumber={displayData?.AvgRate}
              disable={true}
              width="10%"
            />
          </View>
          <Text style={styles.reviewTitle}>{hebrew.reviews}</Text>
          {userGaveRec === undefined || userGaveRec.length === 0 ? (
            <View style={styles.containerEmpty}>
              <EmptyRequstsUser
                title={hebrew.recommendation_dont_exist}
                bodyText={hebrew.you_can_try_tommarrow}
              />
            </View>
          ) : (
            <View style={styles.flatlistContainer}>
              {userGaveRec && (
                <FlatList
                  data={userGaveRec}
                  renderItem={({item}) => (
                    <View>
                      {/* <ReviewBox userReview={item} /> */}
                      <ReviewBox
                        userReview={item}
                        starsModifingDisable={true}
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default ProfileOfOtherUser;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  containerEmpty: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    //marginBottom: '40%',
  },
  top: {
    backgroundColor: '#0064C3',
    width: '100%',
    alignItems: 'center',
    height: '30%',
    flexDirection: 'column',
  },
  bottom: {
    height: '70%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ebf3fb',
    flexDirection: 'column',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarContainer: {
    width: 60,
    height: 60,
  },
  paragraph: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    flex: 1,
  },
  imgContainer: {
    width: 130,
    height: 130,
    marginTop: '3%',
  },
  p: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.regular,
    lineHeight: 25,
    paddingBottom: 25,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: '700',
  },
  flatlistContainer: {
    width: '100%',
  },
  singlePostContainer: {
    marginTop: 10,
    marginHorizontal: '2%',
    height: 500,
    backgroundColor: 'red',
  },
  starsContainer: {
    zIndex: 0,
    top: '-4%',
    height: 50,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: 'rgba(159, 159, 159, 0.5)',
    borderWidth: 0.5,
    elevation: 5,
  },
  reviewTitle: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    fontFamily: fonts.bold,
    fontSize: 18,
    color: 'black',
  },
});
