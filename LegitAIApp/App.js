import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Category from './screens/Category';
import Products from './screens/Products';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="Products" component={Products} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
