import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-svg';
import MonsterThinking from '../assets/images/MonsterThinking';
import {hebrew} from '../component/Hebrew';
import {PostModal} from '../component/ui/PostModal';
import PrimaryButton from '../component/ui/PrimaryButton';
import SeconderyButton from '../component/ui/SeconderyButton';
import RoundButtonWithoutBackgroundColor from '../component/ui/RoundButtonWithoutBackgroundColor';
import SmallRoundButtonWithBackground from '../component/ui/SmallRoundButtonWithBackground';
import {useModal} from 'react-native-modalfy';

const AreYouSureCloseRequestModal = ({modal: {params}}: any) => {
  const functionWrapper = (cb: any) => {
    cb?.();
  };

  const {openModal, currentModal, closeModal} = useModal();

  const buttonsStyle = {
    width: 145,
    height: 57,
    borderRadius: 27.5,
  };

  const closeRequest = (cb: () => Promise<void>) => {
    cb();
    closeModal('AreYouSureCloseRequestModal');
    openModal('RequestClosedSuccessfullyModal', {item: params.item});
  };

  return (
    <PostModal
      title={hebrew.are_you_sure}
      subTitle={hebrew.are_you_sure_close_request}
      Icon={MonsterThinking}>
      <View style={styles.modalButtons}>
        <SmallRoundButtonWithBackground
          callback={async () => {
            closeRequest(async () => params?.onBack());
            // functionWrapper(params?.onBack);
          }}
          text={hebrew.close_request}
          style={buttonsStyle}
        />
        <RoundButtonWithoutBackgroundColor
          callback={() => functionWrapper(params?.onNext)}
          text={hebrew.leave_open}
          style={buttonsStyle}
        />
      </View>
    </PostModal>
  );
};

export default AreYouSureCloseRequestModal;

const styles = StyleSheet.create({
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
