import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  changingStatusOfPost,
  connectProffesionalToPost,
  AvailablePost_ToGivingHelp,
} from '../../component/api';
import {
  GetAvailablePostByprofessionalInter,
  RootStackParamList,
} from '../../component/Interfaces';
import Post from '../../component/ui/Post';
import ActionBar from '../../component/ui/ActionBar';
import {useLoginContext} from '../../component/context/Context';
import {
  EventArg,
  useNavigation,
  StackNavigationState,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {hebrew} from '../../component/Hebrew';
import SeconderyButton from '../../component/ui/SeconderyButton';
import LoadingSpinner from '../../component/ui/LoadingSpinner';
import colors from '../../styles/colors';
import EmptyRequstsUser from '../../component/ui/EmptyRequstsUser';

const AvailablePostsPro = () => {
  const [postA, setPostA] = useState<GetAvailablePostByprofessionalInter[]>([]);
  const {user, EnumProfessionsGlobal} = useLoginContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [filteredPosts, setFilteredPosts] = useState<
    GetAvailablePostByprofessionalInter[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // event for rendering the tab nevigation when moving between tabs
    const listner = (
      e: EventArg<
        'state',
        any,
        {
          state: StackNavigationState<RootStackParamList>;
        }
      >,
    ) => {
      if (e.data.state.index === 1) {
        getAvailablePost();
      }
    };
    getAvailablePost();
    navigation.addListener('state', listner);

    return () => navigation.removeListener('state', listner);
  }, []);
  const getAvailablePost = async () => {
    setLoading(true);
    // sending id of proffesional\
    const data = await AvailablePost_ToGivingHelp(user.id, user.token);
    console.log(data)
    setPostA(data?.data);
    setFilteredPosts(data?.data);
    setLoading(false);
  };

  const onPressMap = () => {
    navigation.navigate('MapPrimary', {posts: postA});
  };

  const OffferHelpToPerson = async (
    post: GetAvailablePostByprofessionalInter,
  ) => {
    console.log(post);
    const data2 = await changingStatusOfPost(post, 2, user.id);
    if (post.id != undefined) {
      const data = await connectProffesionalToPost(post.id, user.id);
    }

    await getAvailablePost();
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
            ListEmptyComponent={
              <EmptyRequstsUser
                title={hebrew.no_application_approved}
                bodyText={hebrew.no_application_approved_body}
              />
            }
            data={filteredPosts}
            renderItem={item => (
              // <Pressable
              //   onPress={() =>
              //     navigation.push('PostDetailes', {post: item.item})
              //   }>
                <View style={styles.postContainer}>
                  <Post
                    categoryText={
                      EnumProfessionsGlobal &&
                      EnumProfessionsGlobal[item.item.categoryId - 1]?.he
                    }
                    text={item.item}>
                    <View style={styles.action}>
                      <Text style={styles.share}>{hebrew.share}</Text>
                      <View style={styles.offerHelp}>
                        <SeconderyButton
                          extraStyles={styles.offerButton}
                          title={hebrew.offerHelp}
                          onPress={() => OffferHelpToPerson(item.item)}
                        />
                      </View>
                    </View>
                  </Post>
                </View>
              // </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            bounces={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  await getAvailablePost();
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

export default AvailablePostsPro;

const styles = StyleSheet.create({
  postsContainer: {
    backgroundColor: colors.gray500,
    marginBottom: 50,
  },
  postContainer: {
    marginTop: 10,
  },
  action: {
    marginTop: 12,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerHelp: {
    width: 160,
  },
  offerButton: {
    backgroundColor: '#FED433',
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
});
