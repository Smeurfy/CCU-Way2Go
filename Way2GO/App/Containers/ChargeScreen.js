import React from 'react';
import { Text, View, KeyboardAvoidingView, TextInput, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../Libs/Dimensions';
import PickerSelect from 'react-native-picker-select';
import colors from '../Styles/Color';
import { amount } from '../Libs/Constants';


class ChargeScreen extends React.Component {
    static navigationOptions = {
        title: 'Carregar',
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleInput(text) {
        let newText = '';
        let numbers = '0123456789';
        var dot = false;
        var afterDot = 0;

        for (var i = 0; i < text.length; i++) {
            if ( numbers.indexOf(text[i]) > -1 && afterDot < 2 ) {
              newText = newText + text[i];
              if (dot) afterDot++;
            }
            else if (dot == false && text[i] == '.') {
              newText = newText + text[i];
              dot = true;
            }
        }
        return newText;
    }

    formatInput() {
        var text = this.state.value;
        let value = text.split('.');
        if (value == '')
            return
        if (value.length == 1)
            text += ".00"
        else if (value[1].length == 0)
            text += "00"
        else if (value[1].length == 1)
            text += "0"
        this.setState({value: text})
    }

    goToPayScreen() {
        this.formatInput();
        if (this.state.value != '' && parseFloat(this.state.value) != 0.00) {
            this.props.navigation.navigate("MethodOfPay2", {
                value: this.state.value
            })
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <Image style={styles.trains} source={require('../Images/Comboios.png')}/>
                <Text style={ styles.description }>Valor a carregar:</Text>

                <View style={ styles.inputContainerAlt }>
                    <PickerSelect
                        selectedValue = {this.state.value}
                        placeholder={{label:'Quantia'}}
                        placeholderTextColor="black"
                        onValueChange={itemValue => this.setState({ value: itemValue })}
                        items={ amount }
                    />
                </View>
                <View style={{position: 'absolute', top: responsiveHeight(67)}}>
                    <TouchableHighlight style={styles.button} onPress={() => this.goToPayScreen()}>
                        <Text style={styles.buttonText}>CARREGAR</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    trains:{
        height: responsiveHeight(40),
        width: responsiveWidth(100)
    },
    description: {
        fontSize: responsiveFontSize(2),
        marginTop: responsiveHeight(5)
    },
    inputContainer: {
        borderBottomColor: colors.secondary,
        borderBottomWidth: 2,
        paddingBottom: 2,
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(9.2),
        width:290,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
    },
    inputContainerAlt: {
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(9.2),
        width: 290,
        height: 40,
        borderBottomColor: colors.primary,
        borderBottomWidth: 2,
        justifyContent:'center'
    },
    input:{
        fontSize: 20,
        flex:1,
        color: colors.tertiary,
        marginBottom: -20,
        textAlign: 'center'
    },
    input2:{
        fontSize: 20,
        color: colors.tertiary,
        marginBottom: -20,
        textAlign: 'center'
    },
    button: {
        height:55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:30,
        width:290,
        borderRadius:30,
        backgroundColor: colors.secondary,
    },
    buttonText: {
        color: colors.background,
        fontSize: responsiveFontSize(3),
    },
});

export default ChargeScreen;
