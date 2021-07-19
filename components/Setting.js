import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../assets/data/colors';

const Setting = () => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary}}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}> Setting Product </Text>
                </View>

                <View style={styles.product}>
                    <Text style={styles.header}>Hello from Setting </Text>
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
    product: {
        flex: 1,
        backgroundColor: colors.grey2,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15
    },
    productList: {
        padding: 15,
        backgroundColor: colors.white,
        marginHorizontal: 5,
        marginVertical: 15,
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row'
    },
})

export default Setting;
