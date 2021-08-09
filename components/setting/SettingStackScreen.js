import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import Setting from './Setting';
import ChangeTheme from './ChangeTheme' 
import ResetData from './ResetData' 

const SettingStack = createStackNavigator();

const SettingStackScreen = () => {
    const state = useSelector(state => state);
    const colors = state.themeValue;

    return (
        <SettingStack.Navigator>
            <SettingStack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
            <SettingStack.Screen name="ChangeTheme" component={ChangeTheme} options={{
                title: 'Change Theme',
                headerStyle: {
                    backgroundColor: colors.primary,
                    borderBottomWidth: 3
                },
                headerTitleStyle: {
                    fontSize: 18,
                    color: colors.white
                },
                headerTintColor : colors.white
            }} />
            <SettingStack.Screen name="ResetData" component={ResetData} options={{
                title: 'Reset Data',
                headerStyle: {
                    backgroundColor: colors.primary,
                    borderBottomWidth: 3
                },
                headerTitleStyle: {
                    fontSize: 18,
                    color: colors.white
                },
                headerTintColor : colors.white
            }} />
        </SettingStack.Navigator>
    );
}

export default SettingStackScreen;
