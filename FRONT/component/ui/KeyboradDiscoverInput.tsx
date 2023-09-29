import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, ScrollView} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {useLoginContext} from '../context/Context';

const KeyboradDiscoverInput = ({children}: {children: JSX.Element}) => {
  const {setNavigationBarOpen} = useLoginContext();
  const [keyboardHeight, setKeyboardHeight] = useState(0); // holding the keyborad hight
  let scrollRef = useRef<ScrollView>(null); // link to jsx scroll element

  // calculating the hight of the keyboard
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      //SystemNavigationBar.navigationShow();
      setNavigationBarOpen(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      //SystemNavigationBar.navigationHide();
      setNavigationBarOpen(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setKeyboardHeight]);

  // once keyborad open/close just to other section in the screen.
  useEffect(() => {
    if (keyboardHeight !== 0)
      scrollRef.current?.scrollTo({x: 0, y: keyboardHeight, animated: true});
  }, [keyboardHeight]);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default KeyboradDiscoverInput;
