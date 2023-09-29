import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {hebrew} from '../Hebrew';
import ReadMore from './ReadMore';
import {
  GetAvailablePostByprofessionalInter,
  GettingHelp_requsts,
} from '../Interfaces';
import DistanceBetweenTwoPoints from '../DistanceBetweenTwoPoints';
import {useLoginContext} from '../context/Context';
import {ConvertLoctionToAddress, GetPostPic, GetPostPics} from '../api';
import {calculatingTime, roundKilometer} from '../GeneralFunction_ForReUse';
import PostsGallery from './PostsGallery';
import fonts from '../../styles/fonts';
import PostStatusTypeSquare from './PostStatusTypeSquare';
import {ProfileBox} from './ProfileBox';

const Post = ({
  text,
  children,
  categoryText,
  iconPostStatus,
  postStatusType,
  dontShowProfileBox = true,
}: {
  text: GetAvailablePostByprofessionalInter | GettingHelp_requsts;
  children?: JSX.Element;
  postStatusType?: JSX.Element;
  categoryText?: string;
  iconPostStatus?: any;
  dontShowProfileBox?: boolean;
}) => {
  const [cityPulled, setCityPulled] = useState<string>(hebrew.israel);
  const {user} = useLoginContext();
  const [picProblemArray, setPicProblemArray] = useState<string[]>([]);
  const convertingToCity = async () => {
    const city = await ConvertLoctionToAddress(text.latitude, text.longitude);
    if (city) setCityPulled(city);
  };
  useEffect(() => {
    convertingToCity();
    const getPics = async () => {
      if (text.id !== undefined || text.postId !== undefined) {
        const picArray: string[] = await getPicsOfPost(text);
        setPicProblemArray([...picArray]);
      } else {
        setPicProblemArray([]);
      }
    };
    getPics();
  }, [text]);

  const getPicsOfPost = async (
    post: GetAvailablePostByprofessionalInter | GettingHelp_requsts,
  ) => {
    if (post.id !== undefined) {
      let picsPost = await GetPostPics(post?.id.toString());
      return await picsPost.data;
    }
    if (post.postId !== undefined) {
      let picsPost = await GetPostPics(post.postId.toString());
      return await picsPost.data;
    }
  };
  return (
    <View style={styles.postContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.dateAndType}>
          <Text>{calculatingTime(text.dateUpdete)}</Text>
        </View>

        <View style={styles.place}>
          <Text>
            {roundKilometer(
              DistanceBetweenTwoPoints({
                lat1: text.latitude,
                lat2: user.lat,
                lon1: text.longitude,
                lon2: user.long,
              }),
            )}
          </Text>
          <Text> - </Text>
          <Text>{cityPulled}</Text>
        </View>
      </View>
      <View style={styles.postStatusColorBox}>
        {text.gettingHelpId === user.id || text.statusTypeId !== 1 ? (
          <PostStatusTypeSquare postStatusTypeNumber={text?.statusTypeId} />
        ) : null}
      </View>
      {(text.statusTypeId === 2 || text.statusTypeId === 4) &&
      dontShowProfileBox ? (
        <ProfileBox post={text} />
      ) : null}

      <View style={styles.postBodyContainer}>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>{text.problemTitle}</Text>
          <Text style={styles.categoryText}>
            {categoryText ? categoryText : hebrew.fixising}
          </Text>
        </View>
        <ReadMore text={text.problemDescription} minSize={60} />
      </View>
      <View>
        <PostsGallery picProblemArray={picProblemArray} />
      </View>
      {children}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postStatusColorBox: {
    alignItems: 'flex-end',
  },
  categoryText: {
    color: '#929095',
    fontWeight: '700',
  },
  infoContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  dateAndType: {
    flexDirection: 'row-reverse',
  },
  place: {
    flexDirection: 'row-reverse',
  },
  postContainer: {
    padding: 18,
    marginBottom: 15,
    backgroundColor: 'white',
    marginHorizontal: '3%',
    borderRadius: 9.4,
    // height: '80%',
  },
  postBodyContainer: {
    marginTop: 10,
  },
  title: {
    fontFamily: fonts.bold,
    color: 'black',
    alignSelf: 'flex-end',
  },
  bodtText: {
    marginTop: 10,
    flexDirection: 'row-reverse',
    fontFamily: fonts.regular,
    color: 'black',
  },
  readMore: {
    textDecorationLine: 'underline',
  },
});
