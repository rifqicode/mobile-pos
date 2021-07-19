import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors from '../assets/data/colors';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'pos.db', createFromLocation: 1});
const List = ({item}) => {
    return (
        <TouchableOpacity style={styles.productList} key={item.id}> 
            <View style={styles.box} />
            <Text style={styles.productTitle}> {item.productname} | {item.summary} </Text>
            <View style={styles.productAdd}>
                <Text> <FontAwesome name="shopping-cart" color={colors.white} size={20} /> </Text>
            </View>
        </TouchableOpacity>
    )
}


const Cart = ({ navigation }) => {
    const [cart, setCart] = useState([]);
    const [refresh, setRefresh] = useState(false);

    navigation.addListener('focus', () => {
        setRefresh(true);
    });

    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT cart.id, product_id, product.name as productname, amount, summary FROM cart inner join product on product.id = cart.product_id",
                [],
                function (tx, results) {
                    var result = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        result.push(results.rows.item(i));

                    setCart(result);
                },
                function(error) {
                    alert('Whoops!, something went wrong')
                }
            );
        });
    }, [refresh]);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary}}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}> Cart </Text>
                </View>

                <View style={styles.product}>
                    <FlatList
                        data={cart}
                        renderItem={List}
                        keyExtractor={(item) => item.id}
                    />
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

export default Cart;
