import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const Report = () => {
    const state = useSelector(state => state);
    const colors = state.themeValue;
    
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary}}>
                <View style={{...styles.headerWrapper, backgroundColor: colors.primary}}>
                    <Text style={{...styles.headerText, color: colors.white}}> Report </Text>
                </View>

                <View style={{...styles.product, backgroundColor: colors.grey}}>
                    <Text style={{...styles.header, backgroundColor: colors.white}}> Report </Text>
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
    product: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15
    },
    productList: {
        padding: 15,
        marginHorizontal: 5,
        marginVertical: 15,
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row'
    },
})

export default Report;
