import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {autocompletePlaces, GetGeoLocation_byPlaceId} from '../component/api';
import {useLoginContext} from '../component/context/Context';
import {hebrew} from '../component/Hebrew';
import {autoCpmpleteGooGle, RootStackParamList} from '../component/Interfaces';
import Input from '../component/ui/Input';
import fonts from '../styles/fonts';
import GoTo from '../assets/images/GoTo';
import LocationIcon from '../assets/images/LocationIcon';
import CloseIcons from '../assets/images/CloseIcons';
import GlassIcon from '../assets/images/GlassIcon';

const ManualLocation = ({style}: any) => {
  const [textInputLocation, setTextInputLocation] = useState<string>('');
  const [selectedLocation, setSelectedLocation] =
    useState<autoCpmpleteGooGle>();
  const [addressPulled, setAddressPulled] = useState<autoCpmpleteGooGle[]>([]);
  const {user, setUser, getUserGeoLocation} = useLoginContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  console;
  useEffect(() => {
    completeAddress();
  }, [textInputLocation]);

  const completeAddress = async () => {
    const addresses: autoCpmpleteGooGle[] = await autocompletePlaces(
      textInputLocation,
    );
    setAddressPulled(addresses);
  };
  const selectCurrent = () => {
    setTextInputLocation(hebrew.currentLocation);
    setSelectedLocation({
      description: hebrew.currentLocation,
      place_id: '-1',
      reference: '-1',
      structured_formatting: null,
    });
  };
  const choosesCurrent = () => {
    getUserGeoLocation(() => console.log('error'));
    navigation.popToTop();
  };
  const onSelect = (address: autoCpmpleteGooGle) => {
    setSelectedLocation(address);
    setTextInputLocation(address.description);
  };
  const choosedAddress = async (address: autoCpmpleteGooGle) => {
    onSelect(address);
    const geoLocation = await GetGeoLocation_byPlaceId(address.place_id);
    const geoLocationObject: {lat: number; lng: number} =
      geoLocation?.data.result.geometry.location;
    setUser({...user, lat: geoLocationObject.lat, long: geoLocationObject.lng});
    navigation.popToTop();
  };
  const clearSelection = () => {
    setTextInputLocation('');
    setSelectedLocation(undefined);
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{flexGrow: 1}}
        contentContainerStyle={styles.container}>
        <View style={styles.head}>
          <Image
            source={require('../assets/images/ManualLocation.png')}
            style={{height: 150, width: 200}}
          />
          <Text style={styles.title}>{hebrew.defineLocation}</Text>
          <Text style={styles.subTitle}>{hebrew.enterLocation}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.inputContainer}>
            <Input
              placeHolder={hebrew.entering_address}
              text={textInputLocation}
              textChanged={setTextInputLocation}
              extraStyles={styles.input}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                textInputLocation !== '' ? clearSelection() : {};
              }}>
              {textInputLocation !== '' ? <CloseIcons /> : <GlassIcon />}
            </TouchableOpacity>
          </View>
          {addressPulled.length !== 0 && (
            <ScrollView
              keyboardShouldPersistTaps="always"
              style={styles.dropdown}
              contentContainerStyle={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => selectCurrent()}
                style={styles.row}>
                <GoTo />
                <View style={styles.itemAddress}>
                  <Text numberOfLines={2} style={styles.bodyText}>
                    {hebrew.currentLocation}
                  </Text>
                  <LocationIcon />
                </View>
              </TouchableOpacity>
              {addressPulled.map((address, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onSelect(address)}
                    style={styles.row}>
                    <GoTo />
                    <View style={styles.itemAddress}>
                      <Text numberOfLines={2} style={styles.bodyText}>
                        {address.description}
                      </Text>
                      <LocationIcon />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={!selectedLocation}
            style={styles.button}
            onPress={() => {
              selectedLocation?.description === hebrew.currentLocation
                ? choosesCurrent()
                : choosedAddress(selectedLocation!);
            }}>
            <Text style={styles.buttonText}>{hebrew.approve}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ManualLocation;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  body: {
    flex: 2,
    width: '100%',

    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.8,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fed433',
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontFamily: fonts.regular,
    fontSize: 18,
    textAlign: 'center',
  },
  input: {width: '90%', elevation: 5},
  title: {
    fontFamily: fonts.regular,
    fontWeight: '700',
    fontSize: 32,
    color: 'black',
    paddingBottom: 20,
  },
  subTitle: {
    color: 'black',
    fontFamily: fonts.regular,
    fontSize: 16,
    textAlign: 'center',
  },
  bodyText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'right',
    padding: 8,
    width: '90%',
    lineHeight: 22,
    fontFamily: fonts.regular,
    marginVertical: 5,
    flexWrap: 'wrap',
  },
  row: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    minHeight: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#D7D7D7',
  },
  itemAddress: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdown: {
    backgroundColor: 'white',
    elevation: 3,
    zIndex: -1,
    width: '90%',
    paddingTop: 15,
    maxHeight: 250,
    marginTop: '-5%',
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderTopRightRadius: 0,
  },
  iconContainer: {
    position: 'absolute',
    top: '32%',
    left: '10%',
    backgroundColor: 'white',
  },
});
