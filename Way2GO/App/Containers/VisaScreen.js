import React from 'react';
import { Text, Image, View,TouchableHighlight, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../Styles/Color';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import { CreditCardInput, LiteCreditCardInput } from "react-native-input-credit-card";
import { formatValue } from '../Libs/AuxFunctions';
import Modal from "react-native-modal";
import { Icon } from "native-base";

class VisaScreen extends React.Component {
    static navigationOptions = {
        title: 'Visa',
	};

	constructor(props) {
        super(props);
        this.state = {
            useLiteCreditCardInput: false,
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
		this.transaction()
		await this.updateUser();
		//this.props.navigation.popToTop();
	}


    _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
    _onFocus = (field) => console.log("focusing", field);

	_setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });
	
    render() {
    	const goodmessage1 = <Text style ={styles.title}>{"\n"}Transferência efetuada</Text>;
        const goodmessage2 = <Text style = {styles.innertext}> Foram creditados {this.props.navigation.getParam('value', '0.00')}€ na tua conta! {"\n"} </Text>;
        const goodmessage3 = <Icon type='Ionicons' name='ios-checkmark-circle-outline' style={styles.buttonIcon} />
    
        const badmessage1 = <Text style ={styles.title}>{"\n"}Erro:</Text>; 
        const badmessage2 = <Text style = {styles.innertext}> Tenta outra vez! {"\n"} </Text>;
        const badmessage3 = <Icon type='Ionicons' name='ios-close-circle-outline' style={styles.buttonIcon2} />

        return (
            <View style={styles.container}>
                <Text style={styles.balanceText}>Pagar com Visa</Text>
                <View style={styles.cardView}>
                { this.state.useLiteCreditCardInput ?
		          (
		            <LiteCreditCardInput
		              autoFocus
		              inputStyle={styles.input}

		              validColor={"black"}
		              invalidColor={"red"}
		              placeholderColor={"darkgray"}

		              onFocus={this._onFocus}
		              onChange={this._onChange} />
		          ) : (
			            <CreditCardInput
			              

			              requiresCVC
			              
			              cardImageFront = {require('../Images/card3.png')}
			              cardImageBack	= {require('../Images/backcard3.png')}
			              //cardBrandIcons = 

			              labelStyle={styles.label}
			              inputStyle={styles.input}
			              validColor={"black"}
			              invalidColor={"red"}
			              placeholderColor={"darkgray"}

			              onFocus={this._onFocus}
			              onChange={this._onChange} />
			          )
        		}
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
		backgroundColor: "#F5F5F5",
		alignItems: 'center',
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
        marginBottom: -10,
        color: colors.primary,
    },
    buttonIcon2: {
        fontSize: responsiveFontSize(10),
        justifyContent: 'flex-end',
        marginBottom: -10,
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
	textInput: {
		borderColor: '#CCCCCC',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		height: 50,
		fontSize: 25,
		paddingLeft: 20,
		paddingRight: 20
	},
  	label: {
		color: "black",
		fontSize: 12,
	},
	input: {
		fontSize: 16,
		color: "black",
	},
	switch: {
		alignSelf: "center",
		marginTop: 10,
		marginBottom: 20,
	},
	cardView: {
		height: responsiveHeight(50)
	},
	buttonView: {
		height: responsiveHeight(20),
		justifyContent: "center"
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
  	balanceText:{
        paddingTop: responsiveHeight(4),
        paddingBottom: responsiveHeight(3),
        fontSize: responsiveFontSize(3),
        alignSelf: "center",
    },
});

export default VisaScreen;