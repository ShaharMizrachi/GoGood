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
import CloseIcons from '../../assets/images/CloseIcons';
import GlassIcon from '../../assets/images/GlassIcon';
import GoTo from '../../assets/images/GoTo';
import LocationIcon from '../../assets/images/LocationIcon';
import fonts from '../../styles/fonts';
import {hebrew} from '../Hebrew';
import {autoCpmpleteGooGle, RootStackParamList} from '../Interfaces';
import {autocompletePlaces, GetGeoLocation_byPlaceId} from '../api';
import {useLoginContext} from '../context/Context';
import Input from '../ui/Input';

const ManualLocationInput = ({initialLocation, setInitialLocation}: any) => {
  const [textInputLocation, setTextInputLocation] = useState<string>('');
  const [dropDown, setDropDown] = useState<boolean>(false);

  const [addressPulled, setAddressPulled] = useState<autoCpmpleteGooGle[]>([]);
  const {user, setUser, getUserGeoLocation} = useLoginContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    completeAddress();
  }, [textInputLocation]);
  useEffect(() => {
    if (initialLocation.name) {
      choosedAddress({
        description: initialLocation.name,
        place_id: initialLocation.name,
      });
    }
  }, [initialLocation]);

  const completeAddress = async () => {
    const addresses: autoCpmpleteGooGle[] = await autocompletePlaces(
      textInputLocation,
    );
    setAddressPulled(addresses);
  };
  const selectCurrent = () => {
    getUserGeoLocation(() => console.log('error'));
    setTextInputLocation(hebrew.currentLocation);
    setDropDown(false);
  };

  const choosedAddress = async (address: Partial<autoCpmpleteGooGle>) => {
    setTextInputLocation(address.description!);
    const geoLocation = await GetGeoLocation_byPlaceId(address.place_id!);
    const geoLocationObject: {lat: number; lng: number} =
      geoLocation?.data.result.geometry.location;
    console.log({address});
    setInitialLocation((p: any) => {
      return {
        name: address.description,
        latitude: geoLocationObject.lat,
        longitude: geoLocationObject.lng,
      };
    });
    setDropDown(false);
  };
  const clearSelection = () => {
    setTextInputLocation('');
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <Input
            onFocus={() => setDropDown(true)}
            onBlur={() => setDropDown(false)}
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
        {addressPulled.length !== 0 && dropDown && (
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
                  onPress={() => choosedAddress(address)}
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
    </KeyboardAvoidingView>
  );
};

export default ManualLocationInput;

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
  input: {width: '100%', elevation: 5},
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
    width: '100%',
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
    left: '5%',
    backgroundColor: 'white',
  },
});
