import React, {useEffect, useRef} from 'react';
import {
  Animated,
  View,
  Easing,
  useWindowDimensions,
  StyleSheet,
  Image,
} from 'react-native';
import Button from '../Components/Button';
export default () => {
  const firstOpacity = useRef(new Animated.Value(0)).current;
  const secondOpacity = useRef(new Animated.Value(0)).current;
  const thirdOpacity = useRef(new Animated.Value(0)).current;

  const {width, height} = useWindowDimensions();

  const translationX = useRef(new Animated.Value(0)).current;
  const scaleUp = Animated.timing(translationX, {
    toValue: 1,
    delay: 300,
    duration: 350,
    easing: Easing.out(Easing.circle),
    useNativeDriver: true,
  });
  const scaleDown = Animated.timing(translationX, {
    toValue: 0,
    duration: 200,
    easing: Easing.in(Easing.circle),
    useNativeDriver: true,
  });

  const stack = Animated.stagger(1000, [scaleUp, scaleDown]);

  const loopAnimation = Animated.loop(stack);

  useEffect(() => {
    scaleUp.start();
  });
  return (
    <View style={style.container}>
      <View style={style.loadingView}>
        <Animated.View
          style={{
            width: width - 100,
            ...style.view,
            transform: [
              {scale: translationX},
              {
                rotate: translationX.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['123deg', '0deg'],
                }),
              },
            ],
            opacity: translationX,
          }}>
          <Image
            style={{...style.imageStyle, width: width - 100}}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_960_720.jpg',
            }}
          />
        </Animated.View>
        <Animated.View
          style={{
            width: width - 100,
            ...style.view,
            transform: [
              {scale: translationX},
              {
                rotate: translationX.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['123deg', '0deg'],
                }),
              },
            ],
            opacity: translationX.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}>
          <Image
            style={{...style.imageStyle, width: width - 100}}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_960_720.jpg',
            }}
          />
        </Animated.View>
      </View>

      <Button
        onPress={() => {
          scaleDown.start();
        }}
        title={'Scale Down'}
        btnText={style.btnText}
        btnStyle={style.btnStyle}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 9,
    paddingBottom: 20,
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
  btnStyle: {
    padding: 12,
    marginBottom: 12,
  },
  loadingView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    aspectRatio: 1,
    borderRadius: 20,
  },
  view: {
    borderRadius: 12,
    margin: 2,
    // backgroundColor: 'orange',
  },
});
