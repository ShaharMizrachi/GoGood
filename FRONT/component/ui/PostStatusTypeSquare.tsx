import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import fonts from '../../styles/fonts';
import {hebrew} from '../Hebrew';

const PostStatusTypeSquare = ({
  postStatusTypeNumber,
}: {
  postStatusTypeNumber: number;
}) => {
  const [postDetailsStatus, setPostDetailsStatus] = useState<{
    squareStyle: any;
    text: string;
  }>();

  useEffect(() => {
    switch (postStatusTypeNumber) {
      case 1:
        setPostDetailsStatus({
          squareStyle: style.liteBluesquare,
          text: hebrew.my_post,
        });
        break;
      case 2:
        setPostDetailsStatus({
          squareStyle: style.orangesquare,
          text: hebrew.wait_for_answer,
        });
        break;
      case 3:
        setPostDetailsStatus({
          squareStyle: style.greensquare,
          text: hebrew.request_in_process,
        });
        break;
      case 4:
        setPostDetailsStatus({
          squareStyle: style.bluesquare,
          text: hebrew.finish_request,
        });
        break;
    }
  }, [postStatusTypeNumber]);
  return (
    <View
      style={[
        style.square,
        postDetailsStatus?.squareStyle ?? {borderRadius: 8},
      ]}>
      <Text style={style.text}>{postDetailsStatus?.text}</Text>
    </View>
  );
};

export default PostStatusTypeSquare;

const style = StyleSheet.create({
  square: {
    minWidth: 100,
    minHeight: 30,
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 10,
    marginTop: 15,
    padding: 8,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fonstsize: '13.16',
    fontFamily: fonts.regular,
    shadowColor: '0.5 0.5 0 0',
  },
  greensquare: {
    backgroundColor: '#0F9581',
  },
  orangesquare: {
    backgroundColor: '#EDAB00',
  },
  liteBluesquare: {
    backgroundColor: '#69D7C7',
  },
  graysquare: {
    backgroundColor: '#7B7B7B',
  },
  bluesquare: {
    backgroundColor: '#0064C3',
  },
});
