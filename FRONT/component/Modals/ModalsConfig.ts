import {Animated, Dimensions} from 'react-native';
import {
  createModalStack,
  ModalOptions,
  ModalStackConfig,
} from 'react-native-modalfy';
import DeleteModal from '../ui/DeleteModal';
import AreYouSureCloseRequestModal from '../../screens/AreYouSureCloseRequestModal';
import RequestClosedSuccessfullyModal from '../../screens/RequestClosedSuccessfullyModal';
import PublishRequestSuccessModal from '../../screens/PublishRequestSuccessModal';
import VolunteerAcceptedModal from '../ui/VolunteerAcceptedModal/VolunteerAcceptedModal';
import VolunteerConfirmModal from '../ui/VolunteerConfirmModal/VolunteerConfirmModal';
import VolunteerCancelInProgressModal from '../ui/VolunteerCancelInProgressModal/VolunteerCancelInProgressModal';
import {ConfirmDeleteAccount} from '../ui/ConfirmDeleteAccount/ConfirmDeleteAccount';
import {GettingHelpCancelInProgress} from '../ui/GettingHelpCancelInProgress/GettingHelpCancelInProgress';
import {GettingHelpAcceptModal} from '../ui/GettingHelpAcceptModal/GettingHelpAcceptModal';
import {ContactModal} from '../ui/ContactModal/ContactModal';
import SeeYouNextTime from '../../screens/SeeYouNextTime';
import {TermsModal} from '../ui/TermsModal';
import {ContactUsModal} from '../ContactUsModal';
import AreYouSureExit from '../../screens/AreYouSureExit';
const {height} = Dimensions.get('screen');
const modalConfig: ModalStackConfig = {
  DeleteModal,
  ContactUsModal,
  VolunteerConfirmModal,
  AreYouSureCloseRequestModal,
  RequestClosedSuccessfullyModal,
  VolunteerCancelInProgressModal,
  PublishRequestSuccessModal,
  VolunteerAcceptedModal,
  ConfirmDeleteAccount,
  TermsModal,
  SeeYouNextTime,
  GettingHelpCancelInProgress,
  GettingHelpAcceptModal,
  ContactModal,
  AreYouSureExit,
};

const animate = (animatedValue: Animated.Value, toValue: number) => {
  Animated.spring(animatedValue, {
    toValue,
    damping: 10,
    mass: 0.35,
    stiffness: 100,
    overshootClamping: true,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    useNativeDriver: true,
  }).start();
};
const defaultOptions: ModalOptions = {
  backdropOpacity: 0.7,
  animationIn: animate,
  transitionOptions: animatedValue => ({
    opacity: animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0.9],
    }),
    transform: [
      {perspective: 2000},
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
        }),
      },
    ],
  }),
};
export const ModalStack = createModalStack(modalConfig, defaultOptions);
