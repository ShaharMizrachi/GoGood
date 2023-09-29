import React, {useEffect, useState} from 'react';
import {GotItRecommendation} from '../Interfaces';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {calculatingTime} from '../GeneralFunction_ForReUse';
import fonts from '../../styles/fonts';
import Avatar from '../../assets/images/Avatar';
import StarsRate from './StarsRate';
import {
  GetUserProfilePic,
  getUser,
  getUserAvgRateByUserId,
  getUserById,
} from '../api';

const ReviewBox = ({
  userReview,
  starsModifingDisable = false,
}: {
  userReview: GotItRecommendation;
  starsModifingDisable: boolean;
}) => {
  const [daysPastFromRec, setDaysPastFromRec] = useState<String | undefined>();
  const [profilePic, setProfilePic] = useState<string>();
  const [name, setName] = useState<string>();
  useEffect(() => {
    daysCalculation();
    pullingProfilePic();
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const {fullName = ''} = await getUserById(userReview.whoGaveItId);
    if (fullName) setName(fullName);
  };
  const pullingProfilePic = async () => {
    console.log(userReview.whoGaveItId.toString());
    const getProfilePic = await GetUserProfilePic(
      userReview.whoGaveItId.toString(),
    );
    getProfilePic && setProfilePic(getProfilePic?.data?.url);
  };

  const daysCalculation = () => {
    const dateObject = new Date(userReview.reviewDate);
    const daysPastFromDate = calculatingTime(dateObject);
    setDaysPastFromRec(daysPastFromDate);
  };
  return (
    <View style={styles.boxContainer}>
      <View style={styles.starAndRightSideContainer}>
        <View style={styles.reviewHeader}>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.nameText, styles.textGeneralSetting]}>
              {name}
            </Text>
            <Text style={[styles.textGeneralSetting]}>{daysPastFromRec}</Text>
          </View>
          <View style={styles.imageContainer}>
            {profilePic?.length != undefined && profilePic?.length > 0 ? (
              <Image style={styles.avatar} source={{uri: profilePic}} />
            ) : (
              <Avatar h={60} w={45} />
            )}
          </View>
        </View>
        <View style={styles.starsContainer}>
          <StarsRate
            setRatingNumber={() => {}}
            defultStarNumber={userReview.rate}
            disable={starsModifingDisable}
          />
        </View>
      </View>

      <Text style={[styles.reviewBody, styles.textGeneralSetting]}>
        {userReview.review}
      </Text>
    </View>
  );
};

export default ReviewBox;

const styles = StyleSheet.create({
  boxContainer: {
    width: '95%',
    alignItems:'center',
    justifyContent:'center',
    flexGrow: 1,
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: Colors.white,
    padding: 16,
    alignSelf: 'center',
    marginVertical: '2%',
  },
  textGeneralSetting: {
    color: Colors.black,
  },
  nameText: {
    fontFamily: fonts.bold,
  },
  reviewBody: {
    marginTop: '4%',
    textAlign:'right',
    width:'100%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  imageContainer: {
    marginLeft: '3%',
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  reviewHeader: {
    flexDirection: 'row',
  },
  starAndRightSideContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  starsContainer: {
    backgroundColor: 'white',
    borderRadius: 50,

    elevation: 5,
  },
});
