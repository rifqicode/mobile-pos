import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

import CartModel from '../../model/Cart';

FontAwesome.loadFont();

const ListProduct = ({item, setRefresh}) => {
    const state = useSelector(state => state);
    const colors = state.themeValue;

    const action = async (item, action) => {
        let {id, summary, amount, price} = item;

        switch (action) {
            case 'minus':
                if (item.amount - 1 <= 0) {
                    await CartModel.delete({id: id});

                    setRefresh(true);
                    return false;
                }

                await CartModel.update({
                    summary: summary - price,
                    amount: amount - 1
                }, {id : id});

                setRefresh(true);
                break;
            case 'plus':
                await CartModel.update({
                    summary: summary + price,
                    amount: amount + 1
                }, {id : id});

                setRefresh(true);
                break;
        }
    }

    return (
        <View style={{...styles.productList, backgroundColor: colors.white}} key={item.id}> 
            <Text style={styles.productTitle}> {item.productname} | Rp. {item.summary} </Text>
            <View style={styles.productAction}>
                <TouchableOpacity onPress={ async () => await action(item, 'minus')}>
                    <Text> <FontAwesome name="minus-circle" size={22} color='#ded8d7' /> </Text>
                </TouchableOpacity>
                <Text style={styles.productAmount}> {item.amount} </Text>
                <TouchableOpacity onPress={ async () => await action(item, 'plus')}>
                    <Text> <FontAwesome name="plus-circle" size={22} color='#369c46' /> </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    productList: {
        padding: 15,
        marginHorizontal: 5,
        marginVertical: 15,
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row'
    },
    productTitle: {
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 5,
        textAlign: 'center',
        marginHorizontal: 15,
    },
    productAmount: {
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    productAction: {
        flex: 1,
        flexDirection: 'row',
        right: 0,
        top: '60%',
        position: 'absolute',
        marginHorizontal: 15
    }, 
})

export default ListProduct;
