import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const Setting = ({ navigation }) => {

    const state = useSelector(state => state);
    const colors = state.themeValue;

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary}}>
                <View style={{...styles.headerWrapper, backgroundColor: colors.primary}}>
                    <Text style={{...styles.headerText, color: colors.white}}> Setting Aplikasi </Text>
                </View>

                <View style={{...styles.body, backgroundColor: colors.grey}}>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangeTheme')}>
                        <View style={{...styles.setting, backgroundColor: colors.primary}}>
                            <Text style={{...styles.settingContent, color: colors.text}}> Ganti Tema </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{...styles.setting, backgroundColor: colors.primary}}>
                            <Text style={{...styles.settingContent, color: colors.text}}> Tambah / Edit Produk </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('ResetData')}>
                        <View style={{...styles.setting, backgroundColor: colors.primary}}>
                            <Text style={{...styles.settingContent, color: colors.text}}> Reset Data </Text>
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
        maxHeight: 50,
        position: 'relative'
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold'
    },
    body: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15,
    },
    setting: {
        padding: 15,
        borderRadius: 15,
        marginVertical: 10,
    },
    settingContent: {
        fontWeight: 'bold'
    }
})

export default Setting;
