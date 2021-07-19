import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors from '../assets/data/colors';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item First",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const List = ({item}) => {
    return (
        <TouchableOpacity style={styles.productList} onPress={() => alert('Item added')}> 
            <View style={styles.box} />
            <Text style={styles.productTitle}> {item.title} </Text>
            <View style={styles.productAdd}>
                <Text> <FontAwesome name="shopping-cart" color={colors.white} size={20} /> </Text>
            </View>
        </TouchableOpacity>
    )
}

const Home = () => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary}}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}> Daftar Product </Text>
                </View>

                <View style={styles.product}>
                    <FlatList 
                        data={DATA}
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
