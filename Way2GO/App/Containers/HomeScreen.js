import React, { Component } from 'react';
import {
    StyleSheet, 
    ScrollView,
    View,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Image
} from 'react-native';
import { Text, List, ListItem, Icon } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import colors from '../Styles/Color';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import Modal from "react-native-modal";
import { month } from '../Libs/Constants';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Bilhetes adquiridos',
    };

    constructor(props) {
        super(props);
        this.state = {
            balance: "",
            tickets: [],
            index: 0,
            isModalVisible: false,
        }
        this.goToQRScreen = this.goToQRScreen.bind(this)
        this._renderItem = this._renderItem.bind(this);
    }

    componentDidMount() {
        this.getUser()
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getUser()
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
            this.setState({
                balance: user.balance,
                tickets: user.tickets
            })
        }
        catch {
            // I did a doodoo
        }
    }

	goToCharge() {
		this.props.navigation.navigate('Charge');
    }

    goToLogin () {
        this.props.navigation.navigate('Login');
    }

    goToBuy() {
		this.props.navigation.navigate('Buy');
    }

    goToQRScreen(index) {
		this.props.navigation.navigate('QR', {
            index: index
        });
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    modalButton() {
        this.toggleModal();
        
    }

    _renderItem ({item, index}) {
        if (item.type == "Metro/Carris") {
            return (
                <View style={styles.slide_Metro}>
                    <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.logo_square} source={require('../Images/metro_logo.png')}/>
                        <View style={{height: responsiveHeight(10), alignContent: 'center', justifyContent: 'center'}}>
                            <Text style={styles.title}>{item.type}</Text>
                        </View>
                        </View>
                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.details}>Quantidade: {item.quantity}</Text>
                    </View>
                </View>
            );
        }
        else if (item.type == "CP") {
            return (
                <View style={styles.slide_CP}>
                    <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.logo_rect} source={require('../Images/cp_logo.png')}/>
                        <View style={{height: responsiveHeight(5), alignContent: 'center', justifyContent: 'center'}}>
                            <Text style={styles.title}>{item.details}</Text>
                        </View>
                        </View>
                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.details}>Quantidade: {item.quantity}</Text>
                    </View>
                </View>
            );
        }
        else if (item.type == "Passe Navegante") {
            
            const iconalert = <Icon type='MaterialCommunityIcons' name='clock-alert-outline' style={styles.buttonIcon} onPress={() => this.toggleModal()}/> 
            const iconalertred = <Icon type='MaterialCommunityIcons' name='clock-alert-outline' style={styles.buttonIconred} onPress={() => this.toggleModal()}/> 
            
            var date = new Date();
            var day = date.getDate();


            
            var datelastday = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var lastday = datelastday.getDate();
            var almost = lastday - day;

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
            var mo = month[currentMonth].label;
            

            //alert(month[currentMonth - 1].label);
            var m = currentMonth - 1
            var m1 = currentMonth;
            
            if(day == 1){

               //alert("do something");
               var i = parseInt(this.props.navigation.getParam('index', '0'))
               if(this.state.tickets[i].type != mo){
               if (this.state.tickets[i].quantity > 1) {
                    this.state.tickets[i].quantity = parseInt(this.state.tickets[i].quantity) - 1
                }
                else {
                    this.state.tickets.splice(i, 1)
                }
            }
                this.getUser();

            }

            
            const textalmost = <Text style={styles.innertext}>Recarrega o teu passe para o mês de {mo}{"\n"}Faltam {almost} dias para ficares sem passe! </Text>
            const textfew = <Text style={styles.innertext}>Já podes recarregar o teu passe para o mês de {mo}! </Text>

            return (
                
                <View style={styles.slide_Navegante}>
                    <View style={{position: "absolute", left: -60, top: -20}}>
                        <Image style={{opacity: 0.3, height: responsiveHeight(30), width: responsiveWidth(70), resizeMode: 'contain'}} source={require('../Images/viva_logo.png')}/>
                    </View>
                    
                    <View style={{flex: 0.5}}>
                            {date.getDate() >= 26 ? 
                                lastday == 31 ? 
                                    date.getDate() == 29 ? 
                                        iconalertred : iconalert : date.getDate() == 28 ? 
                                            iconalertred : iconalert : void 0
                            }
                    </View>
                    
                    <React.Fragment>
                    <View style={{ flex: 1}}>
                        <Modal isVisible={this.state.isModalVisible}  backdropOpacity = {0.1} >
                            <View style={styles.modall}>
                                {date.getDate() >= 26 ? 
                                    lastday == 31 ? 
                                        date.getDate() == 29 ? 
                                            textalmost : textfew : date.getDate() == 28 ? 
                                                textalmost : textfew : void 0
                                }

                                {date.getDate() >= 26 ? 
                                    lastday == 31 ? 
                                        date.getDate() == 29 ? 
                                            <TouchableHighlight style={styles.buttonn1} onPress={() => this.modalButton()}>
                                        <Text style={styles.buttonText}>OK</Text>
                                </TouchableHighlight> : 
                                            <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                                        <Text style={styles.buttonText}>OK</Text>
                                </TouchableHighlight> : date.getDate() == 28 ? 
                                                <TouchableHighlight style={styles.buttonn1} onPress={() => this.modalButton()}>
                                        <Text style={styles.buttonText}>OK</Text>
                                </TouchableHighlight> : <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                                        <Text style={styles.buttonText}>OK</Text>
                                </TouchableHighlight> : void 0
                                }
                                
                                
                                
                            </View>
                        </Modal>
                    </View>
                    </React.Fragment> 

                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.title}>{ item.type }</Text>
                    </View>
                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.details}>{item.details}</Text>
                    </View>
                    
                </View>


                
            );
        }
    
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.slideContainer}>
                        <TouchableWithoutFeedback onPress={() => this.goToCharge()}>
                            <View style={{width: responsiveWidth(100), marginTop: responsiveHeight(10), flexDirection: 'row'}}>
                                <View style={{width: responsiveWidth(25), justifyContent: 'center', alignItems: 'center'}}></View>
                                <View style={{width: responsiveWidth(50), justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.balanceText}>Saldo: {this.state.balance}€</Text>
                                </View>
                                <View style={{width: responsiveWidth(25), justifyContent: 'center'}}>
                                    <Icon type='Ionicons' name="ios-add-circle-outline" style={[{fontSize: responsiveFontSize(4.5), color: colors.primary }]} />   
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        {this.state.tickets != null && this.state.tickets.length > 0 ?
                        <View style={{marginTop: responsiveHeight(12), height: responsiveHeight(40)}}>
                            <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.state.tickets}
                            renderItem={this._renderItem}
                            sliderWidth={responsiveWidth(100)}
                            itemWidth={responsiveWidth(70)}
                            onSnapToItem={(index) => this.setState({ index }) }
                            />
                        </View>
                        :
                        <Text style={styles.ticketText}>Sem bilhetes disponíveis.</Text>}
                    </View>
                </View>
                {this.state.tickets != null && this.state.tickets.length > 0 ?
                <View style={{position: 'absolute', top: responsiveHeight(67)}}>
                    <TouchableHighlight style={styles.button} onPress={() => this.goToQRScreen(this.state.index)}>
                        <Text style={styles.buttonText}>UTILIZAR</Text>
                    </TouchableHighlight>
                </View>:
                <View style={{position: 'absolute', top: responsiveHeight(67)}}>
                    <TouchableHighlight style={styles.button} onPress={() => this.goToBuy()}>
                        <Text style={styles.buttonText}>COMPRAR</Text>
                    </TouchableHighlight>
                </View>
            }                
            </View>
        );
    }

    // LIST-STYLE RENDER
    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <View style={styles.content}>
    //                 <List style={styles.list}>
    //                     <ListItem itemDivider button style={styles.listItem} onPress={() => this.goToCharge()}>
    //                         <Text style={{fontSize: responsiveFontSize(2.5)}}>
    //                             Saldo: {this.state.balance}€
    //                         </Text>
    //                         <Icon name="ios-add" style={[styles.buttonIconAlt, {fontSize: responsiveFontSize(4.5), marginRight: responsiveWidth(1)}]} />   
    //                     </ListItem> 
    //                 </List>
    //                 {this.state.tickets != null && this.state.tickets.length > 0 ?
    //                 <View style={styles.slideContainer}>
    //                     <View style={{marginTop: responsiveHeight(20), height: responsiveHeight(40)}}>
    //                         <Carousel
    //                         ref={(c) => { this._carousel = c; }}
    //                         data={this.state.tickets}
    //                         renderItem={this._renderItem}
    //                         sliderWidth={responsiveWidth(100)}
    //                         itemWidth={290}
    //                         onSnapToItem={(index) => this.setState({ index }) }
    //                         />
    //                     </View>
    //                 </View>
    //                 :
    //                 <Text style={styles.ticketText}>Sem bilhetes disponíveis.</Text>}
    //             </View>
    //             {this.state.tickets != null && this.state.tickets.length > 0 ?
    //             <View style={{position: 'absolute', top: responsiveHeight(67)}}>
    //                 <TouchableHighlight style={styles.button} onPress={() => this.goToQRScreen(this.state.index)}>
    //                     <Text style={styles.buttonText}>UTILIZAR</Text>
    //                 </TouchableHighlight>
    //             </View>:
    //             <View style={{position: 'absolute', top: responsiveHeight(67)}}>
    //                 <TouchableHighlight style={styles.button} onPress={() => this.goToBuy()}>
    //                     <Text style={styles.buttonText}>COMPRAR</Text>
    //                 </TouchableHighlight>
    //             </View>                
    //             }
    //         </View>
    //     );
    // }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background,
    },
     modall:{
        justifyContent: 'center',  
        alignItems: 'center',   
        backgroundColor : colors.background,   
        height: 200 ,  
        width: '80%',  
        borderRadius:10,    
        marginTop: -110,  
        marginLeft: 40, 
        borderColor: colors.primary,
        borderWidth: 6,
    }, 
    title: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
    },
    innertext: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2.5),
    },
     button1: {
        height:55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:15,
        width:100,
        borderRadius:30,
        backgroundColor: colors.secondary,
    },
    buttonn1: {
        height:55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:15,
        width:100,
        borderRadius:30,
        backgroundColor: 'red',
    },
    buttonText: {
        color: colors.background,
        fontSize: responsiveFontSize(3),
    },
    buttonIcon: {
        fontSize: responsiveFontSize(5),
        marginBottom: -10,
        marginLeft: 245,
        justifyContent: 'flex-end',
        color: 'yellow',
    },
    buttonIconred: {
        fontSize: responsiveFontSize(5),
        marginBottom: -10,
        marginLeft: 245,
        justifyContent: 'flex-end',
        color: 'red',
    },
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list:{
        width: responsiveWidth(100),
        position: 'absolute',
        top: 0
    },
    listItem:{
        justifyContent: 'space-between',
    },
    balanceText:{
        fontSize: responsiveFontSize(3),
    },
    slideContainer: {
        flex: 1,
        alignItems: 'center'
    },
    slide_Navegante:{
        backgroundColor: colors.tertiary,
        height: responsiveHeight(25),
        borderRadius: 10
    },
    slide_CP:{
        backgroundColor: 'rgb(116, 183, 81)',
        height: responsiveHeight(25),
        borderRadius: 10
    },
    slide_Metro:{
        backgroundColor: 'rgb(44, 38, 100)',
        height: responsiveHeight(25),
        borderRadius: 10
    },
    logo_square:{
        width: responsiveWidth(30),
        height: responsiveHeight(10),
        resizeMode: 'contain'
    },
    logo_rect:{
        width: responsiveWidth(30),
        height: responsiveHeight(5),
        resizeMode: 'contain'
    },
    title: {
        color: 'white',
        fontSize: responsiveFontSize(2.5)
    },
    details: {
        color: 'lightgoldenrodyellow',
        fontSize: responsiveFontSize(2.3)
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
    buttonlogout : {
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:100,
        borderRadius:10,
        backgroundColor: colors.secondary,
    },
    buttonText: {
        color: colors.background,
        fontSize: responsiveFontSize(3),
    },
});

export default withNavigation(HomeScreen);

