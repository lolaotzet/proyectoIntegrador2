import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Comentarios from './Comentarios';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Feed' }}
      />
      <Stack.Screen
        name="Comentarios"
        component={Comentarios}
        options={{ title: 'Comentarios' }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack
