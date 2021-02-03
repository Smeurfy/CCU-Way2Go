import React, { version } from 'react';
import { Text, 
        View,
        StyleSheet,TouchableHighlight,
         } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper';
import {responsiveFontSize, responsiveWidth} from '../Libs/Dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import {Icon} from "native-base";
import colors from '../Styles/Color';

class RewardsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: "",
            promos: [],
            isModalVisible: false,
            free:false,
        }
        this.user={}
    }
    
    static navigationOptions = {
        title: 'Prémios',
      };

      async componentDidMount() {
        await this.getUser()
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getUser()
        });
        
    }

    displayButtons(){
        console.log(this.user.points + " user points")
        if(this.user.points >= 50){
            this.promoMetro = false;
        }
        else{
            this.promoMetro = true;
        }
    }

    componentWillUnount() {
        this.focusListener.remove();

    }

    async getUser() {
        try {
            const currentUserEmail = await AsyncStorage.getItem('currentUser')
            this.user = JSON.parse(await AsyncStorage.getItem(currentUserEmail))
            this.setState({
                points: this.user.points,
                promos: this.user.promos
            })
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
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    modalButton() {
        this.setState({ isModalVisible: false})
    }

    async completePromo(item){

        if(item === "promo1"){
            //alert("bilhete free")
            this.setState({ free: true})
            this.user.points = parseInt(this.user.points) - 50;
        }
        else if ( item === "promo2"){
            //alert("nice");
            this.user.points = parseInt(this.user.points) + 200;
        }
        let index = this.state.promos.findIndex((el) => el === item);
        this.state.promos.splice(index,1);
        this.setState({
            promos: this.state.promos
        })
        this.user.promos = this.state.promos;
        var hasMetroTickets = false;
        this.user.tickets.map((item) => {
            if (item.type == "Metro/Carris") {
                hasMetroTickets = true;
                item.quantity = parseInt(item.quantity) + 1;
            }
        })
        if (!hasMetroTickets) {
            this.user.tickets.push({
                type: "Metro/Carris",
                quantity: 1,
            })
        }
        console.log(this.user)

        await this.updateUser();
    }

    createPromos(prom)
    {
        if(this.state.promos != undefined)
        {

            for( let i = 0; i < this.state.promos.length; i++)
            {
                if(this.state.promos[i] === prom && prom ==="promo1")
                {  
                    return ( 
                            <View style={styles.card}>
                                <Text style={styles.cardtitle}>Bilhete Metro</Text>
                                <View style={{  borderBottomColor: 'white',
                                            //borderBottomWidth: 1,
                                            marginBottom: 20
                                        }}/>
                                <Paragraph style={styles.cardDescription}>Adquira um bilhete para o Metro utilizando os pontos acumulados.</Paragraph>
                                <View>
                                    <Button style={[styles.button, { backgroundColor: !this.promoMetro? colors.primary:colors.background }]} disabled={this.promoMetro} onPress={() => {this.completePromo("promo1"); this.toggleModal();}}>
                                        <Text style={[styles.textButton, {color: !this.promoMetro && colors.background}]}>50 Pontos</Text>
                                    </Button>
                                </View>
                            </View>            
                    );
                }
                if (this.state.promos[i] === prom && prom ==="promo2")
                {
                    return ( 
                            <View style={styles.card}>
                                <Text style={styles.cardtitle}>Bilhete CP</Text>
                                <View style={{  borderBottomColor: 'white',
                                            //borderBottomWidth: 1,
                                            marginBottom: 20
                                        }}/>
                                <Paragraph style={styles.cardDescription}>Adquira um bilhete para CP utilizando os pontos acumulados.</Paragraph>
                                <View>
                                    <Button style={[styles.button, { backgroundColor: !true? colors.primary:colors.background }]} disabled={true} onPress={() => alert(this.state.points)}>
                                        <Text style={[styles.textButton, {color: !true && colors.background}]}>300 Pontos</Text>
                                    </Button>
                                </View>
                            </View>            
                    );
                }
            }

        }
        
    }

    render() {

        const freemessage = <Text style = {styles.innertext}> Ganhaste um bilhete grátis! {"\n"} </Text>;
        const freetop = <Text style ={styles.title}>{"\n"}Parabéns</Text>;

        const goodmessage3 = <Icon type='Ionicons' name='ios-checkmark-circle-outline' style={styles.buttonIcon} />

        return (

            <View style={styles.container}>
                <View >
                    <Text style={styles.screenDescription}>Prémios disponíveis</Text>
                </View>
                {this.displayButtons()}
                {this.createPromos("promo1")}
                {this.createPromos("promo2")}

                <View style={{ flex: 1}}>
                    <Modal isVisible={this.state.isModalVisible}  backdropOpacity = {0.6} >
                        <View style={styles.modall}>
                                {this.state.free ? goodmessage3 : void 0}
                                {this.state.free ? freetop : void 0}
                                {this.state.free ? freemessage : void 0}
                                <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableHighlight>
                        </View>
                    </Modal>
                </View> 

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: colors.background,

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
    buttonText: {
        color: colors.background,
        fontSize: responsiveFontSize(3),
    },
    screenDescription:{
        fontSize: responsiveFontSize(3),
        textAlign: 'center',
        color: "black",
        marginTop: 35,
        marginBottom: 35,
    },
    card:{
        backgroundColor: colors.background,
        borderRadius: 15,
        borderColor: colors.primary,
        borderWidth: 2,
        width: responsiveWidth(85),
        alignSelf: "center",
        margin: 15
    },
    cardtitle:{
        marginLeft:10,
        fontSize: responsiveFontSize(2.5),
        // color: colors.primary,
        marginTop: 5,
        marginBottom: 5
    },
    cardDescription:{
        marginLeft: 10,
        marginBottom: 15,
        marginRight: 10,
        fontSize: 18,
        color: colors.primary
    },
    button:{
        borderColor: colors.primary,
        //backgroundColor: "limegreen",
        borderWidth: 2,
        borderRadius: 10,
        margin: 10,
        alignSelf: "flex-end",
    },
    textButton:{
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 15,
        // color: colors.tertiary
    }


});


export default RewardsScreen;