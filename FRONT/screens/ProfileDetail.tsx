import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {GotItRecommendation, RootStackParamList} from '../component/Interfaces';
import {useRoute, RouteProp} from '@react-navigation/native';
import {hebrew} from '../component/Hebrew';
import fonts from '../styles/fonts';
import Avatar from '../assets/images/Avatar';
import {
  GetUserProfilePic,
  getAllWhoGotItRecommendationsByUserId,
} from '../component/api';
import ReviewBox from '../component/ui/ReviewBox';
import NavBar from '../component/ui/NavBar';
import {ReviewsProps} from './Reviews/ReviewsProps';

const ProfileDetail = ({navigation}: ReviewsProps) => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProfileDetail'>>();
  const [profilePic, setProfilePic] = useState<string>();
  const [allRecommendtionUserGot, setAllRecommendtionUserGot] =
    useState<GotItRecommendation[]>();

  useEffect(() => {
    pullingProfilePic();
    getAllWhoGotItRecommendations();
  }, []);

  const pullingProfilePic = async () => {
    if (route.params?.getingHelpDetailes.id !== undefined) {
      const getProfilePic = await GetUserProfilePic(
        route.params?.getingHelpDetailes.id.toString(),
      );
      setProfilePic(getProfilePic.data.url);
    }
  };

  const getAllWhoGotItRecommendations = async () => {
    const allRecommendtionUesrGot = await getAllWhoGotItRecommendationsByUserId(
      route.params?.getingHelpDetailes.id,
    );
    setAllRecommendtionUserGot(allRecommendtionUesrGot);
  };
  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.pageContainer}>
      <NavBar title={hebrew.reviews} navigateBack={navigateBack} />
      <View style={styles.profileContainer}>
        <View style={styles.profilebodyConatiner}>
          <View style={styles.profilebodyConatinerTitle}>
            <Text style={[styles.profileText]}>
              {hebrew.the_profile_of}{' '}
              {route.params?.getingHelpDetailes.fullName}
            </Text>
          </View>
          <View style={styles.profilebodyConatinerBody}>
            <View style={styles.imageContainer}>
              {profilePic ? (
                <Image style={styles.avatar} source={{uri: profilePic}} />
              ) : (
                <Avatar h={100} w={100} />
              )}
            </View>
            <Text
              style={[
                styles.profileText,
                {fontFamily: fonts.bold, marginTop: '2%'},
              ]}>
              {route.params?.getingHelpDetailes.fullName}
            </Text>
           
          </View>
        </View>
      </View>
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationContainerTitle}>
          {hebrew.reviews}
        </Text>

        <View>
          {allRecommendtionUserGot && (
            <FlatList
              data={allRecommendtionUserGot}
              renderItem={({item}) => (
                <View>
                  {/* <ReviewBox userReview={item} /> */}
                  <ReviewBox userReview={item} starsModifingDisable={true} />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#0064C3',
    flexDirection: 'row',
  },
  recommendationContainer: {
    flex: 2,
  },
  profilebodyConatiner: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    marginVertical: 16,
  },
  profileText: {
    fontSize: 16,
    color: 'white',
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: '1%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  profilebodyConatinerTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  profilebodyConatinerBody: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
  },
  recommendationContainerTitle: {
    color: '#000000',
    fontFamily: fonts.regular,
    fontSize: 18,
    fontWeight: '700',
    marginRight: '4%',
    marginVertical: '3%',
  },
});
