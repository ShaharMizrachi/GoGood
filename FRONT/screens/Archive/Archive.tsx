import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ArchiveProps} from './ArchiveProps';
import styles from './ArchiveStyles';
import NavBar from '../../component/ui/NavBar';
import {hebrew} from '../../component/Hebrew';
import {useLoginContext} from '../../component/context/Context';
import {
  getAllPostsOfGetHelpClosed,
  getAllPostsOfGivingHelpClosed,
} from '../../component/api';
import EmptyRequstsUser from '../../component/ui/EmptyRequstsUser';
import Post from '../../component/ui/Post';

const Archive = ({navigation}: ArchiveProps) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const [postlist, setPostList] = useState<any[]>();

  const {user, setUser, EnumProfessionsGlobal} = useLoginContext();

  useEffect(() => {
    GetAllPost();
  }, []);

  const GetAllPost = async () => {
    let data;
    if (user.type === 'GettingHelp')
      data = await getAllPostsOfGetHelpClosed(user.id);
    else data = await getAllPostsOfGivingHelpClosed(user.id);
    setPostList(data);
  };

  return (
    <>
      <NavBar title={hebrew.archive} navigateBack={navigateBack} />
      {postlist === undefined ? (
        <View style={styles.container}>
          <EmptyRequstsUser
            title={hebrew.no_application_in_archive}
            bodyText={hebrew.you_can_try_tommarrow}
          />
        </View>
      ) : (
        <View style={styles.postContainer}>
          <FlatList
            data={postlist}
            renderItem={({item}) => (
              <View style={styles.postContainer}>
                <Post
                  categoryText={
                    EnumProfessionsGlobal &&
                    EnumProfessionsGlobal[item.categoryId - 1]?.he
                  }
                  text={item}>
                  <>
                    <Text
                      onPress={() =>
                        console.log('should nevigate to profilePage Details')
                      }
                      style={styles.add_recommendation}>
                      {hebrew.add_recommendation}
                    </Text>
                  </>
                </Post>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </>
  );
};
export default Archive;
