import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';

const Button = ({title, onPress, btnText, btnStyle}) => {
  return (
    <View style={style.container}>
      <Pressable
        android_ripple={{color: 'yellowgreen'}}
        style={{...style.pressable, ...btnStyle}}
        onPress={() => onPress()}>
        <Text style={btnText}>{title}</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 8,
    margin: 6,
  },
  pressable: {
    padding: 8,
    backgroundColor: '#842756',
  },
});

export default Button;
