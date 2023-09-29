/* eslint-disable prettier/prettier */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './GettingHelpAcceptModalStyles';
import Avatar from '../../../assets/images/Avatar';
import MonsterRegular from '../../../assets/images/MonsterRegular';
import {hebrew} from '../../Hebrew';
import ModalPopup from '../ModalPopup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {calculatingTime} from '../../GeneralFunction_ForReUse';
import {RootStackParamList, IVolunteer} from '../../Interfaces';
import {useLoginContext} from '../../context/Context';
import {GetUserProfilePic} from '../../api';
export const GettingHelpAcceptModal = ({
  modal: {closeModal, openModal, params},
}: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const post = params?.post;

  const {EnumProfessionsGlobal, user} = useLoginContext();
  const [gettingHelp, setGettingHelp] = useState<IVolunteer>({
    name: '',
    id: '',
    imgUrl: '',
    phone: '',
  });
  const buildReqDetails = () => {
    const categoryText = EnumProfessionsGlobal.find(
      e => e.id === post?.CategoryId,
    )?.he;
    console.log(categoryText);
    return `${categoryText ?? ''} | ${calculatingTime(post?.DateUpdete)}`;
  };
  const navigateToProfile = () => {
    closeModal('VolunteerAcceptedModal');
    navigation.navigate('ProfileDetail', {
      getingHelpDetailes: {id: gettingHelp.id, fullName: gettingHelp.name},
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const imgUrlData = await GetUserProfilePic(post.GettingHelp.Id);
        const imgUrl = imgUrlData?.data?.url ?? '';
        setGettingHelp({
          imgUrl: imgUrl,
          name: post.GettingHelp.FullName,
          id: post.GettingHelp.Id,
          phone: post.GettingHelp.Phone,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const onNext = () => {
    openModal('ContactModal', {item: {gettingHelpId: post.GettingHelpId}});
  };
  return (
    <ModalPopup open={true}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MonsterRegular />
          <Text style={styles.title}>{hebrew.newVolunteering}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.volunteerDetailed}>
            {gettingHelp?.imgUrl && gettingHelp?.imgUrl !== '' ? (
              <Image
                style={styles.avatar}
                source={{uri: gettingHelp?.imgUrl}}
              />
            ) : (
              <Avatar h={49} w={49} />
            )}
            <Text style={styles.boldText}>{gettingHelp?.name}</Text>
            <TouchableOpacity onPress={navigateToProfile}>
              <Text style={styles.link}>{hebrew.enterProfile}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.requestDetailed}>
            <Text style={styles.regularText}>{hebrew.to_help_with}</Text>
            <Text style={styles.boldText}>{buildReqDetails()}</Text>
            <Text style={styles.regularText}>{hebrew.confirmContact}</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={() => onNext()}>
            <Text style={styles.modalButtonText}>{hebrew.contact}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalPopup>
  );
};
//https://www.figma.com/file/ecfxlRHJKcfu83oIl60Tkm/Go-GooD---Client?type=design&node-id=1526-19664&mode=design&t=tFWcd9bj5cHlHWgs-4
// {
//   "post": {
//       "Id": 251,
//       "CategoryId": 1,
//       "GettingHelpId": 39,
//       "ProblemTitle": "",
//       "ProblemDescription": "Test",
//       "ProblemPic": "",
//       "StatusTypeId": 3,
//       "DateUpdete": "2023-08-02T00:00:00",
//       "Latitude": 37.4226985,
//       "Longitude": -122.0849128,
//       "Category": null,
//       "GettingHelp": {
//           "Id": 39,
//           "FullName": "ShaharGetTest",
//           "Phone": "0511111111",
//           "ImgUrl": "",
//           "UserDescription": "היוזר של שחר",
//           "FcmToken": "c5IwFCHJR_SI3pM8rkueZY:APA91bGUrd2DUUTK1rUO_8yerL4neAv_dnisR1SvSqnVEerhS8UUlBtIEtLTAWjpINUZWd4VR2iGwrhLMBP2iDJKWdoMndgee5yNBA2VOoZZozRolq_Bb7lg-UdRujz-_oLecI-dnVP0",
//           "Imei": "",
//           "UserType": "GettingHelp",
//           "IsActive": 1,
//           "GivingHelpOwnerPosts": [],
//           "GivingHelpPerProfessions": [],
//           "Posts": [],
//           "Recommendation": []
//       },
//       "StatusType": null,
//       "GivingHelpOwnerPosts": [],
//       "Recommendation": []
//   }
// }
