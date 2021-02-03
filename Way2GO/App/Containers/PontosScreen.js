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


class PontosScreen extends React.Component {
    static navigationOptions = {
        title: 'Pontos',
    };

    list = [
        {
            title: 'Bilhetes x5',
            transaction: '+5',
            debit: false,
            date: '30/10/2019',
            saldo: '190'
        },
        {
            title: 'Passe x2',
            transaction: '+20',
            debit: false,
            date: '10/09/2019',
            saldo: '170'
        },
        {
            title: 'Convidar um amigo',
            transaction: '+50',
            debit: false,
            date: '28/08/2019',
            saldo: '120'
        },
        {
            title: 'Troca de ponto por bilhete',
            transaction: '-50',
            debit: true,
            date: '30/07/2019',
            saldo: '270'
        },
        {
            title: 'Passe x2',
            transaction: '+20',
            debit: false,
            date: '28/06/2019',
            saldo: '250'
        },

    ]

    state={yearOrMonth: 'Ano' ,year:'', month:''}
    monthList=[{label:'Janeiro', value:'Janeiro'},
               {label:'Fevereiro', value:'Fevereiro'},
               {label:'Março', value:'Março'},
               {label:'Abril', value:'Abril'},]
    yearList=[{label:'2018', value:'2018'},
              {label:'2019', value:'2019'}]
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <Text style={styles.balanceText}>Pontos</Text>
                    <Text style={styles.balanceText}>190</Text>
                </View>
                <View style={{width:"100%", flexDirection:"row", justifyContent:'space-between'}}>
                    <View style={{width:"45%", marginLeft:"5%"}}>
                        <PickerSelect style={{width:"50%"}}
                            selectedValue = {this.state.month}
                            placeholder={{label:'Mês'}}
                            placeholderTextColor="black"
                            onValueChange={itemValue => this.setState({ month: itemValue })}
                            items={ this.monthList}
                        />
                    </View>
                    <View style={{width:"45%", marginRight:"5%"}}>
                        <PickerSelect
                            selectedValue={this.state.year}
                            placeholder={{label:'Ano'}}
                            placeholderTextColor="black"
                            onValueChange={itemValue => this.setState({ year: itemValue})}
                            items={this.yearList}
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

export default PontosScreen;

