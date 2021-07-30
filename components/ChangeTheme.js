import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../assets/data/colors';

const ThemeList = [
    '#FE9898',
    '#334756',
    '#57837B',
    '#548CA8',
    '#ED8E7C'
];

const setLayoutHeader = (Theme) => {
    console.log('Test ' + Theme);
}

const ChangeTheme = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text style={styles.headerText}> Choose Color </Text>

                <View style={styles.listColor}>
                    {ThemeList.map((value, key) => {
                        return (
                            <TouchableOpacity key={key} onPress={() => setLayoutHeader(value)}>
                                <View style={{...styles.colorPick, backgroundColor: value}}></View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 5,
        position: 'relative',
        backgroundColor: colors.grey2
    },
    headerText: {
        fontFamily: 'Montserrat-Regular'
    },
    listColor: {
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    colorPick: {
        padding: 25,
        marginHorizontal: 10
    }
})

export default ChangeTheme;
