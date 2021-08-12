import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home';
import Cart from './components/cart/Cart';
import Report from './components/report/Report';
import SettingStackScreen from './components/setting/SettingStackScreen';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {store, persistor} from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react'

import { Provider, useSelector } from 'react-redux';

Entypo.loadFont();
FontAwesome.loadFont();

const Tab = createBottomTabNavigator();

function MyTabs() {
  const state = useSelector(state => state);
  const colors = state.themeValue;

  return (
    <Tab.Navigator tabBarOptions={{
      style: styles.tabBar,
      activeTintColor: colors.primary,
      inactiveTintColor: '#AAAAAA',
    }}>
      <Tab.Screen name="Produk" style={styles.tabScreen} component={Home} options={{
        tabBarIcon: ({color}) => <Entypo name="news" size={22} color={color}  />
      }}/>
      <Tab.Screen name="Keranjang" component={Cart} options={{
        tabBarIcon: ({color}) => <FontAwesome name="shopping-cart" size={22} color={color} />
      }} />
      <Tab.Screen name="Laporan" component={Report} options={{
        tabBarIcon: ({color}) => <FontAwesome name="table" size={22} color={color} />
      }} />
      <Tab.Screen name="Settings" component={SettingStackScreen} options={{
        tabBarIcon: ({color}) => <Entypo name="cog" size={22} color={color} />
      }} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabScreen: {
    fontFamily: 'Montserrat-Black'
  }
})