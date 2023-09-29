import {
  EventArg,
  StackNavigationState,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {
  changingStatusOfPost,
  gettingHelp_statusActiveClose,
  gettingHelp_statusPending,
  sendRecommendation,
} from '../../component/api';
import {useLoginContext} from '../../component/context/Context';
import {hebrew} from '../../component/Hebrew';
import {
  GettingHelp_requsts,
  RootStackParamList,
} from '../../component/Interfaces';
import ActionBar from '../../component/ui/ActionBar';
import AlertModel from '../../component/ui/AlertModel';
import EmptyRequstsUser from '../../component/ui/EmptyRequstsUser';
import Input from '../../component/ui/Input';
import LoadingSpinner from '../../component/ui/LoadingSpinner';
import Post from '../../component/ui/Post';
import PrimaryButton from '../../component/ui/PrimaryButton';
import StarsRate from '../../component/ui/StarsRate';
import colors from '../../styles/colors';
import RoundButtonWithoutBackgroundColor from '../../component/ui/RoundButtonWithoutBackgroundColor';
import SmallRoundButtonWithBackground from '../../component/ui/SmallRoundButtonWithBackground';
import {useModal} from 'react-native-modalfy';

//ApplicationsApproved
const MyRequests = () => {
  const [postA, setPostA] = useState<GettingHelp_requsts[]>();
  const {user, EnumProfessionsGlobal} = useLoginContext();
  const selectedItem = useRef<any>();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [filteredPosts, setFilteredPosts] = useState<GettingHelp_requsts[]>([]);
  const [loading, setLoading] = useState(false);
  const [showThanksModal, setShowThanksModal] = useState<boolean>(false);
  const [thanksDetails, setThanksDetails] = useState<any>({
    review: '',
    rate: 5,
    GivingHelpOwnerPostId: 0,
  });

  useEffect(() => {
    const listner = (
      e: EventArg<
        'state',
        any,
        {
          state: StackNavigationState<RootStackParamList>;
        }
      >,
    ) => {
      if (e.data.state.index === 0) {
        PullingApplicationsPanding();
      }
    };
    navigation.addListener('state', listner);
    return () => navigation.removeListener('state', listner);
  }, []);

  const PullingApplicationsPanding = async () => {
    setLoading(true);
    const data1 = await gettingHelp_statusActiveClose(user.id, user.token); // pullingGettingHelp_statusActiveClose();
    const data = await gettingHelp_statusPending(user.id, user.token); //        PullingApplicationsPanding();
    let data2 = data1.data
      .concat(data.data)
      .filter((t: any) => t.statusTypeId !== 4);
    data2 != undefined && setPostA(data2);
    setFilteredPosts(data2);
    setLoading(false);
  };

  const onPressMap = () => {
    postA != undefined && navigation.navigate('MapPrimary', {posts: postA});
  };
  const {openModal, closeModal, closeAllModals} = useModal();

  const changingStatus = async (
    changingtoStatus: number,
    post: GettingHelp_requsts,
  ) => {
    if (changingtoStatus === 5) {
      openModal('DeleteModal', {
        onBack: () => navigation.goBack(),
        onNext: async () => {
          const postToChange = {...post, id: post.postId};
          const data2 = await changingStatusOfPost(
            postToChange,
            changingtoStatus,
            user.id,
          );
          PullingApplicationsPanding();
        },
      });
    } else {
      const postToChange = {...post, id: post.postId};
      const data2 = await changingStatusOfPost(
        postToChange,
        changingtoStatus,
        user.id,
      );
      PullingApplicationsPanding();
    }
  };

  const sayThanks = (IdGivingHelpOwnerPost: any) => {
    setShowThanksModal(true);
    setThanksDetails({
      ...thanksDetails,
      GivingHelpOwnerPostId: IdGivingHelpOwnerPost,
    });
  };

  const setRate = (rate: number) => {
    if (rate) setThanksDetails({...thanksDetails, rate: rate});
  };

  const sendRecomendtionButton = async () => {
    const data = await sendRecommendation(thanksDetails);
    setShowThanksModal(false);
    setThanksDetails({review: '', rate: 0, GivingHelpOwnerPostId: 0});
  };

  const setRecomondationText = (text: string) => {
    setThanksDetails({...thanksDetails, review: text});
  };

  const closeRequest = (cb: () => Promise<void>, item: any) => {
    openModal('AreYouSureCloseRequestModal', {
      item,
      onBack: async () => {
        closeAllModals();
        await cb();
      },
      onNext: () => {
        closeModal('AreYouSureCloseRequestModal');
      },
    });
  };
  const openContactModal = (item: any) => {
    selectedItem.current = item;
    openModal('ContactModal', {item});
  };
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={{backgroundColor: '#ebf3fb', flex: 1}}>
      {showThanksModal && (
        <AlertModel
          text={hebrew.feedBack_forThankYou}
          setShow={() => {
            setShowThanksModal(false);
            setThanksDetails({review: '', rate: 0, GivingHelpOwnerPostId: 0});
          }}>
          <View style={{padding: 10}}>
            <Input
              placeHolder={hebrew.write_feedback}
              multiline={true}
              numberOfLines={5}
              editable={true}
              text={thanksDetails.review}
              textChanged={setRecomondationText}
            />
            <StarsRate setRatingNumber={setRate} />
            <PrimaryButton
              title={hebrew.send}
              onPress={sendRecomendtionButton}
            />
          </View>
        </AlertModel>
      )}
      <ActionBar
        myPostLocations={postA}
        onPressMapFunc={onPressMap}
        setfilteredPosts={setFilteredPosts}
      />
      {loading ? (
        <View style={styles.spinner}>
          <LoadingSpinner color={'blue'} setHeight={100} />
        </View>
      ) : (
        <View style={styles.postsContainer}>
          <FlatList
            ListEmptyComponent={
              <EmptyRequstsUser
                title={hebrew.no_application_approved}
                bodyText={hebrew.no_application_approved_body}
              />
            }
            data={filteredPosts}
            bounces={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  await PullingApplicationsPanding();
                  setRefreshing(false);
                }}
              />
            }
            renderItem={({item}) => (
              <View style={styles.postContainer}>
                <Post
                  categoryText={
                    EnumProfessionsGlobal &&
                    EnumProfessionsGlobal[item.categoryId - 1]?.he
                  }
                  text={item}>
                  {item.statusTypeId === 3 ? (
                    <View style={styles.action}>
                      <RoundButtonWithoutBackgroundColor
                        callback={() =>
                          closeRequest(() => changingStatus(4, item), item)
                        }
                        text={hebrew.close_request}
                      />
                      <View style={styles.offerHelp}>
                        <SmallRoundButtonWithBackground
                          callback={() => openContactModal(item)}
                          text={hebrew.make_contect}
                        />
                      </View>
                    </View>
                  ) : item.statusTypeId === 1 ? (
                    <View style={styles.action}>
                      <Text
                        onPress={() =>
                          navigation.navigate('NewPost', {post: item})
                        }
                        style={styles.share}>
                        {hebrew.edit}
                      </Text>
                      <Text
                        onPress={() => changingStatus(5, item)}
                        style={styles.delete}>
                        {hebrew.deleting}
                      </Text>
                    </View>
                  ) : item.statusTypeId === 2 ? (
                    <View style={styles.action}>
                      <RoundButtonWithoutBackgroundColor
                        callback={() => changingStatus(1, item)}
                        text={hebrew.not_this_time}
                      />
                      <View style={styles.offerHelp}>
                        <SmallRoundButtonWithBackground
                          text={hebrew.confirm}
                          callback={() => changingStatus(3, item)}
                        />
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                </Post>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default MyRequests;

const styles = StyleSheet.create({
  delete: {
    textDecorationLine: 'underline',
    color: 'black',
  },
  postsContainer: {
    backgroundColor: colors.gray500,
    marginBottom: 50,
    zIndex: 1,
  },
  postContainer: {
    marginTop: 10,
  },
  action: {
    marginTop: 12,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerHelp: {
    //width: 160,
  },
  share: {
    textDecorationLine: 'underline',
    color: 'black',
  },
  options: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 2,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
