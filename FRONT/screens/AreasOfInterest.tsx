import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import SeconderyButton from '../component/ui/SeconderyButton';
import PrimaryScreen from '../component/ui/PrimaryScreen';
import {hebrew} from '../component/Hebrew';
import PrimaryButton from '../component/ui/PrimaryButton';
import {
  IEnumProfessions,
  RootStackParamList,
  categoryInter,
} from '../component/Interfaces';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useLoginContext} from '../component/context/Context';

/* Description:
  in case the user who giving help choose the area of intereting to choode from,
  we cancel this option and skip this component for now.
*/

const AreasOfInterest = () => {
  const {user, setUser, EnumProfessionsGlobal} = useLoginContext();
  const [enumProfessionsData, setEnumProfessionsData] = useState<
    IEnumProfessions[]
  >([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    gettingEnumPro();
  }, []);

  const gettingEnumPro = () => {
    const data = EnumProfessionsGlobal;
    if (data != undefined) {
      setEnumProfessionsData(
        data.map((categoryItem: categoryInter) => {
          return {...categoryItem, choosed: false};
        }),
      );
    }
  };

  const findProChoosed = (item: categoryInter) => {
    const enumProfessionsDataNewArray: categoryInter[] =
      enumProfessionsData.map((category, index) => {
        if (category.id === item.id) item.choosed = !item.choosed;
        return category;
      });
    setEnumProfessionsData(enumProfessionsDataNewArray);
  };

  const finishProcess = async () => {
    setUser({
      ...user,
      categoryArray: enumProfessionsData
        .filter((item: categoryInter) => item.choosed === true)
        .map((item: categoryInter) => item.id),
    });
    navigation.navigate('SelfiPicAsk');
  };

  return (
    <PrimaryScreen
      title={hebrew.whatIsYourIntrest}
      bodyText={hebrew.choosingIntrest}
      pic={0}>
      <View>
        <View style={styles.buttonProContainer}>
          {enumProfessionsData !== undefined && (
            <FlatList
              horizontal={false}
              numColumns={3}
              columnWrapperStyle={styles.row}
              data={enumProfessionsData}
              renderItem={item => (
                <View style={styles.buttonPro}>
                  <SeconderyButton
                    onPress={() => findProChoosed(item.item)}
                    title={item.item?.he}
                  />
                </View>
              )}
            />
          )}
        </View>
        <View style={styles.primaryButton}>
          <PrimaryButton
            title={hebrew.takeMeHomePage}
            onPress={finishProcess}
          />
        </View>
      </View>
    </PrimaryScreen>
  );
};

export default AreasOfInterest;

const styles = StyleSheet.create({
  buttonProContainer: {
    height: 280,
    marginTop: 10,
  },
  buttonPro: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: 97,
  },
  primaryButton: {
    marginTop: 70,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
