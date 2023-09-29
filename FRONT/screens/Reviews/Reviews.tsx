import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ReviewsProps} from './ReviewsProps';
import styles from './ReviewsStyles';
import NavBar from '../../component/ui/NavBar';
import {hebrew} from '../../component/Hebrew';
import {getAllWhoGotItRecommendationsByUserId} from '../../component/api';
import {GotItRecommendation} from '../../component/Interfaces';
import ReviewBox from '../../component/ui/ReviewBox';
import EmptyRequstsUser from '../../component/ui/EmptyRequstsUser';

const Reviews = ({navigation, route}: ReviewsProps) => {
  const [userGaveRec, setUserGaveRec] = useState<GotItRecommendation[]>();
  const navigateBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    getAllWhoGotItRecommendations();
  }, []);
  const id = route.params.id;
  console.log(id)
  const getAllWhoGotItRecommendations = async () => {
    console.log(id)
    const alluserssgaveToMe = await getAllWhoGotItRecommendationsByUserId(id);
    console.log(alluserssgaveToMe)
    setUserGaveRec(alluserssgaveToMe);
  };
  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      <NavBar title={hebrew.reviews} navigateBack={navigateBack} />
      <View style={styles.headline}>
        <Text style={[styles.title]}>{hebrew.reviews}</Text>
      </View>
      <View style={styles.container}>
        <View>
          {userGaveRec && (
            <FlatList
              data={userGaveRec}
              ListEmptyComponent={
                <EmptyRequstsUser
                  title={hebrew.no_reviews}
                  bodyText={hebrew.no_reviews_body}
                />
              }
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={async () => {
                    setRefreshing(true);
                    await getAllWhoGotItRecommendations();
                    setRefreshing(false);
                  }}
                />
              }
              renderItem={({item}) => (
                <View>
                  <ReviewBox userReview={item} starsModifingDisable={true} />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    </>
  );
};
export default Reviews;
