import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  GetPosts_OwnerBy_GivingHelp,
  detachedPostToProfessional,
  changingStatusOfPost,
} from '../../component/api';
import {
  GetAvailablePostByprofessionalInter,
  RootStackParamList,
} from '../../component/Interfaces';
import Post from '../../component/ui/Post';
import ActionBar from '../../component/ui/ActionBar';
import {
  EventArg,
  StackNavigationState,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {hebrew} from '../../component/Hebrew';
import {useLoginContext} from '../../component/context/Context';
import LoadingSpinner from '../../component/ui/LoadingSpinner';
import colors from '../../styles/colors';
import EmptyRequstsUser from '../../component/ui/EmptyRequstsUser';
import fonts from '../../styles/fonts';
import {useModal} from 'react-native-modalfy';

const PostBelongsToPro = () => {
  const [postA, setPostA] = useState<GetAvailablePostByprofessionalInter[]>([]);
  const selectedItem = useRef<GetAvailablePostByprofessionalInter>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user, EnumProfessionsGlobal} = useLoginContext();
  const [filteredPosts, setFilteredPosts] = useState<
    GetAvailablePostByprofessionalInter[]
  >([]);
  const [loading, setLoading] = useState(false);
  const {openModal, currentModal, closeModal, closeAllModals} = useModal();

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
        getPostUnderPro();
      }
    };
    navigation.addListener('state', listner);

    return () => navigation.removeListener('state', listner);
  }, []);

  const getPostUnderPro = async () => {
    setLoading(true);
    // sending id of proffesional
    const data = await GetPosts_OwnerBy_GivingHelp(user.id, user.token);
    const data1 = (data?.data).filter((t: any) => t.statusTypeId !== 4);
    setPostA(data1);
    setFilteredPosts(data1);
    setLoading(false);
  };

  const onPressMap = () => {
    navigation.navigate('MapPrimary', {posts: postA});
  };

  const detachedPost = async (post: GetAvailablePostByprofessionalInter) => {
    if (post.id != undefined) {
      const data = await detachedPostToProfessional(post.id);
    }

    const data2 = await changingStatusOfPost(post, 1, user.id);
    await getPostUnderPro();
  };
  const openContactModal = (item: GetAvailablePostByprofessionalInter) => {
    selectedItem.current = item;
    openModal('ContactModal', {item});
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

  const changingStatus = async (changingtoStatus: number, post: any) => {
    const postToChange = {...post, id: post.id};
    const data2 = await changingStatusOfPost(
      postToChange,
      changingtoStatus,
      user.id,
    );
    getPostUnderPro();
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <View style={{backgroundColor: '#ebf3fb',flex:1}}>

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
            data={filteredPosts}
            ListEmptyComponent={
              <EmptyRequstsUser
                title={hebrew.no_request_UnderMyHand}
                bodyText={hebrew.no_request_UnderMyHand_body}
              />
            }
            renderItem={({item}) => {
              return (
                <>
                  <View style={styles.postContainer}>
                    <Post
                      categoryText={
                        EnumProfessionsGlobal &&
                        EnumProfessionsGlobal[item.categoryId - 1]?.he
                      }
                      text={item}>
                      {item.statusTypeId < 4 ? (
                        <View style={styles.action}>
                          {item.statusTypeId === 2 && (
                            <TouchableOpacity
                              style={styles.cancelButton}
                              onPress={() => detachedPost(item)}>
                              <Text style={styles.cancelText}>
                                {hebrew.cancel_Your_Offer}
                              </Text>
                            </TouchableOpacity>
                          )}
                          {item.statusTypeId === 3 && (
                            <>
                              <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() =>
                                  closeRequest(
                                    () => changingStatus(4, item),
                                    item,
                                  )
                                }>
                                <Text style={styles.cancelText}>
                                  {hebrew.close_request}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={styles.contactButton}
                                onPress={() => openContactModal(item)}>
                                <Text style={styles.cancelText}>
                                  {hebrew.contact}
                                </Text>
                              </TouchableOpacity>
                            </>
                          )}

                          {/* <View style={styles.offerHelp}>
                            <Text style={{color: 'black'}}>
                              {item.statusTypeId === 2
                                ? hebrew.waiting_to_gettingHelpPerson
                                : hebrew.active}
                            </Text>
                          </View> */}
                        </View>
                      ) : (
                        <View style={styles.action}>
                          {/* <Text onPress={() => detachedPost(item.item)} style={styles.share}>{hebrew.cancel_post}</Text> */}
                          <View style={styles.offerHelp}>
                            <Text style={{color: 'black'}}>
                              {hebrew.read_feedback}
                            </Text>
                          </View>
                          <View style={styles.offerHelp}>
                            <Text style={{color: 'black'}}>
                              {hebrew.problem_solved}
                            </Text>
                          </View>
                        </View>
                      )}
                    </Post>
                  </View>
                </>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            bounces={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  await getPostUnderPro();
                  setRefreshing(false);
                }}
              />
            }
          />
        </View>
      )}
    </View>
  );
};

export default PostBelongsToPro;

const styles = StyleSheet.create({
  postsContainer: {
    backgroundColor: colors.gray500,
    marginBottom: 60,
  },
  postContainer: {
    marginTop: 10,
  },
  cancelButton: {
    alignItems: 'center',
    height: 40,
    width: 150,
    backgroundColor: 'white',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#FED433',
    borderRadius: 20,
  },
  contactButton: {
    alignItems: 'center',
    height: 40,
    width: 100,
    backgroundColor: '#FED433',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  action: {
    marginTop: 12,
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  offerHelp: {
    width: 160,
  },
  share: {
    textDecorationLine: 'underline',
    color: 'black',
  },
  cancelText: {fontFamily: fonts.regular, fontSize: 14, color: 'black'},
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
});
