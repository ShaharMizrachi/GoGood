import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Monster_yay from '../assets/images/Monster_yay';
import {hebrew} from '../component/Hebrew';
import {PostModal} from '../component/ui/PostModal';
import SmallRoundButtonWithBackground from '../component/ui/SmallRoundButtonWithBackground';
import fonts from '../styles/fonts';

const PublishRequestSuccessModal = ({modal: {closeModal, params}}: any) => {
  return (
    <PostModal
      title={hebrew.publish_successfully}
      subTitle={hebrew.thanks_sharing_your_recommendtion}
      Icon={Monster_yay}>
      <View>
        <Text
          onPress={() => closeModal('PublishRequestSuccessModal')}
          style={[styles.generalTextSetings, styles.closeLink]}>
          {hebrew.close}
        </Text>
      </View>
    </PostModal>
  );
};

export default PublishRequestSuccessModal;

const styles = StyleSheet.create({
  generalTextSetings: {
    fontFamily: fonts.regular,
    color: 'black',
    fontSize: 16,
  },
  closeLink: {
    textDecorationLine: 'underline',
  },
});
