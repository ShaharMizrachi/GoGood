import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useLoginContext} from '../context/Context';
import {hebrew} from '../Hebrew';
import {RootStackParamList} from '../Interfaces';
import NavBar from './NavBar';

const MapPrimary = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MapPrimary'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user, activeCurrentType} = useLoginContext();

  const navigationOnPostPress = (post: any) => {
    if (activeCurrentType === 'GivingHelp') {
      Alert.alert(
        hebrew.move_to_post,
        hebrew.do_you_want_navigationPoat,
        [
          {
            text: hebrew.yes,
            onPress: () => navigation.navigate('PostDetailes', {post}),
          },
          {text: hebrew.no, style: 'default'},
        ],
        {cancelable: false},
      );
    }
  };

  const navigatebackhandler = () => {
    if (activeCurrentType === 'GivingHelp') {
      navigation.push('TabNavigatorGivingHelp');
    } else {
      navigation.push('TabNavigatorGettingHelp');
    }
  };

  return (
    <>
      <NavBar title={hebrew.map} navigateBack={navigatebackhandler} />
      <View style={styles.MainContainer}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={false}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: user.lat,
            longitude: user.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0921,
          }}>
          {route.params.posts.map((item, index) => (
            <Marker
              key={index}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              title={item.problemTitle}
              description={item.problemDescription}
              onPress={() => navigationOnPostPress(item)}
              image={require('../../assets/images/monster_hi.png')}
            />
          ))}

          <Marker
            coordinate={{latitude: user.lat, longitude: user.long}}
            title={user.fullName}
            description={user.type}
          />
        </MapView>
      </View>
    </>
  );
};

export default MapPrimary;

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: -8,
    left: 0,
    right: 0,
    bottom: 0,
    minWidth: 100,
    minHeight: 100,
  },
  // mapStyle: {
  //   width: Dimensions.get('window').width,
  //   height: 670,
  // },
});
