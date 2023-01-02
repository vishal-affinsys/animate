import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {View, StyleSheet, StatusBar} from 'react-native';
import Button from '../Components/Button';

export default () => {
  const navigation = useNavigation();

  return (
    <View style={style.body}>
      <StatusBar hidden backgroundColor={'transparent'} />
      <Button
        title={'Animate'}
        btnText={style.btnText}
        btnStyle={style.btnStyle}
        onPress={() => {
          navigation.navigate('AnimationScreen');
        }}
      />
      <Button
        title={'Scroll view'}
        btnText={style.btnText}
        btnStyle={style.btnStyle}
        onPress={() => {
          navigation.navigate('Scroll');
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  btnText: {
    color: 'white',
  },
  btnStyle: {
    padding: 12,
  },
});
