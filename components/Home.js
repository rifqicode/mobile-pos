import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { store } from '../redux/store'

import { openDatabase, deleteDatabase } from 'react-native-sqlite-storage';
import CartModel from '../model/Cart';
import { useSelector } from 'react-redux';

const db = openDatabase({name: 'pos.db', createFromLocation: 1});

const Home = () => {
    const [product, setProduct] = useState([]);
    const state = useSelector(state => state);
    const colors = state.themeValue;

    useEffect(async () => {
        await db.transaction(function (txn) {
            txn.executeSql(
                "SELECT id, name, price FROM product",
                [],
                function (tx, results) {
                    var result = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        result.push(results.rows.item(i));

                    setProduct(result);
                },
                function(error) {
                    alert('Whoops!, something went wrong')
                }
            );
        });
    }, []);

    const List = ({item}) => {
        const itemAdd = async (data) => {
            const {id, name, price} = data;
            const find = await CartModel.findOneBy({
                product_id : id
            });

            const resultFind = find.rows.item(0);
            const update = await CartModel.update({
                product_id: id,
                amount: 1 + resultFind.amount,
                summary: 1 + resultFind.summary
            }, {id : resultFind.id});

            alert('Successfully Added to Cart');
        }

        return (
            <TouchableOpacity style={{...styles.productList, backgroundColor: colors.white}} key={item.id} onPress={() => itemAdd(item)}> 
                <View style={{...styles.box, borderColor: colors.primary, backgroundColor: colors.primary}} />
                <Text style={styles.productTitle}> {item.name} </Text>
                <View style={{...styles.productAdd, backgroundColor: colors.primary}}>
                    <Text> <FontAwesome name="shopping-cart" color={colors.white} size={20} /> </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary}}>
                <View style={{...styles.headerWrapper, backgroundColor: colors.primary}}>
                    <Text style={{...styles.headerText, color: colors.white}}> Daftar Product </Text>
                </View>

                <View style={{...styles.product, backgroundColor: colors.grey}}>
                    <Text style={{ fontFamily: 'Montserrat-Bold'}}> Buat Transaksi </Text>
                    <FlatList 
                        data={product}
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
        flexDirection: 'row',
        position: 'relative'
    },
    productTitle: {
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 5,
    },
    productAdd: {
        position: 'absolute',
        right: 0,
        padding: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    box: {
        borderRadius: 60,
        borderWidth: 2,
        padding: 10,
    }
})
export default Home;
