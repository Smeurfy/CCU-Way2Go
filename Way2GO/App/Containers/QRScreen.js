import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
	TextInput,
    Button,
    TouchableHighlight
} from 'react-native';
import { Container, Content, Card, CardItem, Right, Text, Icon, List, ListItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import colors from '../Styles/Color';
import { Root, Popup } from 'popup-ui';

export default class QRScreen extends Component {
    static navigationOptions = {
        title: 'QR Code',
    };

    constructor(props) {
        super(props);
        this.state = {
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
    
    async subtractTicket() {
        var index = parseInt(this.props.navigation.getParam('index', '0'))
        try {
            if (this.user.tickets[index].type != "Passe Navegante") {
                if (this.user.tickets[index].quantity > 1) {
                    this.user.tickets[index].quantity = parseInt(this.user.tickets[index].quantity) - 1
                }
                else {
                    this.user.tickets.splice(index, 1)
                }
                await this.updateUser()
            }
        } catch(e) {
          // error reading value
        }
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text style={styles.balanceText}>Utilizar QR Code</Text>
                <Text style={ styles.description }>Passe este QR code pelo sensor:</Text>
                <View style={ styles.qrContainer }>
                <Image style={styles.qr} source={require('../Images/qr_code.png')}/>
                </View>
                <View style={{position: 'absolute', top: responsiveHeight(67)}}>
                    <TouchableHighlight style={styles.button} onPress={() => this.subtractTicket()}>
                        <Text style={styles.buttonText}>UTILIZADO</Text>
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
    qrContainer: {
        marginBottom: responsiveHeight(5),
    },
    qr:{
        width: 290,
        height: responsiveHeight(40),
        resizeMode: 'contain'
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
