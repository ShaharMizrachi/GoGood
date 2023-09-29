import {
  EventArg,
  StackNavigationState,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {getPostsExcludingUser} from '../../component/api';
import {useLoginContext} from '../../component/context/Context';
import {hebrew} from '../../component/Hebrew';
import {
  GettingHelp_requsts,
  PostSend,
  RootStackParamList,
} from '../../component/Interfaces';
import ActionBar from '../../component/ui/ActionBar';
import EmptyRequstsUser from '../../component/ui/EmptyRequstsUser';
import LoadingSpinner from '../../component/ui/LoadingSpinner';
import Post from '../../component/ui/Post';
import colors from '../../styles/colors';

const AllRequestsExceptMine = () => {
  const {user, EnumProfessionsGlobal} = useLoginContext();
  const [postA, setPostA] = useState<PostSend[]>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [filteredPosts, setFilteredPosts] = useState<GettingHelp_requsts[]>([]);
  const [loading, setLoading] = useState(false);

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
      if (e.data.state.index === 1) {
        PullingPostsExcludingUser();
      }
    };

    navigation.addListener('state', listner);

    return () => navigation.removeListener('state', listner);
  }, []);

  const PullingPostsExcludingUser = async () => {
    setLoading(true);
    const data = await getPostsExcludingUser(user.id, user.token);
    data != undefined && setPostA(data.data);
    setFilteredPosts(data?.data);
    setLoading(false);
  };

  const onPressMap = () => {
    postA != undefined && navigation.navigate('MapPrimary', {posts: postA});
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
            style={{height: '100%'}}
            ListEmptyComponent={
              <EmptyRequstsUser
                title={hebrew.no_application_approved}
                bodyText={hebrew.no_newRequsrt_givingHelp}
              />
            }
            renderItem={item => (
              <View style={styles.postContainer}>
                <Post
                  categoryText={
                    EnumProfessionsGlobal &&
                    EnumProfessionsGlobal[item.item.categoryId - 1]?.he
                  }
                  text={item.item}
                  dontShowProfileBox={false}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            bounces={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  await PullingPostsExcludingUser();
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

export default AllRequestsExceptMine;

const styles = StyleSheet.create({
  postsContainer: {
    backgroundColor: colors.gray500,
    marginBottom: 50,
    width: '100%',
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
