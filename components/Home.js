import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors from '../assets/data/colors';
import { openDatabase, deleteDatabase } from 'react-native-sqlite-storage';
import CartModel from '../model/Cart';

const db = openDatabase({name: 'pos.db', createFromLocation: 1});

const List = ({item}) => {
    const itemAdd = async (data) => {
        const {id, name, price} = data;
        const find = await CartModel.findOneBy({
            product_id : id
        });

        const resultFind = find.rows.item(0);
        console.log(resultFind);

        // if (!resultFind) {
        //     console.log('in');
        //     const create = await CartModel.create({
        //         product_id: id,
        //         amount: 1,
        //         summary: 1
        //     });
            
        //     alert('Item Added');
        //     return true;
        // }

        const update = await CartModel.update({
            product_id: id,
            amount: 1 + resultFind.amount,
            summary: 1 + resultFind.summary
        }, {id : resultFind.id});

        console.log(update);
    }

    return (
        <TouchableOpacity style={styles.productList} key={item.id} onPress={() => itemAdd(item)}> 
            <View style={styles.box} />
            <Text style={styles.productTitle}> {item.name} </Text>
            <View style={styles.productAdd}>
                <Text> <FontAwesome name="shopping-cart" color={colors.white} size={20} /> </Text>
            </View>
        </TouchableOpacity>
    )
}

const Home = () => {
    const [product, setProduct] = useState([]);

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

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary}}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}> Daftar Product </Text>
                </View>

                <View style={styles.product}>
                    <FlatList 
                        data={product}
                        renderItem={List}
                        keyExtractor={(item) => item.id}
                        // numColumns={1}
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
        backgroundColor: colors.primary,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    box: {
        borderRadius: 60,
        borderColor: colors.secondary,
        borderWidth: 2,
        padding: 10,
        backgroundColor: colors.secondary,
    }
})
export default Home;
