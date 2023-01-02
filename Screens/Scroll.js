import React, {useRef} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Animated,
  useWindowDimensions,
  Pressable,
  Easing,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getUserDataFromInternet} from '../Store/Reducers/BroadcastListener';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

function Scroll() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();

  const UserRdx = useSelector(state => state.message);
  const DATA = UserRdx.messages;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 120],
    extrapolate: 'clamp',
  });

  const headerText = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const opacityText = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const scale = React.useRef(new Animated.Value(0)).current;
  const scaleB = React.useRef(new Animated.Value(-width)).current;
  const springHeader = Animated.spring(scale, {
    toValue: 1,
    friction: 4,

    useNativeDriver: true,
  });
  const springBody = Animated.spring(scaleB, {
    toValue: 0,
    friction: 6,
    useNativeDriver: true,
  });
  const staggeredAnimation = Animated.stagger(200, [springHeader, springBody]);

  React.useEffect(() => {
    if (DATA.length === 0) {
      dispatch(getUserDataFromInternet()).then(data => {
        staggeredAnimation.start();
      });
    } else {
      staggeredAnimation.start();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (DATA.length === 0) {
    return (
      <View style={styles.saveArea}>
        <ActivityIndicator color={'white'} />
      </View>
    );
  }

  return (
    <View style={styles.saveArea}>
      <Animated.View
        style={[
          styles.header,
          {transform: [{translateY: headerTranslateY}, {scale: scale}]},
        ]}>
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{translateY: imageTranslateY}],
            },
          ]}
          source={{
            uri: 'https://cdn.dribbble.com/users/946315/screenshots/11010402/media/dd4cded8fbd7ed01fcbda590bb3c01d9.png?compress=1&resize=1000x750&vertical=top',
          }}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.headerTextContainer,
          {transform: [{translateY: headerText}]},
        ]}>
        <Animated.Text style={[styles.headerText, {opacity: opacityText}]}>
          Friends
        </Animated.Text>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT - 10}}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        {DATA.map((item, index) => (
          <RenderListItem item={item} scaleB={scaleB} key={item.id} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const RenderListItem = ({item, scaleB}) => {
  const scaleA = React.useRef(new Animated.Value(1)).current;
  const tileHeight = React.useRef(new Animated.Value(60)).current;
  const [expanded, setExpanded] = React.useState(false);

  const tileAnimation = value =>
    Animated.spring(tileHeight, {
      toValue: 300,
      duration: 100,
      useNativeDriver: false,
      easing: Easing.bounce,
    });

  const timingAnimation = value =>
    Animated.spring(scaleA, {
      toValue: value,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.bounce,
    });
  const staggeredAnimation = Animated.stagger(100, [
    timingAnimation(0.8),
    timingAnimation(1),
  ]);
  return (
    <Animated.View
      style={[
        {
          transform: [{translateX: scaleB}, {scale: scaleA}],
        },
        styles.press,
      ]}>
      <Animated.View style={{maxHeight: tileHeight}}>
        <Pressable
          style={styles.card}
          onPress={() => {
            staggeredAnimation.start(() => {
              staggeredAnimation.reset();
            });
            if (expanded) {
              tileAnimation(60).start();
              setExpanded(false);
            } else {
              tileAnimation(300).start(() => {
                tileAnimation(300).reset();
              });
              setExpanded(true);
            }
          }}
          onLongPress={() => {
            timingAnimation(1.1).start();
          }}
          android_ripple={{color: 'white'}}>
          <Image style={styles.avatar} source={{uri: item.avatar}} />
          <View style={styles.cardTitleContainer}>
            <Text style={styles.fullNameText}>{item.fullName}</Text>
            <Text style={styles.usernameText}>{item.userName}</Text>
            {/* {expanded ? (
              <View>
                <Text style={styles.usernameText}>{item.phone}</Text>
                <Text style={styles.usernameText}>Age: {item.age}</Text>
                <Text style={styles.usernameText}>Gender: {item.gender}</Text>
              </View>
            ) : (
              <View />
            )} */}
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  press: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor: 'white',
  },
  cardTitleContainer: {
    justifyContent: 'center',

    // backgroundColor: 'tomato',
    // alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  avatar: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
    borderRadius: 54 / 2,
  },
  fullNameText: {
    fontSize: 16,
    marginLeft: 24,
    fontFamily: 'CherryCreamSoda-Regular',
    color: 'white',
  },
  usernameText: {
    fontSize: 14,
    marginLeft: 24,
    // fontFamily: 'Calligraffitti-Regular',
    fontStyle: 'italic',
    color: 'grey',
  },
  headerTextContainer: {
    top: 200,
    left: 20,
    marginBottom: 20,
    padding: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'CherryCreamSoda-Regular',
  },
});

export default Scroll;
