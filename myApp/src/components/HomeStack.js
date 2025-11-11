import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'
import Comentarios from '../screens/Comentarios'

function HomeStack() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="Comentarios"
        component={Comentarios}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
