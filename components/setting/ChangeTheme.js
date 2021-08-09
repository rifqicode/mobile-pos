import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { changeThemeAction } from '../../redux/action'
import { listTheme } from '../../assets/data/colors'

const ThemeList = [
    '#FE9898',
    '#334756',
    '#57837B',
    '#548CA8',
    '#ED8E7C'
];

const ChangeTheme = (props) => {
    const state = useSelector(state => state);
    const colors = state.themeValue;

    const setTheme = (value) => {
        props.dispatch(changeThemeAction(value));
    }

    return (
        <>
            <SafeAreaView style={{...styles.container, backgroundColor: colors.grey}}>
                <Text style={styles.headerText}> Choose Color </Text>

                <View style={styles.listColor}>
                    {Object.keys(listTheme).map((value, key) => {
                        return (
                            <TouchableOpacity key={key} onPress={() => setTheme(value)}>
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
    },
    headerText: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: '200'
    },
    listColor: {
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    colorPick: {
        padding: 25,
        marginHorizontal: 5,
        marginVertical: 5
    }
})

const mapStateToProps = (state, props) => {
    return { theme: state.theme };
}

export default connect(mapStateToProps)(ChangeTheme);
