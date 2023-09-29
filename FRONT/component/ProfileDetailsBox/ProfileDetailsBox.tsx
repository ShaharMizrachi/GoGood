import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProfileDetailsBoxProps} from './ProfileDetailsBoxProps';
import styles from './ProfileDetailsBoxStyles';
import Avatar from '../../assets/images/Avatar';
import StarsRate from '../ui/StarsRate';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {hebrew} from '../Hebrew';
import {ProfileOfOtherUserIN, RootStackParamList} from '../Interfaces';
import {GetUserProfilePic, getUserAvgRateByUserId} from '../api';
import {useModal} from 'react-native-modalfy';
export const ProfileDetailsBox = ({
  id = '39',
  innerText,
  name,
  userDescription,
}: ProfileDetailsBoxProps) => {
  const {closeModal, currentModal} = useModal();
  const [details, setDetails] = useState({name: '', img: '', rate: ''});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigateToProfile = () => {
    navigation.navigate('ProfileOfOtherUser', {
      userId: id,
      profilePic: details.img,
      AvgRate: details.rate,
      fullName: details.name,
      userDescription: userDescription,
    });
    closeModal(currentModal!);
  };
  useEffect(() => {
    const pullingData = async () => {
      const pullingProfilePic = await GetUserProfilePic(id);
      const pullingRateAvg = await getUserAvgRateByUserId(Number(id));
      setDetails({
        img: pullingProfilePic.data.url,
        rate: pullingRateAvg ?? 0,
        name: name,
      });
    };
    pullingData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.up}>
          <View style={styles.starsContainer}>
            <StarsRate
              setRatingNumber={() => {}}
              defultStarNumber={Number(details.rate)}
              disable={true}
            />
          </View>
          <View style={styles.body}>
            <Text>{name}</Text>
            <Text style={styles.watchProfileLink} onPress={navigateToProfile}>
              {hebrew.enterProfile}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            {details.img ? (
              <Image style={styles.avatar} source={{uri: details.img}} />
            ) : (
              <Avatar h={60} w={60} />
            )}
          </View>
        </View>
        <View style={styles.down}>
          <Text style={styles.text}>{innerText} </Text>
        </View>
      </View>
    </View>
  );
};
