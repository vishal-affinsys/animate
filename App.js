import React from 'react';
import {HomeScreen, AnimationScreen} from './Screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './Store/store';
import Scroll from './Screens/Scroll';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Homescreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AnimationScreen"
            component={AnimationScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Scroll"
            component={Scroll}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
