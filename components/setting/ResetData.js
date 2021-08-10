import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import ProductModel from '../../model/Product';
import TransactionModel from '../../model/Transaction';
import TransactionDetailModel from '../../model/TransactionDetail';

const ResetData = () => {
    const state = useSelector(state => state);
    const colors = state.themeValue;

    const productReset = async () => {
        Alert.alert(
            "Perhatian!",
            "Apakah anda yakin ingin mengahapus data product ?",
            [
                {
                    text: "Batal",
                    style: "cancel"
                },
                { text: "Yakin", 
                  onPress: async () => {
                      await ProductModel.reset();
                      Alert.alert(
                          'Perhatian!',
                          'Data Berhasil direset'
                      );
                  }  
                }
            ]
        );
    }

    const resetTransaction = async () => {
        Alert.alert(
            "Perhatian!",
            "Apakah anda yakin ingin mengahapus transaksi ?",
            [
                {
                    text: "Batal",
                    style: "cancel"
                },
                { text: "Yakin", 
                  onPress: async () => {
                      await TransactionModel.reset();
                      await TransactionDetailModel.reset();
                      Alert.alert(
                          'Perhatian!',
                          'Data Berhasil direset'
                      );
                  }  
                }
            ]
        );
    }
    
    return (
        <SafeAreaView style={{...styles.container, backgroundColor: colors.grey}}>
            <TouchableOpacity onPress={async () => await productReset()}>
                <View style={{...styles.action, backgroundColor: colors.primary}}>
                    <Text style={{...styles.actionText, color: colors.text}}> Reset Product </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={async () => await resetTransaction()}>
                <View style={{...styles.action, backgroundColor: colors.primary}}>
                    <Text style={{...styles.actionText, color: colors.text}}> Reset Transaksi </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
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
    action: {
        marginVertical: 5,
        padding: 15,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 15
    },
    actionText: {
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Regular'
    }
});

export default ResetData;
