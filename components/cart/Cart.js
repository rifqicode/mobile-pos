import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {openDatabase} from 'react-native-sqlite-storage';
import { useSelector } from 'react-redux';

import moment from 'moment';
import ListProduct from './ListProduct'
import CartModel from '../../model/Cart'
import TransactionModel from '../../model/Transaction'
import TransactionDetailModel from '../../model/TransactionDetail'

FontAwesome.loadFont();

const db = openDatabase({name: 'pos.db', createFromLocation: 1});

const Cart = ({ navigation }) => {
    const [cart, setCart] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(0);

    const state = useSelector(state => state);
    const colors = state.themeValue;

    navigation.addListener('focus', () => {
        setRefresh(true);
    });

    useEffect(async () => {
        await db.transaction(function (txn) {
            txn.executeSql(
                "SELECT cart.id, product_id, product.name as productname, amount, summary, product.price FROM cart inner join product on product.id = cart.product_id",
                [],
                function (tx, results) {
                    var result = [];
                    var total = 0;
                    var amount = 0;

                    for (let i = 0; i < results.rows.length; ++i) {
                        let data = results.rows.item(i);
                        result.push(data);
                        total += data.summary;
                        amount += data.amount;
                    }

                    setTotal(total);
                    setAmount(amount);
                    setCart(result);
                    setRefresh(false);
                },
                function(error) {
                    Alert.alert('Perhatian !', 'Terjadi Kesalahan')
                }
            );
        });
    }, [refresh]);

    const reset = async () => {
        await CartModel.reset();
        setRefresh(true);
        Alert.alert('Perhatian !', 'Data Berhasil Direset');
    }

    const save = async () => {
        if (cart.length <= 0) {
            Alert.alert('Perhatian !', 'Keranjang masih kosong');
            return false;    
        }

        let { insertId } = await TransactionModel.create({
            total_price_item: total,
            amount_item: amount,
            date: moment().format('Y-M-D')
        });
        
        if (insertId) {
            cart.map( async (value) => {
                let transactionDetail = await TransactionDetailModel.create({
                    name: value.productname,
                    price: value.price,
                    amount: value.amount, 
                    transaction_id: insertId,
                }) 
            });

            await CartModel.reset();
            setRefresh(true);
            
            Alert.alert(
                'Perhatian !',
                'Data Transaksi Berhasil Disimpan'
            );
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary}}>
                <View style={{...styles.headerWrapper, backgroundColor: colors.primary}}>
                    <Text style={{...styles.headerText, color: colors.white}}> Cart </Text>
                </View>

                <View style={{...styles.product, backgroundColor: colors.grey}}>

                    <View style={styles.productTotal}>
                        <Text style={styles.productTotalText}> Total </Text>
                        <Text style={styles.productTotalVariable}> Rp. {total} | {amount} Item </Text>
                    </View>

                    <FlatList
                        data={cart}
                        renderItem={({item}) => <ListProduct item={item} setRefresh={setRefresh} />}
                        keyExtractor={(item) => item.id}
                    />

                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                        <TouchableOpacity onPress={ async () => await reset()}>
                            <View style={{...styles.done, backgroundColor: 'red'}} >
                                <Text style={styles.doneText}> Reset Keranjang </Text>
                            </View>
                        </TouchableOpacity>

                        
                        <TouchableOpacity onPress={ async () => await save()}>
                            <View style={{...styles.done, backgroundColor: colors.secondary}} >
                                <Text style={styles.doneText}> Simpan Transaksi </Text>
                            </View>
                        </TouchableOpacity>
                    </View>   
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
    productTotal: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productTotalText: {
        fontFamily: 'Montserrat-Bold'
    },
    productTotalVariable: {
        fontFamily: 'Montserrat-Bold'
    },
    product: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15
    }, 
    done: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 15,
    },
    doneText: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    }
})

export default Cart;
