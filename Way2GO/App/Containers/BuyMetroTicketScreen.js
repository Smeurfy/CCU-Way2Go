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
import { quantity } from '../Libs/Constants';
import Modal from "react-native-modal";

export default class BuyMetroTicketScreen extends Component {
    static navigationOptions = {
        title: 'Comprar bilhete Metro',
    };

    constructor(props) {
        super(props);
        this.state = {
            number: NaN,
            cost: '0.00',
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

        if (parseFloat(this.user.balance) < parseFloat(this.state.cost)) {
            if (!isNaN(this.state.number)) {
                this.setState({success: false});
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
                Alert.alert('Saldo insuficiente', 'Para comprares o teu bilhete de metro, carrega a tua conta com pelo menos ' + need + '€!');
            }
            else {
                Alert.alert('Saldo insuficiente', 'Para comprares os teus bilhetes de metro, carrega a tua conta com pelo menos ' + need + '€!');
            }*/
        }
        else {
            if (!isNaN(this.state.number)) {
                this.setState({success: true});
                this.setState({nan: false});
                this.user.balance = formatValue(Math.round((parseFloat(this.user.balance) - parseFloat(this.state.cost)) * 100) / 100)
                var hasMetroTickets = false;
                console.log(this.user)
                this.user.tickets.map((item) => {
                    if (item.type == "Metro/Carris") {
                        hasMetroTickets = true;
                        item.quantity = parseInt(item.quantity) + parseInt(this.state.number);
                        item.ticketsBought = parseInt(item.ticketsBought) + parseInt(this.state.number);
                    }
                })
                if (!hasMetroTickets) {
                    this.user.tickets.push({
                        type: "Metro/Carris",
                        quantity: this.state.number,
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
        if (!isNaN(this.state.number)) {
            const cost_int = Math.round(parseInt(this.state.number) * 140)/100;
            this.setState({cost: formatValue(cost_int)})
        }
        else {
            this.setState({cost: "0.00"})
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
        const wrong2 = <Text style ={styles.innertext}></Text>; 
         
        const badmessage1 = <Text style ={styles.title}>{"\n"}Saldo insuficiente</Text>; 
        const badmessage2 = <Text style = {styles.innertext}>Para comprares o teu bilhete de metro, carrega a tua conta com pelo menos {this.state.n}€! {"\n"} </Text>;
        const badmessage21 = <Text style = {styles.innertext}>Para comprares os teus bilhetes de metro, carrega a tua conta com pelo menos {this.state.n}€! {"\n"} </Text>;
        const badmessage3 = <Icon type='Ionicons' name='ios-close-circle-outline' style={styles.buttonIcon2} />

        return (
            <View style={ styles.container }>
                <View style={ styles.logoContainer }>
                    <Image style={styles.logo} source={require('../Images/metro_logo.png')}/>
                </View>
                <Text style={ styles.description }>Insira detalhes da compra:</Text>
                <View style={ styles.inputContainer }>
                    <PickerSelect
                        selectedValue = {this.state.number}
                        placeholder={{label:'Quantidade'}}
                        placeholderTextColor="black"
                        onValueChange={itemValue => this.setState({ number: itemValue }, () => this.updateCost())}
                        items={ quantity }
                    />
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
    title2: {
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
        width: 290,
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