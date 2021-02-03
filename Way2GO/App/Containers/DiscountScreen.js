import React from 'react';
import { Text, 
    View,
    StyleSheet,
    TouchableHighlight,
     } from 'react-native'; 
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper';
import {responsiveFontSize, responsiveWidth} from '../Libs/Dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import {Icon} from "native-base";
import colors from '../Styles/Color';


class DiscountScreen extends React.Component {
    static navigationOptions = {
        title: 'Desafios',
      };
      constructor(props) {
        super(props);
        this.state = {
            points: "",
            tickets: [],
            challenges: [],
            isModalVisible: false,
            isModalVisible2: false,
            ch1:false,
            ch2:false,
        }

        this.user = {}
    }
    async componentDidMount() {
        await this.getUser()
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getUser()
        });
    }

    displayButtons(){
    	
        if(this.state.tickets.length == 0){
        	
            this.chanMetro = true;
            this.chanC = true;
        }
        else{
       
            for( const [index,value] of this.state.tickets.entries()){

                if(value.type === "Metro/Carris" && value.ticketsBought >= 5 && this.state.challenges.indexOf('ch1') > -1){
                    this.chanMetro = false;
                    if(value.type === "CP" && value.quantity >= 5){
            			this.chanC = false;
                	}
                	else{
                		this.chanC = true;
                	}

                }
                else{
                    
                    if(value.type === "CP" && value.quantity >= 5 && this.state.challenges.indexOf('ch2') > -1){
                    	
            			this.chanC = false;
            			this.chanMetro = true;
                	}
            
                }
            }
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
                tickets: this.user.tickets,
                challenges: this.user.challenge
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
            console.log(this.user) 
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

    toggleModal2 = () => {
        this.setState({ isModalVisible2: !this.state.isModalVisible2 });
    };

    modalButton2() {
        this.setState({ isModalVisible2: false})
    }

    async completeChallenge(item){
    	
        if(item === "ch1"){
            //alert("Boa mpt. Ganhas te 50 pontos")
            this.setState({ ch1: true})
            this.user.points = parseInt(this.user.points) + 50;
        }
        if ( item === "ch2"){
            //alert("Boa. 100 pontos");
            this.setState({ ch2: true})

            this.user.points = parseInt(this.user.points) + 100;
        }
        let index = this.state.challenges.findIndex((el) => el === item);
        this.state.challenges.splice(index,1);
        this.setState({
            challenges: this.state.challenges
        })
        this.user.challenge = this.state.challenges;  
        await this.updateUser();
    }

    createChallenge(chall){

        for(let i = 0; i < this.state.challenges.length; i++){
            if(this.state.challenges[i] === "ch1" && chall === "ch1"){
            
                return (
                    <View style={styles.card}>
                        <Text style={styles.cardtitle}>Metro - Desafio dos 5 bilhetes</Text>
                        <View style={{  borderBottomColor: colors.background,
                                // borderBottomWidth: 1,
                                marginBottom: 20
                            }}/>
                        <Paragraph style={styles.cardDescription}>Compre 5 bilhetes de metro para ganhar 50 Pontos!</Paragraph>
                        <View>
                            <Button style={[styles.button, { backgroundColor: !this.chanMetro? colors.primary:colors.background }]} disabled={this.chanMetro} onPress={() => {this.completeChallenge("ch1");this.toggleModal();}}>
                                <Text style={[styles.textButton, {color: !this.chanMetro && colors.background}]}>Completar</Text>
                            </Button>
                        </View>
                    </View>
                );
            }
            else if(this.state.challenges[i] === "ch2" && chall === "ch2"){
            	
                return (
                    <View style={styles.card}>
                        <Title style={styles.cardtitle}>CP - Desafio dos 5 bilhetes</Title>
                        <View style={{  borderBottomColor: colors.background,
                                // borderBottomWidth: 1,
                                marginBottom: 20
                            }}/>
                        <Paragraph style={styles.cardDescription}>Compre 5 bilhetes CP para ganhar 200 Pontos!</Paragraph>
                        <View>
                            <Button style={[styles.button, { backgroundColor: !this.chanC? colors.primary:colors.background }]} disabled={this.chanC} onPress={() => {this.completeChallenge("ch2");this.toggleModal2();}}>
                                <Text style={[styles.textButton, {color: !this.chanC && colors.background}]}>Completar</Text>
                            </Button>
                        </View>
                    </View>
                );
            }
        }
        
        
    }

    render() {
    	const ch1message = <Text style = {styles.innertext}> Ganhaste 50 pontos! {"\n"} </Text>;
    	const ch2message = <Text style = {styles.innertext}> Ganhaste 100 pontos! {"\n"} </Text>;
    	const chtop = <Text style ={styles.title}>{"\n"}Parabéns</Text>;

    	const goodmessage3 = <Icon type='Ionicons' name='ios-checkmark-circle-outline' style={styles.buttonIcon} />
        return (
            <View style={styles.container}>
                <View >
                    <Text style={styles.screenDescription}>Desafios disponíveis</Text>
                </View>
                {this.displayButtons()}
                {this.createChallenge("ch1")}
                {this.createChallenge("ch2")}    
                                    

                <View style={{ flex: 1}}>
                    <Modal isVisible={this.state.isModalVisible}  backdropOpacity = {0.6} >
                        <View style={styles.modall}>
                        		{this.state.ch1 ? goodmessage3 : void 0}
                        		{this.state.ch1 ? chtop : void 0}
                        		{this.state.ch1 ? ch1message : void 0}
                                <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableHighlight>
                        </View>
                    </Modal>
                </View> 

                               <View style={{ flex: 1}}>
                    <Modal isVisible={this.state.isModalVisible2}  backdropOpacity = {0.6} >
                        <View style={styles.modall}>
                        		{this.state.ch2 ? goodmessage3 : void 0}
                        		{this.state.ch2 ? chtop : void 0}
                        		{this.state.ch2 ? ch2message : void 0}
                                <TouchableHighlight style={styles.button1} onPress={() => this.modalButton2()}>
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
        fontSize: 15
    }


});

export default DiscountScreen;

