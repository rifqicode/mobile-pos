import { printCommonLine } from "jest-diff/build/printDiffs";
import React, { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import ProductModel from '../../model/Product';

const CrudProductAction = ({ route, navigation }) => {
    const { productId } = route.params;

    const state = useSelector(state => state)
    const colors = state.themeValue;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [refresh, setRefresh] = useState(false)

    useEffect( async () => {
        if (productId) {
            const get = await ProductModel.findOneBy({
                id : productId
            });

            setName(get.name.toString());
            setPrice(get.price.toString());
        }
    }, [refresh])

    const save = async () => {
        const data = {
            name: name,
            price: price
        };

        if (!name || !price) {
            Alert.alert('Perhatian!', 'Nama produk dan Harga wajib di isi!');
            return false;
        }

        if (productId) {
            await ProductModel.update(data, {
                id: productId
            });
            
            Alert.alert('Perhatian!', 'Data berhasil diupdate!', [
            {
                text: "OK",
                onPress: () => {
                    navigation.navigate('CrudProduct');
                }
            },
            ]);

            return false;
        }

        await ProductModel.create(data);
        Alert.alert('Perhatian!', 'Data berhasil ditambah!', [
            {
                text: "OK",
                onPress: () => {
                    navigation.navigate('CrudProduct');
                }
            },
        ]);
    };

    const reset = () => {
        setName('');
        setPrice('');
    }

    navigation.addListener('focus', () => {
        setRefresh(true);
    });

    return (
        <>
            <View style={styles.container}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.text}> Nama Produk </Text>
                    <TextInput 
                    style={{...styles.input, borderColor: colors.secondary}} 
                    onChangeText={setName}
                    value={name}
                    placeholder="Masukan nama produk / item"
                    keyboardType="default" 
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.text}> Harga Produk </Text>
                    <TextInput 
                    style={{...styles.input, borderColor: colors.secondary}} 
                    onChangeText={(input) => setPrice(input)}
                    value={price}
                    placeholder="Masukan Harga"
                    keyboardType="numeric"
                    />
                </View>

                <View style={styles.action}>
                    <TouchableOpacity onPress={ async () => await save()}>
                        <View style={{...styles.button, backgroundColor: colors.primary}}>
                            <Text style={styles.buttonText}> Save </Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => reset()}>
                        <View style={{...styles.button, backgroundColor: '#FF4848'}}>
                            <Text style={styles.buttonText}> Reset </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    inputWrapper: {
        
    },
    action: {
        marginVertical: 15
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        padding: 10
    },
    button: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 15
    },
    buttonText: {
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        color: 'white',
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
    }
});

export default CrudProductAction;