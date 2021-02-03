import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    Image,
    View,
    TextInput,
    Button,
    TouchableHighlight,
} from 'react-native';
import { Container, Content, Card, CardItem, Right, Text, Icon, List, ListItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import PickerSelect from 'react-native-picker-select';
import colors from '../Styles/Color';
import { Root, Popup } from 'popup-ui';
import { formatValue } from '../Libs/AuxFunctions';
import { quantity, month } from '../Libs/Constants';
import Modal from "react-native-modal";

export default class RechargePassScreen extends Component {
    static navigationOptions = {
        title: 'Recarregar passe',
    };

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            isModalVisible: false,
            n: '0.00',
        }
        this.user = {}
    }

    async componentDidMount() {
        await this.getUser()
    }

    async getUser() {
        try {
            const currentUserEmail = await AsyncStorage.getItem('currentUser')
            this.user = JSON.parse(await AsyncStorage.getItem(currentUserEmail))
            console.log(this.user)
        }
        catch {
            // I did a doodoo
        }
    }

    async updateUser() {
        try {
            const currentUserEmail = await AsyncStorage.getItem('currentUser')
            await AsyncStorage.setItem(currentUserEmail, JSON.stringify(this.user))
            //Alert.alert('Compra efetuada', 'Boa viagem!')
        }
        catch {
            // I did a doodoo
        }
    }



    async transaction() {
        
        var date = new Date()
        var day = date.getDate(); 

        if (parseFloat(this.user.balance) < 30.00) {
            const need = formatValue(Math.round((30.00 - parseFloat(this.user.balance)) * 100) / 100);
            this.setState({n: need})
            //Alert.alert('Saldo insuficiente', 'Para comprares o teu passe, carrega a tua conta com pelo menos ' + need + '€!');
        }
        else {
            this.setState({success: true})
            this.user.balance = formatValue(Math.round((parseFloat(this.user.balance) - 30.00) * 100) / 100)
            var hasPass = false;
            console.log(this.user)
            this.user.tickets.map((item) => {
                if (item.type == "Passe Navegante") {
                    hasPass = true;
                    //item.details = month[currentMonth].label;
                    if(day >= 26){
                        this.user.tickets.push({
                            type: "Passe Navegante",
                            quantity: "1",
                            details: this.formatPassDetails()
                        })
                    }
                }
            })
            if (!hasPass) {
                
                this.user.tickets.push({
                    type: "Passe Navegante",
                    quantity: "1",
                    details: this.formatPassDetails()
                })
            }
        }
    }

    
    formatPassDetails() {
        var date = new Date()
        var day = date.getDate();
        
        if(String(date.getMonth() + 1)  == 12){
            
            if (day >= 26){
                var currentMonth = 0;
            }
            else{
                var currentMonth = String(date.getMonth());
            }
        }
        else{
            if (day >= 26){
                var currentMonth = String(date.getMonth() + 1);
            }
            else{
                var currentMonth = String(date.getMonth());
            }
        }
        return month[currentMonth].label;        
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    modalButton() {
        this.toggleModal();
        this.props.navigation.popToTop();
    }

	async buy() {
        await this.transaction();
        if (this.state.success) {
            await this.updateUser();
            //this.props.navigation.popToTop();
        }
	}

    render() {
        const goodmessage1 = <Text style ={styles.title}>{"\n"}Compra Efetuada</Text>;
        const goodmessage2 = <Text style = {styles.innertext}> Boa Viagem! {"\n"} </Text>;
        const goodmessage3 = <Icon type='Ionicons' name='ios-checkmark-circle-outline' style={styles.buttonIcon} /> 

        const badmessage1 = <Text style ={styles.title}>{"\n"}Saldo insuficiente</Text>; 
        const badmessage2 = <Text style = {styles.innertext}>Para comprares o teu passe, carrega a tua conta com pelo menos {this.state.n}€! {"\n"} </Text>;
        const badmessage3 = <Icon type='Ionicons' name='ios-close-circle-outline' style={styles.buttonIcon2} />

        return (
            <View style={ styles.container }>
                <View style={ styles.logoContainer }>
                    <Image style={styles.logo} source={require('../Images/navegante.png')}/>
                </View>
                <Text style={ styles.description }>Recarregar para o mês de:</Text>
                <View style={ styles.monthContainer }>
                <Text style={ styles.month }>{this.formatPassDetails()}</Text>
                </View>
                <View style={ styles.amountContainer }>
                    <View style={ styles.halfAmountContainer }>
                        <Text style={ styles.description }>Montante:</Text>
                    </View>
                    <View style={ styles.halfAmountContainer }>
                        <Text style={ styles.input2 }>30.00</Text>
                        <Text style={ styles.input2 }>€</Text>
                    </View>
                </View>
                <View style={{ flex: 1}}>
                    <Modal isVisible={this.state.isModalVisible}  backdropOpacity = {0.6} >
                        <View style={styles.modall}>
                            {this.state.success ? goodmessage3 : badmessage3}
                            {this.state.success ? goodmessage1 : badmessage1}
                            {this.state.success ? goodmessage2 : badmessage2}
                            
                            <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                                    <Text style={styles.buttonText}>Ok</Text>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                </View>
                <View style={{position: 'absolute', top: responsiveHeight(67)}}>
                <TouchableHighlight style={styles.button} onPress={() => {this.buy(); this.toggleModal();}}>
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
        alignItems: 'center',
    },
    modall:{
        justifyContent: 'center',  
  alignItems: 'center',   
  backgroundColor : colors.background,   
  height: 300 ,  
  width: '80%',  
  borderRadius:10,    
  marginTop: 40,  
  marginLeft: 40,  
    }, 
        buttonIcon: {
        fontSize: responsiveFontSize(10),
        marginBottom: -10,
        justifyContent: 'flex-end',
        color: colors.primary,
    },
    buttonIcon2: {
        fontSize: responsiveFontSize(10),
        justifyContent: 'flex-end',
        marginBottom: -10,
        color: 'red',
    },
    logoContainer: {
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(5),
    },
    logo:{
        width: 290,
        height: responsiveHeight(20),
        resizeMode: 'contain',
        borderRadius: 5
    },
    monthContainer: {
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(10),
        width: 290,
        alignItems: 'center',
        justifyContent:'center'
    },
    month: {
        fontSize: responsiveFontSize(4.5),
    },
    title: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
    },
    innertext: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
    },
    input2:{
        fontSize: 20,
        color: colors.tertiary,
        textAlign: 'center'
    },
    amountContainer: {
        marginBottom: responsiveHeight(10),
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    halfAmountContainer: {
        width: responsiveWidth(20),
        height: responsiveHeight(3),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontSize: responsiveFontSize(2),
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
        button1: {
        height:55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:15,
        width:200,
        borderRadius:30,
        backgroundColor: colors.secondary,
    },
    buttonText: {
        color: colors.background,
        fontSize: responsiveFontSize(3),
    },
});