import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {hebrew} from '../component/Hebrew';
import NavBar from '../component/ui/NavBar';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  GetAvailablePostByprofessionalInter,
  Recommendtion,
  RootStackParamList,
  UserGoGood,
} from '../component/Interfaces';
import Avatar from '../assets/images/Avatar';
import TrashIcon from '../assets/images/TrashIcon';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import StarsRate from '../component/ui/StarsRate';
import Input from '../component/ui/Input';
import SmallRoundButtonWithBackground from '../component/ui/SmallRoundButtonWithBackground';
import {useLoginContext} from '../component/context/Context';
import {
  GetGivingHelpOwnerPostsByPostId,
  GetUserProfilePic,
  getUserById,
  sendRecommendation,
} from '../component/api';
import {useModal} from 'react-native-modalfy';
const screenWidth = Dimensions.get('screen').width;
const AddNewRecommendation = () => {
  const {openModal, currentModal, closeModal} = useModal();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'AddNewRecommendation'>>();
  const {user} = useLoginContext();

  const [userGetRecommendtion, setUserGetRecommendtion] =
    useState<UserGoGood>();

  const [recommendation, setRecommendation] = useState<Recommendtion>({
    postId: 0,
    review: '',
    rate: 0,
    whoGaveItId: 0,
    whoGotItId: 0,
    reviewDate: new Date(),
  });

  useEffect(() => {
    pullingUsergetRecommendtion();
  }, [route.params]);

  const pullingUsergetRecommendtion = async () => {
    // console.log({route: route.params?.item.id});
    let userGet = await getUserById(route.params?.item.givingHelpId);
    const profilepicOfUserGive = await GetUserProfilePic(
      route.params?.item.givingHelpId.toString(),
    );
    console.log({profilepicOfUserGive: profilepicOfUserGive?.data?.url});
    userGet.imgUrl = profilepicOfUserGive?.data?.url;
    setUserGetRecommendtion(userGet);
  };

  const setRate = (rate: number) => {
    setRecommendation({...recommendation, rate: rate});
  };

  const buttonsStyle = {
    width: 336,
    height: 57,
    borderRadius: 27.5,
  };
  const postRecommendtion = async () => {
    const postDetailsOnRecommendtion: any = route.params?.item;
    let recInfoToPass;
    if (postDetailsOnRecommendtion.givingHelpId === undefined) {
      recInfoToPass = {
        ...recommendation,
        postId: postDetailsOnRecommendtion.id,
        whoGaveItId: user.id,
        whoGotItId: postDetailsOnRecommendtion.gettingHelpId,
      };
    } else {
      recInfoToPass = {
        ...recommendation,
        postId: postDetailsOnRecommendtion.postId,
        whoGaveItId: user.id,
        whoGotItId: postDetailsOnRecommendtion.givingHelpId,
      };
    }
    console.log({recInfoToPass});
    setRecommendation(recInfoToPass);
    sendRecomendtionButton(recInfoToPass);

    openModal('PublishRequestSuccessModal', {
      // onBack: () => {
      //   closeModal('PublishRequestSuccessModal');
      // },
    });
    if (user.type === 'GivingHelp') {
      navigation.navigate('TabNavigatorGivingHelp');
    } else {
      navigation.navigate('TabNavigatorGettingHelp');
    }
  };
  console.log(user.type);
  const sendRecomendtionButton = async (recommendationDirect: any) => {
    const data = await sendRecommendation(recommendationDirect);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <NavBar
        title={hebrew.add_recommmendtion}
        navigateBack={navigation.goBack}
      />
      <View
        style={{
          flexDirection: 'column',
          marginTop: '5%',
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={styles.header}>
          <View style={styles.rightSideHeader}>
            <View style={styles.avatarContainer}>
              {userGetRecommendtion?.imgUrl != undefined ? (
                <Image
                  style={styles.avatar}
                  source={{uri: userGetRecommendtion.imgUrl}}
                />
              ) : (
                <Avatar h={60} w={60} />
              )}
            </View>
            <View style={styles.nameAndDetailesBtn}>
              <Text style={styles.name}>{'name'}</Text>
            </View>
          </View>
        </View>
        {/* --------hadaer text----------- */}
        <View style={styles.headerText}>
          <Text style={[styles.textHeadrGeneral, {color: 'black'}]}>
            {hebrew.rate_your_openion_on_valenter}
          </Text>
          <Text style={[styles.textHeadrGeneral, {color: '#929095'}]}>
            {hebrew.five_starts_max}
          </Text>
        </View>
        {/* -----------stars Icon----------- */}
        <View style={styles.starsContainer}>
          <StarsRate
            setRatingNumber={setRate}
            defultStarNumber={5}
            disable={false}
          />
        </View>
        {/* --------------- inputs-------------- */}

        <View style={styles.inputContainer}>
          <Input
            text={recommendation?.review}
            textChanged={(t: string) => {
              setRecommendation({...recommendation, review: t});
            }}
            placeHolder={hebrew.body_of_request_review}
            extraStyles={styles.input}
            multiline={true}
            numberOfLines={6}
          />
        </View>
        {/* ------------------------button--------------------- */}

        <View style={styles.modalButtons}>
          <SmallRoundButtonWithBackground
            callback={() => postRecommendtion()}
            text={hebrew.publish}
            style={buttonsStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default AddNewRecommendation;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
  },
  rightSideHeader: {
    alignItems: 'center',
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
    width: 50,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
  },
  nameAndDetailesBtn: {
    marginTop: 25,
    justifyContent: 'center',
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
  iconSize: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    marginHorizontal: '5%',
    flex: 4,
  },
  input: {
    borderColor: '#dbdbdb',
    borderWidth: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    textAlignVertical: 'top',
    textAlign: 'right',
    color: 'black',
    width: screenWidth * 0.8,
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
  modalButtons: {
    width: '100%',

    alignItems: 'center',

    flex: 2,
  },
  starsContainer: {
    borderRadius: 50,

    elevation: 3,
    flex: 0.5,
    backgroundColor: 'white',
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '8%',
    minHeight: 5,
    marginBottom: '10%',
  },
  headerText: {
    flex: 0.5,
    marginHorizontal: '5%',
  },
  textHeadrGeneral: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});
