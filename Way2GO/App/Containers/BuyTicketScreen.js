import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import { Container, Content, Card, CardItem, Right, Text, Icon, List, ListItem } from "native-base";
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../Styles/Color';
import { month } from '../Libs/Constants';

export default class BuyTicketScreen extends Component {
    static navigationOptions = {
        title: 'Comprar',
    };

    constructor(props) {
        super(props);
        this.state = {
            hasPassbefore: false,
        }
        this.user = {}
    }

    async componentDidMount() {
        await this.getUser()
        await this.transaction();
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
        
        console.log(this.user.tickets)        
        this.user.tickets.map((item) => {
            if (item.type == "Passe Navegante") {
                this.setState({hasPassbefore:true})
                //alert(this.user.tickets[i].quantity);

            }
        })
    }

    goToBuyCPTicketScreen() {
        this.props.navigation.navigate('BuyCPTicket');
    }

    goToBuyMetroTicketScreen() {
        this.props.navigation.navigate('BuyMetroTicket');
    }

    goToRechargePassScreen() {
        this.props.navigation.navigate('RechargePass');
    }

    fuc(){

        var date = new Date();
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
                        return mo = month[currentMonth].label;
    }

    render() {
        var date = new Date();
        var day = date.getDate();
        var i = parseInt(this.props.navigation.getParam('index', '0'))
        return (
            <Container>
                <Content>
                    <List style={styles.list}>
                        <ListItem itemDivider>
                            <Text>Comprar bilhete</Text>
                        </ListItem> 
                        <ListItem button style={styles.listItem} onPress={() => this.goToBuyCPTicketScreen()}>
                            <Text>CP</Text>
                            <Icon name="ios-arrow-forward" style={styles.buttonIcon} />
                        </ListItem>
                        <ListItem button style={styles.listItem} onPress={() => this.goToBuyMetroTicketScreen()}>
                            <Text>Metro</Text>
                            <Icon name="ios-arrow-forward" style={styles.buttonIcon} />
                        </ListItem>

                        {this.state.hasPassbefore ? 
                            day <= 26 ? void 0 :
                                        
                                        this.user.tickets[i].type == this.fuc() ? 
                                        
                                        void 0 : 
                                                    <React.Fragment>
                                                    <ListItem itemDivider>
                                                        <Text>Carregar passe</Text>
                                                    </ListItem>
                                                    
                                                    <ListItem button style={styles.listItem} onPress={() =>  this.goToRechargePassScreen() }>
                                                        <Text>Navegante</Text>
                                                        <Icon name="ios-arrow-forward" style={styles.buttonIcon} />
                                                    </ListItem>
                                                    </React.Fragment> :

                                                    <React.Fragment>
                                        <ListItem itemDivider>
                                            <Text>Carregar passe</Text>
                                        </ListItem>
                                        
                                        <ListItem button style={styles.listItem} onPress={() =>  this.goToRechargePassScreen() }>
                                            <Text>Navegante</Text>
                                            <Icon name="ios-arrow-forward" style={styles.buttonIcon} />
                                        </ListItem>
                                        </React.Fragment>
                        }



                    </List>
                </Content>
          </Container>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    trains:{
        height: responsiveHeight(35),
        width: responsiveWidth(100)
    },
    list:{
        marginTop: 1
    },
    buttonIcon: {
        color: colors.primary,
    },
    listItem:{
        justifyContent: 'space-between',
    },
});
