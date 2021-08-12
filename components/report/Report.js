import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ReportDaily from './ReportDaily'

FontAwesome.loadFont();

const Report = ({navigation}) => {
    const now = moment().format('Y-M-D');
    const state = useSelector(state => state);
    const colors = state.themeValue;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false); 

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    navigation.addListener('focus', () => {
        setRefresh(true);
    });

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary}}>
                <View style={{...styles.headerWrapper, backgroundColor: colors.secondary}}>
                    <Text style={{...styles.headerText, color: colors.white}}> Laporan Transaksi </Text>
                </View>

                <View style={{...styles.body, backgroundColor: colors.grey}}>
                    <TouchableOpacity style={{marginVertical: 15}} onPress={showDatepicker}>
                        <Text style={{...styles.calendar}}>
                            <FontAwesome name="calendar" size={15} color='black' /> 
                            <Text> {date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() } </Text> 
                        </Text>
                        
                        {show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            display="calendar"
                            onChange={onChange}
                            />
                        )}
                    </TouchableOpacity>

                    <ReportDaily date={date} refresh={refresh} setRefresh={setRefresh}/>
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
    body: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15,
    },
    calendar: {
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    },
})

export default Report;
