import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from './assets/data/colors';
import Home from './components/Home';
import Setting from './components/Setting';
import Cart from './components/Cart';
import Report from './components/Report';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

Entypo.loadFont();
FontAwesome.loadFont();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      style: styles.tabBar,
      activeTintColor: colors.primary,
      inactiveTintColor: colors.grey,
      // showLabel: false
    }}>
      <Tab.Screen name="Home" style={styles.tabScreen} component={Home} options={{
        tabBarIcon: ({color}) => <Entypo name="news" size={22} color={color}  />
      }}/>
      <Tab.Screen name="Cart" component={Cart} options={{
        tabBarIcon: ({color}) => <FontAwesome name="shopping-cart" size={22} color={color} />
      }} />
      <Tab.Screen name="Report" component={Report} options={{
        tabBarIcon: ({color}) => <FontAwesome name="table" size={22} color={color} />
      }} />
      <Tab.Screen name="Settings" component={Setting} options={{
        tabBarIcon: ({color}) => <Entypo name="cog" size={22} color={color} />
      }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabScreen: {
    fontFamily: 'Montserrat-Black'
  }
})