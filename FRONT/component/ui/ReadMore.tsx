import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import fonts from '../../styles/fonts';
import {hebrew} from '../Hebrew';

const ReadMore = ({text, minSize}: {text: string; minSize: number}) => {
  const [showLessMore, setShowLessMore] = useState<boolean>(false);
  const [shortText, setShortText] = useState<string>('');

  useEffect(() => {
    if (text != undefined && text.length > minSize)
      setShortText(text.slice(0, minSize));
    else setShortText(text);
  }, [text]);

  if (text != undefined && text.length < minSize)
    return (
      <View style={[styles.textContainer]}>
        <Text style={{color: 'black'}}>{shortText}</Text>
      </View>
    );
  else
    return (
      <View style={styles.textContainer}>
        {!showLessMore ? (
          <>
            <Text style={[styles.textGeneral, styles.textbody]}>
              {shortText}
              {'  '}
              ...
              <Text
                onPress={() => setShowLessMore(true)}
                style={[styles.readMore, styles.textGeneral]}>
                {hebrew.readMore}
              </Text>
            </Text>
          </>
        ) : (
          <View>
            <Text style={styles.textGeneral}>
              {text}{' '}
              <Text
                onPress={() => setShowLessMore(false)}
                style={[
                  styles.readMore,
                  styles.textGeneral,
                  {alignSelf: 'flex-start'},
                ]}>
                {hebrew.showLess}
              </Text>
            </Text>
          </View>
        )}
      </View>
    );
};

export default ReadMore;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 10,
    flexDirection: 'row-reverse',
    fontFamily: fonts.regular,
    width: '100%',
  },
  readMore: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textShadowColor: 'black',
  },
  textGeneral: {
    color: 'black',
    fontSize: 15.04,
    fontWeight: '400',
    // fontFamily: fonts.regular,
  },
  textbody: {
    // fontStyle: fonts.regular,
  },
});
