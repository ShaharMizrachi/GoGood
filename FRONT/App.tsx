import 'react-native-gesture-handler';
import * as React from 'react';
import {PermissionsAndroid, StatusBar} from 'react-native';
import MainStackNavigator from './component/MainStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {LoginContextProvider} from './component/context/Context';
import {LogBox} from 'react-native';
import {ModalProvider} from 'react-native-modalfy';
import {ModalStack} from './component/Modals/ModalsConfig';
import { askNotificationPermissions } from './Helpers/Permissions';

LogBox.ignoreLogs(['new NativeEventEmitter', 'Warning: ...', 'Possible']);
const App = () => {
  React.useEffect(() => {
    askNotificationPermissions()
  }, []);

  return (
    <>
      <LoginContextProvider>
        <StatusBar backgroundColor={'black'} />
        <NavigationContainer>
          <ModalProvider stack={ModalStack}>
            <MainStackNavigator />
          </ModalProvider>
        </NavigationContainer>
      </LoginContextProvider>
    </>
  );
};

export default App;
