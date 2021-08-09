import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {openDatabase} from 'react-native-sqlite-storage';
import { useSelector } from 'react-redux';

const db = openDatabase({name: 'pos.db', createFromLocation: 1});
const colors = '';

const Cart = ({ navigation }) => {
    const [cart, setCart] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const state = useSelector(state => state);
    const colors = state.themeValue;

    const List = ({item}) => {
        return (
            <TouchableOpacity style={{...styles.productList, backgroundColor: colors.white}} key={item.id}> 
                <View style={styles.box} />
                <Text style={styles.productTitle}> {item.productname} | summary : {item.summary} | amount: {item.amount} </Text>
                <View style={styles.productAdd}>
                    <Text> <FontAwesome name="shopping-cart" color={colors.white} size={20} /> </Text>
                </View>
            </TouchableOpacity>
        )
    }

    navigation.addListener('focus', () => {
        setRefresh(true);
    });

    useEffect(async () => {
        await db.transaction(function (txn) {
            txn.executeSql(
                "SELECT cart.id, product_id, product.name as productname, amount, summary FROM cart inner join product on product.id = cart.product_id",
                [],
                function (tx, results) {
                    var result = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        result.push(results.rows.item(i));

                    setCart(result);
                    setRefresh(false);
                },
                function(error) {
                    alert('Whoops!, something went wrong')
                }
            );
        });
    }, [refresh]);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary}}>
                <View style={{...styles.headerWrapper, backgroundColor: colors.primary}}>
                    <Text style={{...styles.headerText, color: colors.white}}> Cart </Text>
                </View>

                <View style={{...styles.product, backgroundColor: colors.grey}}>
                    <FlatList
                        data={cart}
                        renderItem={List}
                        keyExtractor={(item) => item.id}
                    />

                                        
                    <TouchableOpacity>
                        <View style={{...styles.done, backgroundColor: colors.secondary}} >
                            <Text style={styles.doneText}> Simpan Transaksi </Text>
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
        color: colors.white,
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
    done: {
        marginVertical: 5,
        padding: 15,
        borderRadius: 15
    },
    doneText: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    }
})

export default Cart;
