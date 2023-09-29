import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Avatar from '../../assets/images/Avatar';
import {useLoginContext} from '../context/Context';
import {
  GetGivingHelpOwnerPostsByPostId,
  GetUserProfilePic,
  getUserAvgRateByUserId,
  getUserById,
} from '../api';
import StarsRate from './StarsRate';
import fonts from '../../styles/fonts';
import {ProfileOfOtherUserIN, RootStackParamList} from '../Interfaces';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {hebrew} from '../Hebrew';

export const ProfileBox = ({post}: {post?: any}) => {
  const {user} = useLoginContext();
  const [displayData, setDisplayData] = useState<ProfileOfOtherUserIN>({
    userId: 0,
    profilePic: '',
    AvgRate: 0,
    fullName: '',
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    pullingData();
  }, []);

  const pullingData = async () => {
    let profileToUse;
    if (user.type === 'GettingHelp') {
      // console.log({post});
      if (post?.id !== undefined || post?.postId !== undefined) {
        profileToUse =
          post?.id !== undefined
            ? await GetGivingHelpOwnerPostsByPostId(post?.id)
            : await GetGivingHelpOwnerPostsByPostId(post?.postId);
        // console.log({profileToUse});
      } else {
        // profileToUse = post?.givingHelpId;
        profileToUse = await getUserById(post?.givingHelpId);
      }
    } else if (!!post) {
      // to check that shahar
      profileToUse = await getUserById(post?.gettingHelpId);
      // profileToUse = post?.gettingHelpId;
    }

    let profile = profileToUse
      ? profileToUse?.data
        ? profileToUse?.data
        : profileToUse
      : undefined;
    if (profile !== undefined) {
      // console.log({profile: profile.id});
      const pullingProfilePic = await GetUserProfilePic(profile.id.toString());
      const pullingRateAvg = await getUserAvgRateByUserId(profile.id);
      const getUser = await getUserById(profile.id);

      // console.log({getUser});

      setDisplayData({
        userId: profile.id,
        profilePic:
          pullingProfilePic && pullingProfilePic.data.url.length > 0
            ? pullingProfilePic.data.url
            : '',
        AvgRate: pullingRateAvg ? pullingRateAvg : 0,
        fullName: getUser.fullName ? getUser.fullName : '',
      });
    }
  };
  const setRate = () => {};
  return (
    <View style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        <Pressable
          onPress={() => navigation.push('PostDetailes', {post: post})}>
          {displayData && displayData?.profilePic.length > 0 ? (
            <Image
              style={styles.avatar}
              source={{uri: displayData?.profilePic}}
            />
          ) : (
            <Avatar h={60} w={60} />
          )}
        </Pressable>
      </View>
      <View style={styles.textStarsContainer}>
        <View
          style={{
            flexDirection: 'row-reverse',
          }}>
          <Text style={styles.nameStyle}>{displayData?.fullName}</Text>
          <View style={styles.starsContainer}>
            <StarsRate
              setRatingNumber={setRate}
              defultStarNumber={displayData?.AvgRate}
              disable={true}
            />
          </View>
        </View>
        <Text
          style={styles.watchProfileLink}
          onPress={() =>
            navigation.push(
              'ProfileOfOtherUser',
              displayData !== undefined ? displayData : undefined,
            )
          }>
          {hebrew.enterProfile}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row-reverse',
    marginTop: 15,
    backgroundColor: '#f6feff',
    height: 80,
    
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  avatarContainer: {
    width: '20%',
    height: 60,
    alignItems: 'flex-end',
  },
  starsContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 3,
  },
  nameStyle: {
    color: 'black',
    fontFamily: fonts.bold,
    fontSize: 15.04,
    minWidth: 70,
    marginLeft: 10,
    alignItems: 'center',
  },
  textStarsContainer: {
    width: '80%',
  },
  watchProfileLink: {
    fontSize: 15.04,
    color: '#28449C',
    textDecorationLine: 'underline',
  },
});
