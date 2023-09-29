import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MonsterThinking from '../assets/images/MonsterThinking';
import {hebrew} from '../component/Hebrew';
import {PostModal} from '../component/ui/PostModal';
import RoundButtonWithoutBackgroundColor from '../component/ui/RoundButtonWithoutBackgroundColor';
import SmallRoundButtonWithBackground from '../component/ui/SmallRoundButtonWithBackground';
import Monster_yay from '../assets/images/Monster_yay';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../component/Interfaces';

const RequestClosedSuccessfullyModal = ({modal: {closeModal,closeAllModals, params}}: any) => {
  const functionWrapper = async () => {
    closeModal();
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const buttonsStyle = {
    width: 336,
    height: 57,
    borderRadius: 27.5,
  };

  const navigateToAddNewRec = () => {
    navigation.navigate('AddNewRecommendation', {item: params.item});
    closeAllModals();
  };

  return (
    <PostModal
      title={hebrew.request_closed_successfully}
      subTitle={hebrew.we_will_happy_to_hear_your_opinion}
      Icon={Monster_yay}>
      <View style={styles.modalButtons}>
        <SmallRoundButtonWithBackground
          callback={navigateToAddNewRec}
          text={hebrew.pulish_recommendation}
          style={buttonsStyle}
        />
      </View>
    </PostModal>
  );
};

export default RequestClosedSuccessfullyModal;

const styles = StyleSheet.create({
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
