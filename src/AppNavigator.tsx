/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ListProduct from './screens/ListProduct';
import ViewProduct from './screens/ViewProduct';

const AppNavigator = () => {
  const stack = createStackNavigator()
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{
        headerStyle: {
          // Your custom header styles
          backgroundColor:'purple'
        },
        headerTintColor: '#fff', // Your custom header text color
        headerTitleStyle: {
          // Your custom header title styles
        },
      }}>

        <stack.Screen options={{
          headerShown: true,
          headerBackTitle: 'Back', // Set your desired back button title
          headerBackTitleVisible: true, // Set to false to hide the back button title
        }} name='ListProduct' component={ListProduct} />
        <stack.Screen options={{ headerShown: true }} name='ViewProduct' component={ViewProduct} />


      </stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;

