import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
} from 'react-native';
import { Container, Content, Card, CardItem, Text, Icon, List, ListItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import colors from '../Styles/Color';
import { withNavigation } from 'react-navigation';


class BuyScreen extends React.Component {
    static navigationOptions = {
        title: 'Comprar',
    };

    constructor(props) {
        super(props);
        this.state = {
            balance: '',
        }
    }

    componentDidMount() {
        this.getUser();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getUser();
        });
    }

    componentWillUnount() {
        this.focusListener.remove();
    }

    async getUser() {
        try {
            const currentUserEmail = await AsyncStorage.getItem('currentUser')
            const user = JSON.parse(await AsyncStorage.getItem(currentUserEmail))
            console.log(user)
            //alert(user);
            this.setState({
                balance: user.balance,
            })
            
        }
        catch {
            // I did a doodoo
        }
    }

    goToChargeScreen() {
        this.props.navigation.navigate('Charge');
    }

    goToBuyTicketScreen() {
        this.props.navigation.navigate('BuyTicket');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.trains} source={require('../Images/Comboios.png')}/>
                <Text style={styles.balanceText}>Saldo: {this.state.balance}€</Text>
                    <Card style={styles.card}>
                        <CardItem button style={styles.cardItem} onPress={() => this.goToBuyTicketScreen()}>
                            <Text style={styles.cardTitle}>Comprar</Text>
                            <Icon type='Ionicons' name='ios-arrow-forward' style={styles.buttonIcon} />
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem button style={styles.cardItem} onPress={() => this.goToChargeScreen()}>
                            <Text style={styles.cardTitle}>Carregar conta</Text>
                            <Icon type='Ionicons' name='ios-arrow-forward' style={styles.buttonIcon} />
                        </CardItem>
                    </Card>
            </View>
        );
    }

    // LIST-STYLE RENDER
    // render() {
    //     return (
    //         <Container>
    //             <Content>
    //                 <Image style={styles.trains} source={require('../Images/Comboios.png')}/>
    //                 <List>
    //                     <ListItem itemDivider button style={styles.listItem} onPress={() => this.goToChargeScreen()}>
    //                         <Text style={{fontSize: responsiveFontSize(2.5)}}>
    //                             Saldo: {this.state.balance}€
    //                         </Text>
    //                         <Icon name="ios-add" style={[styles.buttonIconAlt, {fontSize: responsiveFontSize(4.5), marginRight: responsiveWidth(1)}]} />
    //                     </ListItem> 
    //                     <ListItem button style={styles.listItem} onPress={() => this.goToBuyTicketScreen()}>
    //                         <Text>Comprar</Text>
    //                         <Icon name="ios-arrow-forward" style={styles.buttonIconAlt} />
    //                     </ListItem>
    //                     <ListItem button style={styles.listItem} onPress={() => this.goToChargeScreen()}>
    //                         <Text>Carregar conta</Text>
    //                         <Icon name="ios-arrow-forward" style={styles.buttonIconAlt} />
    //                     </ListItem>
    //                 </List>
    //             </Content>
    //         </Container>
    //     );
    // }
}


const styles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    trains:{
        height: responsiveHeight(40),
        width: responsiveWidth(100)
    },
    balanceText:{
        paddingTop: responsiveHeight(4),
        paddingBottom: responsiveHeight(3),
        fontSize: responsiveFontSize(3),
    },
    listItem:{
        justifyContent: 'space-between',
    },
    card:{
        width: responsiveWidth(80),
        height: responsiveWidth(20),
    },
    buttonIcon: {
        fontSize: responsiveFontSize(4.5),
        justifyContent: 'flex-end',
        color: colors.primary,
    },
    buttonIconAlt: {
        color: colors.primary,
    },
    cardItem:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: responsiveFontSize(2.2),
    },
});

export default withNavigation(BuyScreen);

