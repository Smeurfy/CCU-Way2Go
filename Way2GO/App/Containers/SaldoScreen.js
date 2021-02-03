import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    FlatList,
    Picker
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import { Avatar, ListItem} from "react-native-elements";
import { Card, CardItem, Text, Icon } from "native-base";
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import colors from '../Styles/Color';
import { month, year } from '../Libs/Constants';


class SaldoScreen extends React.Component {
    static navigationOptions = {
        title: 'Saldo',
    };

    list = [
        {
            title: 'Passe Sub-23',
            transaction: '-30€',
            debit: true,
            date: '30/10/2019',
            saldo: '30€'
        },
        {
            title: 'Bilhete CP x2',
            transaction: '-2€',
            debit: true,
            date: '10/09/2019',
            saldo: '60€'
        },
        {
            title: 'Carregamento',
            transaction: '+30€',
            debit: false,
            date: '28/08/2019',
            saldo: '32€'
        },
        {
            title: 'Passe Sub-23',
            transaction: '-30€',
            debit: true,
            date: '30/10/2019',
            saldo: '2€'
        },
        {
            title: 'Bilhete metro 1x',
            transaction: '-1.49€',
            debit: true,
            date: '5/07/2019',
            saldo: '3.51€'
        },

    ]

    state={yearOrMonth: 'Ano' ,year:'', month:''}

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <Text style={styles.balanceText}>Saldo atual</Text>
                    <Text style={styles.balanceText}>30€</Text>
                </View>
                <View style={{width:"100%", flexDirection:"row", justifyContent:'space-between'}}>
                    <View style={{width:"45%", marginLeft:"5%"}}>
                        <PickerSelect style={{width:"50%"}}
                            selectedValue = {this.state.month}
                            placeholder={{label:'Mês'}}
                            placeholderTextColor="black"
                            onValueChange={itemValue => this.setState({ month: itemValue })}
                            items={ month }
                        />
                    </View>
                    <View style={{width:"45%", marginRight:"5%"}}>
                        <PickerSelect
                            selectedValue={this.state.year}
                            placeholder={{label:'Ano'}}
                            placeholderTextColor="black"
                            onValueChange={itemValue => this.setState({ year: itemValue})}
                            items={ year }
                        />
                    </View>
                </View>
                <FlatList data={this.list}
                         showsVerticalScrollIndicator={false}
                         renderItem={({item}) =>
                         <View style={styles.flatview}>
                             <View style={styles.itemRow}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={ item.debit ? styles.debit : styles.credit}>{item.transaction}</Text>
                             </View>
                             <View style={styles.itemRow}>
                                  <Text style={styles.date}>{item.date}</Text>
                                  <Text style={styles.saldo}>{item.saldo}</Text>
                             </View>
                         </View>
                         }
                         keyExtractor={item => item.title}
                       />
             </View>
                  );
                  }

    }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    containerTop:{
        marginTop:15,
        alignItems: 'center'
    },
    flatview:{
        marginBottom:10,
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor: '#d6d7da',
    },
    itemRow:{
        flexDirection:'row',
        justifyContent: 'space-between',
        width: responsiveWidth(100),
    },
    title:{
        fontSize: responsiveFontSize(3),
        marginLeft:20,
    },
    debit:{
        fontSize: responsiveFontSize(3),
        marginRight:20,
        color:'red'
    },
    credit:{
            fontSize: responsiveFontSize(3),
            marginRight:20,
            color:'green'
    },
    date:{
        fontSize: responsiveFontSize(2),
        marginLeft:20,
        color:'gray'
    },
    saldo:{
        fontSize: responsiveFontSize(2.5),
        marginRight:20,
        color:'gray'
    },
    balanceText:{
        fontSize: responsiveFontSize(4),
    },
    pickerStyle: {

    }

});

export default SaldoScreen;

