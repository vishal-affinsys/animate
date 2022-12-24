import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {addMessage} from '../Store/Reducers/BroadcastListener';

const HomeScreen = () => {
  const MessageRdx = useSelector(state => state.message);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(addMessage('Hello this is message from HomeScreen'));
  }, [dispatch]);

  console.log(MessageRdx.messages);

  return (
    <View>
      <Text>Hello, world!</Text>
      <Icon name="favorite" size={30} color={'red'} />
    </View>
  );
};

export default HomeScreen;
