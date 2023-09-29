import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootStackParamList} from '../Interfaces';
import React, {useEffect} from 'react';
import {hebrew} from '../Hebrew';
import AvailablePostsPro from '../../screens/givingHelp/AvailablePostsPro';
import PostBelongsToPro from '../../screens/givingHelp/PostBelongsToPro';
import {useLoginContext} from '../context/Context';
import NavBar from './NavBar';
import MyRequests from '../../screens/gettingHelp/MyRequests';
// import AllRequestsExceptMine from '../../screens/gettingHelp/AllRequestsExceptMine';
import PrimaryButton from './PrimaryButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Alert,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import AllRequestsExceptMine from '../../screens/gettingHelp/AllRequestsExceptMine';

const Tab = createMaterialTopTabNavigator();
const componentsSide = [
  {name: 'AvailablePostsPro', component: AvailablePostsPro},
  {name: 'PostBelongsToPro', component: PostBelongsToPro},
];

export const TabNavigatorGivingHelp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {user, getUserGeoLocation} = useLoginContext();

  const goToManualLocation = () => {
    navigation.navigate('ManualLocation');
  };

  useEffect(() => {
    if (user.long === -1 && user.lat === -1)
      getUserGeoLocation(goToManualLocation);
  }, []);

  return (
    <>
      <NavBar title={hebrew.main} />
      <Tab.Navigator>
        <Tab.Screen
          name={`${componentsSide[1].name}`}
          component={componentsSide[1].component}
          options={{
            tabBarLabel: hebrew.missions_under_my_hand,
            tabBarLabelStyle: styles.text,
          }}
        />
        <Tab.Screen
          name={`${componentsSide[0].name}`}
          component={componentsSide[0].component}
          options={{
            tabBarLabel: hebrew.help_to_others,
            tabBarLabelStyle: styles.text,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const componentsSidegetting = [
  {name: 'AllRequestsExceptMine', component: AllRequestsExceptMine},
  {name: 'MyRequests', component: MyRequests},
];
export const TabNavigatorGettingHelp = () => {
  const {user, getUserGeoLocation} = useLoginContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToManualLocation = () => {
    navigation.navigate('ManualLocation');
  };

  useEffect(() => {
    if (user.long === -1 && user.lat === -1) {
      getUserGeoLocation(goToManualLocation);
    }
  }, []);

  return (
    <>
      <NavBar style={{margin: 0}} title={hebrew.main} />
      <Tab.Navigator>
        <Tab.Screen
          name={`${componentsSidegetting[1].component}`}
          component={componentsSidegetting[1].component}
          options={{
            tabBarLabel: hebrew.my_requsts,
            tabBarLabelStyle: styles.text,
          }}
        />
        <Tab.Screen
          name={`${componentsSidegetting[0].component}`}
          component={componentsSidegetting[0].component}
          options={{
            tabBarLabel: hebrew.all_requests,
            tabBarLabelStyle: styles.text,
          }}
        />
      </Tab.Navigator>
      <View style={{padding: 20, backgroundColor: '#ebf3fb'}}>
        <PrimaryButton
          title={hebrew.adding_new_requst}
          onPress={() => navigation.navigate('NewPost')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 10,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  },
});
