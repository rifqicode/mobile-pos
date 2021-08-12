import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

import TransactionModel from '../../model/Transaction';

FontAwesome.loadFont();
const ReportDaily = ({date}) => {
    const state = useSelector(state => state);
    const colors = state.themeValue;
    const [summary, setSummary] = useState({})
    const [transaction, setTransaction] = useState([])

    const currencyFormat = (num) => {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    useEffect( async () => {
        const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        setSummary(await TransactionModel.reportSummary({date: dateFormat}));
        setTransaction(await TransactionModel.reportTransactionDetail(dateFormat));

        console.log(transaction);
    }, [date])

    return (
        <>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                <View style={{...styles.box, backgroundColor: colors.secondary}}>
                    <Text style={{...styles.boxHeader, color: colors.white}}> {summary.count || 0} </Text> 
                    <Text style={{...styles.boxFooter, color: colors.white}}> Total Transaksi </Text> 
                </View>

                <View style={{...styles.box, backgroundColor: colors.secondary}}>
                    <Text style={{...styles.boxHeader, color: colors.white}}> {currencyFormat(summary.total_price_item || 0)} </Text> 
                    <Text style={{...styles.boxFooter, color: colors.white}}> Total Pemasukan </Text> 
                </View>
            </View>


            <ScrollView style={{ padding: 5, marginVertical: 2}}>
                <Text style={{...styles.text}}> List Transaksi </Text>

                {transaction.map((value, key) => {
                    return (
                        <TouchableOpacity key={key}>
                            <View style={styles.transaction}>
                                <Text style={styles.transactionHeader}> Produk Terjual {value.amount_item} ( Rp. {currencyFormat(value.total_price_item || 0)} ) </Text> 
                                <Text style={styles.transactionFooter}> <FontAwesome name="clock-o" size={15} color='black' /> 18:00 </Text> 
                            </View> 
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    box: {
        padding: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        width: 170
    },
    boxHeader: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
    },
    boxFooter: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Montserrat-Reguler',
    },

    transaction: {
        padding: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    transactionHeader: {
        fontSize: 15,
        fontFamily: 'Montserrat-Reguler',
    },
    transactionFooter: {
        textAlign: 'right',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
    },
    text: {
        fontSize: 15,
        fontFamily: 'Montserrat-Reguler',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ReportDaily;
