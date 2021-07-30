import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../assets/data/colors';

const Setting = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary}}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}> Setting Product </Text>
                </View>

                <View style={styles.body}>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangeTheme')}>
                        <View style={styles.setting}>
                            <Text style={styles.settingContent}> Change Theme </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.setting}>
                            <Text style={styles.settingContent}> Add / Update Product </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.setting}>
                            <Text style={styles.settingContent}> Reset Data </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 5,
        backgroundColor: colors.secondary,
        maxHeight: 50,
        position: 'relative'
    },
    headerText: {
        fontSize: 20,
        color: colors.white,
        fontFamily: 'Montserrat-Bold'
    },
    body: {
        flex: 1,
        backgroundColor: colors.grey2,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15,
    },
    setting: {
        backgroundColor: '#334257',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    settingContent: {
        color: 'white'
    }
})

export default Setting;
