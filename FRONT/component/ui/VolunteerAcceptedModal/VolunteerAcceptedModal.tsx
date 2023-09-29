/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './VolunteerAcceptedModalStyles';
import {hebrew} from '../../Hebrew';
import MonsterRegular from '../../../assets/images/MonsterRegular';
import ModalPopup from '../ModalPopup';
import Avatar from '../../../assets/images/Avatar';
import {
  GetGivingHelpOwnerPostsByPostId,
  GetUserProfilePic,
  changingStatusOfPost,
  detachedPostToProfessional,
} from '../../api';
import {calculateDaysAgo} from '../../../Helpers/Time';
import {IVolunteer, RootStackParamList} from '../../Interfaces';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {calculatingTime} from '../../GeneralFunction_ForReUse';
import {useLoginContext} from '../../context/Context';

const VolunteerAcceptedModal = ({
  modal: {closeModal, openModal, params},
}: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const post = params?.post;
  console.log({post});

  const {EnumProfessionsGlobal, user} = useLoginContext();
  const [volunteer, setVolunteer] = useState<IVolunteer>({
    name: '',
    id: '',
    imgUrl: '',
    phone: '',
  });
  const onNext = async () => {
    const newPost = {
      id: post.Id,
      categoryId: post.CategoryId,
      gettingHelpId: post.GettingHelpId,
      problemTitle: post.ProblemTitle,
      problemDescription: post.ProblemDescription,
      problemPic: post.ProblemPic,
      statusTypeId: post.StatusTypeId,
      dateUpdete: post.DateUpdete,
      latitude: post.Latitude,
      longitude: post.Longitude,
    };
    changingStatusOfPost(newPost, 3, user.id)
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        closeModal('VolunteerAcceptedModal');
        openModal('VolunteerConfirmModal', {volunteer});
      });
  };
  const onBack = async () => {
    const newPost = {
      id: post.Id,
      categoryId: post.CategoryId,
      gettingHelpId: post.GettingHelpId,
      problemTitle: post.ProblemTitle,
      problemDescription: post.ProblemDescription,
      problemPic: post.ProblemPic,
      statusTypeId: post.StatusTypeId,
      dateUpdete: post.DateUpdete,
      latitude: post.Latitude,
      longitude: post.Longitude,
    };
    // detachedPostToProfessional(post.id)
    changingStatusOfPost(newPost, 1, user.id)
      .then(() => {})
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        closeModal('VolunteerAcceptedModal');
      });
  };
  const buildReqDetails = () => {
    const categoryText = EnumProfessionsGlobal.find(
      e => e.id === post?.CategoryId,
    )?.he;
    console.log(categoryText);
    return `${categoryText ?? ''} | ${calculatingTime(post?.DateUpdete)}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await GetGivingHelpOwnerPostsByPostId(post?.Id);
        const imgUrlData = await GetUserProfilePic(data.id);
        const imgUrl = imgUrlData?.data?.url ?? '';
        setVolunteer({
          imgUrl: imgUrl,
          name: data.fullName,
          id: data.id,
          phone: data.phone,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const navigateToProfile = () => {
    closeModal('VolunteerAcceptedModal');
    navigation.navigate('ProfileDetail', {
      getingHelpDetailes: {id: volunteer.id, fullName: volunteer.name},
    });
  };

  return (
    <ModalPopup open={true}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MonsterRegular />
          <Text style={styles.title}>{hebrew.newVolunteer}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.volunteerDetailed}>
            {volunteer?.imgUrl && volunteer?.imgUrl !== '' ? (
              <Image style={styles.avatar} source={{uri: volunteer?.imgUrl}} />
            ) : (
              <Avatar h={49} w={49} />
            )}
            <Text style={styles.boldText}>{volunteer?.name}</Text>
            <TouchableOpacity onPress={navigateToProfile}>
              <Text style={styles.link}>{hebrew.enterProfile}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.requestDetailed}>
            <Text style={styles.regularText}>{hebrew.offerHisHelp}</Text>
            <Text style={styles.boldText}>{buildReqDetails()}</Text>
            <Text style={styles.regularText}>{hebrew.confirmRevelDetails}</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={() => onNext()}>
            <Text style={styles.modalButtonText}>{hebrew.confirming}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => onBack()}>
            <Text style={styles.modalButtonText}> {hebrew.not_this_time}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalPopup>
  );
};
export default VolunteerAcceptedModal;
