import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
	TextInput,
    Button,
    Alert,
    TouchableHighlight,
    KeyboardAvoidingView
} from 'react-native';
import { Container, Content, Card, CardItem, Right, Text, Icon, List, ListItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import colors from '../Styles/Color';
import { formatValue, handlePhone } from '../Libs/AuxFunctions';
import Modal from "react-native-modal";

export default class MbWayScreen extends Component {
    static navigationOptions = {
        title: 'MBWay',
    };

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            isModalVisible: false,
            success: false,
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
        }
        catch {
            // I did a doodoo
        }
    }

    transaction() {
        this.user.balance = formatValue(Math.round((parseFloat(this.user.balance) + parseFloat(this.props.navigation.getParam('value', '0.00'))) * 100) / 100)
        this.setState({ success: true });
        //Alert.alert('Transferência efetuada', 'Foram creditados ' + this.props.navigation.getParam('value', '0.00') + '€ na tua conta.');
	}

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    modalButton() {
        this.toggleModal();
        this.props.navigation.popToTop();
    }

	async pay() {
        // if (this.state.number.length == 9) {
            this.transaction()
            await this.updateUser();
            //this.props.navigation.popToTop();
        // }
	}

    render() {
        const goodmessage1 = <Text style ={styles.title}>{"\n"}Transferência efetuada</Text>;
        const goodmessage2 = <Text style = {styles.innertext}> Foram creditados {this.props.navigation.getParam('value', '0.00')}€ na tua conta! {"\n"} </Text>;
        const goodmessage3 = <Icon type='Ionicons' name='ios-checkmark-circle-outline' style={styles.buttonIcon} /> 

        const badmessage1 = <Text style ={styles.title}>{"\n"}Erro:</Text>; 
        const badmessage2 = <Text style = {styles.innertext}> Tenta outra vez! {"\n"} </Text>;
        const badmessage3 = <Icon type='Ionicons' name='ios-close-circle-outline' style={styles.buttonIcon2} />

        return (
            <View style={[styles.container, styles.innerContainer]}>
                <KeyboardAvoidingView enabled behavior="position" style={ styles.container } contentContainerStyle={ styles.innerContainer }>
                    <Text style={styles.balanceText}>Pagar com MBWay</Text>
                    <View style={ styles.logoContainer }>
                        <Image style={styles.logo} source={require('../Images/mbway_logo.png')}/>
                    </View>
                    <Text style={ styles.description }>Insira o seu número de telemóvel:</Text>
                    <View style={ styles.inputContainer }>
                        <TextInput style={styles.input}
                                placeholder="Insira o seu número"
                                // placeholderTextColor = {colors.tertiary}
                                keyboardType="numeric"
                                underlineColorAndroid='transparent'
                                onChangeText={(value) => this.setState({number: handlePhone(value)})}
                                value={ this.state.number }/>
                    </View>

                <View style={{ flex: 1}}>
                    <Modal isVisible={this.state.isModalVisible}  backdropOpacity = {0.6} >
                        <View style={styles.modall}>
                            {this.state.success ? goodmessage3 : badmessage3}
                            {this.state.success ? goodmessage1 : badmessage1}
                            {this.state.success ? goodmessage2 : badmessage2}
                            <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                                    <Text style={styles.buttonText}>OK</Text>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                </View>
                </KeyboardAvoidingView>
                
                <View style={{position: 'absolute', top: responsiveHeight(67)}}>
                    <TouchableHighlight style={styles.button} onPress={() => {this.pay(); this.toggleModal();}}>
                        <Text style={styles.buttonText}>PAGAR</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    innertext: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
    },
    buttonIcon: {
        fontSize: responsiveFontSize(10),
        justifyContent: 'flex-end',
        color: colors.primary,
    },
    buttonIcon2: {
        fontSize: responsiveFontSize(10),
        justifyContent: 'flex-end',
        color: 'red',
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
    innerContainer: {
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: responsiveHeight(5),
    },
    logo:{
        width: 290,
        height: responsiveHeight(20),
        resizeMode: 'contain'
    },
    inputContainer: {
        borderBottomColor: colors.secondary,
        borderBottomWidth: 2,
        paddingBottom: 2,
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(10),
        width:290,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
    },
    input:{
        fontSize: 20,
        flex:1,
        color: colors.tertiary,
        marginBottom: -20,
        textAlign: 'center'
    },
    description: {
        fontSize: responsiveFontSize(2),
        marginTop: responsiveHeight(5)
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
