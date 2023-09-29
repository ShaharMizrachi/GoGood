import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Image, StyleSheet} from 'react-native';
import {
  amountOfrequestBelongToPro,
  // getAvgRateByGivingHelpId,
  gettingHelpIdAmountOfrequestNumber,
  GettingHelpIdAmountOfRequset,
  givingHelpIdAmountOfrequestNumber,
} from '../component/api';
import {useLoginContext} from '../component/context/Context';
import {hebrew} from '../component/Hebrew';
import {RootStackParamList} from '../component/Interfaces';
import NavBar from '../component/ui/NavBar';
import StatisticsPie from '../component/ui/StatisticsPie';
import fonts from '../styles/fonts';

/* Description:
 component not in use any!!!!, this component show  two pies,
1.one is the  present of each profeesional the user use (give or get depanse in user)
2. the rate of the user
*/

const StatisticsUser = () => {
  const {user, activeCurrentType, EnumProfessionsGlobal} = useLoginContext();
  const [amountToCategory, setAmountToCategory] = useState<
    {amount: number; name: string}[]
  >([]);
  const [requestRepresentd, setRequestRepresentd] = useState<
    {amount: number; name: string}[]
  >([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [givingHelpAvgRate, setGivingHelpAvgRate] = useState<number>(0);

  useEffect(() => {
    pullingData();
  }, []);

  const pullingData = async () => {
    let requestAmountByCategory, AmountOfrequestNumber;
    if (activeCurrentType === 'GivingHelp') {
      // const avgRateGivingHelp = await getAvgRateByGivingHelpId(user.id); // single rate numver of givingHelp
      requestAmountByCategory = await amountOfrequestBelongToPro(user.id); // the amount of request belong to pro be category amount
      AmountOfrequestNumber = await givingHelpIdAmountOfrequestNumber(user.id); // the anount of request belong to pro  vs general in pure number
      // setGivingHelpAvgRate(avgRateGivingHelp);
    } else {
      requestAmountByCategory = await GettingHelpIdAmountOfRequset(user.id); // the amount of request belong to gettingHelp be category amount
      AmountOfrequestNumber = await gettingHelpIdAmountOfrequestNumber(user.id); // the anount of request belong to pro  vs general in pure number
    }
    const amountToCategoryTmp = requestAmountByCategory.map(
      (item: {amount: number; category: number}) => {
        return {
          amount: item.amount,
          name: EnumProfessionsGlobal[item.category - 1].he,
        };
      },
    );
    const amountOfrequestNumber = [
      {
        amount: AmountOfrequestNumber[0],
        name:
          activeCurrentType === 'GettingHelp'
            ? hebrew.my_requests
            : hebrew.request_underMYHand,
      },
      {
        amount: AmountOfrequestNumber[1],
        name:
          activeCurrentType === 'GettingHelp'
            ? hebrew.requets_everyone
            : hebrew.requets_everyone_underhand,
      },
    ];
    setRequestRepresentd([...amountOfrequestNumber]);
    setAmountToCategory([...amountToCategoryTmp]);
  };
  const navigationNavBar = () => {
    activeCurrentType === 'GettingHelp'
      ? navigation.navigate('TabNavigatorGettingHelp')
      : navigation.navigate('TabNavigatorGivingHelp');
  };

  return (
    <>
      <NavBar navigateBack={navigationNavBar} title={hebrew.statistics} />
      <ScrollView style={{flex: 1}}>
        {amountToCategory && amountToCategory.length > 0 && (
          <StatisticsPie
            doughnut={true}
            series={amountToCategory}
            title={hebrew.post_ByCategory}
          />
        )}
        <StatisticsPie
          doughnut={false}
          series={requestRepresentd}
          title={hebrew.MyPost_Vs_EveryOne}
        />
        {givingHelpAvgRate > 0 && (
          <View style={styles.rateContainer}>
            <Text style={styles.rateHeader}>{hebrew.rate}</Text>
            <View style={styles.rateBodyContainer}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../assets/images/trophy.png')}
              />
              <Text style={styles.rateText}>{`${givingHelpAvgRate?.toFixed(
                2,
              )}/5`}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default StatisticsUser;

const styles = StyleSheet.create({
  rateContainer: {
    marginTop: 30,
  },
  rateBodyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 10,
  },
  rateText: {
    color: 'black',
    fontSize: 50,
    fontFamily: fonts.regular,
  },
  rateHeader: {
    fontSize: 24,
    color: 'black',
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});
