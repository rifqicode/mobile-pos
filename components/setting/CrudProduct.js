import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { openDatabase, deleteDatabase } from 'react-native-sqlite-storage';

import ProductModel from '../../model/Product';
import CrudProductModal from './CrudProductAction';

FontAwesome.loadFont();

const db = openDatabase({name: 'pos.db', createFromLocation: 1});

const CrudProduct = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const state = useSelector(state => state);
    const colors = state.themeValue;

    const [product, setProduct] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const deleteProduct = (id) => {
        Alert.alert('Perhatian!', 'Data yang dihapus tidak dapat dikembalikan, apakah anda yakin ?',
        [
            {
                text: "Batal",
                style: "cancel"
            },
            { text: "Yakin", 
                onPress: async () => {
                    await ProductModel.delete({id: id});
                    Alert.alert(
                        'Perhatian!',
                        'Data Berhasil dihapus'
                    );

                    setRefresh(true);
                }  
            }
        ]);
    }

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
                    setRefresh(false);
                },
                function(error) {
                    alert('Whoops!, something went wrong')
                }
            );
        });
    }, [refresh]);

    navigation.addListener('focus', () => {
        setRefresh(true);
    });

    return (
        <>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('CrudProductAction', {
                    productId: null
                })}> 
                    {/* <Text style={{...styles.text, color: 'black'}}> Tambah </Text> */}
                    <Text> 
                        <FontAwesome name="plus-circle" color='green' size={30} />
                    </Text> 
                </TouchableOpacity>

                <ScrollView style={{ marginVertical: 15 }}>
                    {product.map((item, key) => {
                        return (
                            <View key={key} style={{...styles.list, backgroundColor: colors.secondary}}>
                                <View>
                                    <Text style={styles.text}> {item.name} </Text>
                                    <Text style={styles.text}> Rp. {item.price} </Text>
                                </View>
                                <View style={styles.action}>
                                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CrudProductAction', {
                                            productId: item.id
                                        })}>
                                        <Text style={styles.text}>                     
                                            <FontAwesome name="edit" color='white' size={22} />
                                        </Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.actionButton} onPress={() => deleteProduct(item.id)}>
                                        <Text style={styles.text}>                     
                                            <FontAwesome name="trash" color='white' size={22} />
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 15
    },
    buttonAdd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    list: {
        backgroundColor: 'grey',
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    actionButton: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    text: {
        fontFamily : 'Montserrat-Bold',
        color: 'white'
    }
});

export default CrudProduct;
