import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
	TextInput,
    Button,
    TouchableHighlight,
    Alert
} from 'react-native';
import { Container, Content, Card, CardItem, Right, Text, Icon, List, ListItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import PickerSelect from 'react-native-picker-select';
import colors from '../Styles/Color';
import { Root, Popup } from 'popup-ui';
import { formatValue } from '../Libs/AuxFunctions';
import { quantity, zones } from '../Libs/Constants';
import Modal from "react-native-modal";

export default class BuyCPTicketScreen extends Component {
    static navigationOptions = {
        title: 'Comprar bilhete CP',
    };

    constructor(props) {
        super(props);
        this.state = {
            number: NaN,
            cost: '0.00',
            zones: NaN,
            success: false,
            isModalVisible: false,
            n: '0.00',
            nan:true,
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
        //alert(this.state.number);
        
        if (parseFloat(this.user.balance) < parseFloat(this.state.cost)) {
            //this.setState({success: true});
            if (!isNaN(this.state.number) && !isNaN(this.state.zones)) {
                const need = formatValue(Math.round((parseFloat(this.state.cost) - parseFloat(this.user.balance)) * 100) / 100);
                this.setState({n: need})
                this.setState({nan: false})
            }
            else{
                //alert("3");
                this.setState({success: false});
                this.setState({nan: true});
            }
            /*if (this.state.number == 1) {
                Alert.alert('Saldo insuficiente', 'Para comprares o teu bilhete de comboio, carrega a tua conta com pelo menos ' + need + '€!');
            }
            else {
                Alert.alert('Saldo insuficiente', 'Para comprares os teus bilhetes de comboio, carrega a tua conta com pelo menos ' + need + '€!');
            }*/
        }
        else {
            if (!isNaN(this.state.number) && !isNaN(this.state.zones)) {
                this.setState({success: true})
                this.setState({nan: false})
                this.user.balance = formatValue(Math.round((parseFloat(this.user.balance) - parseFloat(this.state.cost)) * 100) / 100)
                var hasCPZoneXTickets = false;
                console.log(this.user)
                this.user.tickets.map((item) => {
                    if (item.type == "CP" && item.details == this.formatTicketDetails()) {
                        hasCPZoneXTickets = true;
                        item.quantity = parseInt(item.quantity) + parseInt(this.state.number)
                        item.ticketsBought = parseInt(item.ticketsBought) + parseInt(this.state.number);
                    }
                })
                if (!hasCPZoneXTickets) {
                    this.user.tickets.push({
                        type: "CP",
                        quantity: this.state.number,
                        details: this.formatTicketDetails(),
                        ticketsBought: this.state.number
                    })
                }
            }
            else{
                //alert("3");
                this.setState({success: false});
                this.setState({nan: true});
            }
            
        }
    }

    updateCost() {
        if (!isNaN(this.state.number) && !isNaN(this.state.zones)) {
            console.log(parseInt())
            const cost_int = Math.round(parseInt(this.state.number) * parseInt(this.state.zones))/100;
            console.log(cost_int)
            this.setState({cost: formatValue(cost_int)})
        }
        else {
            this.setState({cost: "0.00"})
        }
    }

    formatTicketDetails() {
        if (this.state.number == "1") {
            return "Bilhete simples\n1 Zona"
        }
        else {
            return "Bilhete simples\n" + this.state.number + " Zonas";
        }
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    modalButton() {
        this.setState({ isModalVisible: true})
        this.props.navigation.popToTop();
    }

    modalButton2() {
        this.setState({ isModalVisible: false})
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

        const wrong = <Text style ={styles.title2}>{"\n"}Selecione um bilhete</Text>;
        const wrong2 = <Text style ={styles.innertext}> {"\n"} </Text>; 
        
        const badmessage1 = <Text style ={styles.title}>{"\n"}Saldo insuficiente</Text>; 
        const badmessage2 = <Text style = {styles.innertext}>Para comprares o teu bilhete de comboio, carrega a tua conta com pelo menos {this.state.n}€! {"\n"} </Text>;
        const badmessage21 = <Text style = {styles.innertext}>Para comprares os teus bilhetes de comboio, carrega a tua conta com pelo menos {this.state.n}€! {"\n"} </Text>;
        const badmessage3 = <Icon type='Ionicons' name='ios-close-circle-outline' style={styles.buttonIcon2} />
        return (
            <View style={ styles.container }>
                <View style={ styles.logoContainer }>
                    <Image style={styles.logo} source={require('../Images/cp_logo.png')}/>
                </View>
                <Text style={ styles.description }>Insira detalhes da compra:</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.pickerContainer}>
                        <PickerSelect
                            selectedValue = {this.state.number}
                            placeholder={{label:'Quantidade'}}
                            placeholderTextColor="black"
                            onValueChange={itemValue => this.setState({ number: itemValue }, () => this.updateCost())}
                            items={quantity}
                        />
                    </View>
                    <View style={styles.pickerContainer}>
                        <PickerSelect
                            selectedValue={this.state.zones}
                            placeholder={{label:'Zonas'}}
                            placeholderTextColor="black"
                            onValueChange={itemValue => this.setState({ zones: itemValue }, () => this.updateCost())}
                            items={zones}
                        />
                    </View>
                </View>
                <View style={ styles.amountContainer }>
                    <View style={ styles.halfAmountContainer }>
                        <Text style={ styles.description }>Montante:</Text>
                    </View>
                    <View style={ styles.halfAmountContainer }>
                        <Text style={ styles.input2 }>{this.state.cost}</Text>
                        <Text style={ styles.input2 }>€</Text>
                    </View>
                </View>
                <View style={{ flex: 1}}>
                    <Modal isVisible={this.state.isModalVisible}  backdropOpacity = {0.6} >
                        <View style={styles.modall}>
                            {this.state.success ? goodmessage3 : badmessage3}
                            {this.state.success ? goodmessage1 : this.state.nan ? wrong : badmessage1}
                            {this.state.success ? goodmessage2 : this.state.nan ? wrong2 : this.state.number > 1 ? badmessage21:badmessage2}
                            {this.state.success ? 
                                <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableHighlight> : 

                                this.state.nan ? 

                                <TouchableHighlight style={styles.button1} onPress={() => this.modalButton2()}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableHighlight> :

                                <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableHighlight>
                            }

                        </View>
                    </Modal>
                </View>
                <View style={{position: 'absolute', top: responsiveHeight(67)}}>
                    <TouchableHighlight style={styles.button} onPress={() => {this.buy(); this.toggleModal();}}>
                        <Text style={styles.buttonText}>COMPRAR</Text>
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
    title: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
    },
    buttonIcon: {
        fontSize: responsiveFontSize(10),
        justifyContent: 'flex-end',
        marginBottom: -10,
        color: colors.primary,
    },
    buttonIcon2: {
        fontSize: responsiveFontSize(10),
        justifyContent: 'flex-end',
        marginBottom: -10,
        color: 'red',
    },
    title2: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
    },
    innertext: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2),

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
    logoContainer: {
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(5),
    },
    logo:{
        width: 290,
        height: responsiveHeight(20),
        resizeMode: 'contain'
    },
    inputContainer: {
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(10),
        width: '90%',
        flexDirection:"row",
        justifyContent:'space-between'
    },
    pickerContainer: {
        width:"45%",
        borderBottomColor: colors.primary,
        borderBottomWidth: 2
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
    balanceText:{
        paddingTop: responsiveHeight(4),
        paddingBottom: responsiveHeight(3),
        fontSize: responsiveFontSize(3),
        alignSelf: "center",
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