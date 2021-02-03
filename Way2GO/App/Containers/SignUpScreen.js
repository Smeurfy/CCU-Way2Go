import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';

import { Icon } from "native-base";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from '../Libs/Dimensions';
import OfflineNotice from '../Libs/OfflineNotice';
import colors from '../Styles/Color';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      email   : '',
      password: '',
      confirmPassword: "",
      sucess: true,
      isModalVisiblematch: false,
      isModalVisibleNP: false,
      isModalVisibleNE: false,
      isModalVisibleER: false,
      isModalVisibleNU: false,
      isModalVisibleS: false,
      passwordnomatch: false,
      nopassword: false,
      noemail: false,
      emailerror: false,
      nousername: false,
    }
  }

  componentDidMount() {
  }

  doVerifications() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state != null){
      if(this.state.user.trim() == ''){
        this.setState({
          nousername: true})
          this.toggleModalNU(); 
      }
    	if(this.state.password != this.state.confirmPassword){
          this.setState({
          passwordnomatch: true})
          this.toggleModalP(); 
          
    		
    	}

      if(this.state.password.trim() == ''){
          this.setState({
          nopassword: true})
          this.toggleModalNP(); 
        
      }

      if(this.state.email.trim() == '' ){
          this.setState({
          noemail: true})
          this.toggleModalNE(); 
        
      }

    	if(reg.test(this.state.email) === false || this.state.email == undefined){
          this.setState({
          emailerror: true})
          this.toggleModalER(); 
           
      }
  	else{
      
      let user = {
        name: this.state.user,
        email: this.state.email,
        password: this.state.password,
        tickets: [],
        transactions: [],
        points: '0',
        balance: '0.00',
        promos: ["promo1", "promo2"],
        challenge : ["ch1", "ch2"]
      }

  		AsyncStorage.setItem(this.state.email, JSON.stringify(user));
      this.toggleModalSucess();
  	}
  }
}

  toggleModalSucess = () => {
        
        this.setState({ isModalVisibleS: true});
        
        
    }; 
  toggleModalP = () => {
        this.setState({ isModalVisiblematch: !this.state.isModalVisiblematch });
        
        
    };

    toggleModalNP = () => {
        this.setState({ isModalVisibleNP: !this.state.isModalVisibleNP });
        
        
    };

    toggleModalNE = () => {
        this.setState({ isModalVisibleNE: !this.state.isModalVisibleNE });
        
        
    };
    toggleModalER = () => {
        this.setState({ isModalVisibleER: !this.state.isModalVisibleER });
        
        
    };

    toggleModalNU = () => {
        this.setState({ isModalVisibleNU: !this.state.isModalVisibleNU });
        
        
    };

    



  modalButton() {
        this.setState({ isModalVisiblematch: false})
        
        
  }

  modalButtonS() {
        this.props.navigation.navigate('Login');
        //this.setState({ isModalVisibleS: false})
  }

  modalButtonNP() {
        this.setState({ isModalVisibleNP: false})
  }

   modalButtonNE() {
        this.setState({ isModalVisibleNE: false})
  }

  modalButtonER() {
        this.setState({ isModalVisibleER: false})
  }

  modalButtonNU() {
        this.setState({ isModalVisibleNU: false})
  }

  render() {

    const goodmessage1 = <Text style ={styles.title}>{"\n"}Registo Efetuado</Text>;
    const goodmessage2 = <Text style = {styles.innertext}>Faz Login! {"\n"} </Text>;
    const goodmessage3 = <Icon type='Ionicons' name='ios-checkmark-circle-outline' style={styles.buttonIcon} />

    const badmessagenomatch = <Text style ={styles.title}>{"\n"}Erro no Registo</Text>; 

    const badmessagenomatch2 = <Text style = {styles.innertext}>As Passwords não são iguais {"\n"} </Text>;
    const badmessagenopass = <Text style = {styles.innertext}>Preenche o campo da password {"\n"} </Text>;
    const badmessagenoemail = <Text style = {styles.innertext}>Preenche o campo do email {"\n"} </Text>;
    const badmessagenoemailerror = <Text style = {styles.innertext}>Preenche o email corretamente {"\n"} </Text>;
    const badmessagenousername = <Text style = {styles.innertext}>Preenche o campo do Nome de Utilizador {"\n"} </Text>;

    const badmessage3 = <Icon type='Ionicons' name='ios-close-circle-outline' style={styles.buttonIcon2} />;

    return (

      <View style={styles.container}>
        <OfflineNotice/>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../Images/logo.png')}/>
        </View>

        <View style={[styles.inputContainer]}>
          <TextInput style={styles.input}
              placeholder="Nome de Utilizador"
              // placeholderTextColor = {colors.tertiary}
              underlineColorAndroid='transparent'
              onChangeText={(user) => this.setState({user})}/>
        </View>

        <View style={[styles.inputContainer, {marginTop: 20}]}>
          <TextInput style={styles.input}
              placeholder="Email"
              // placeholderTextColor = {colors.tertiary}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={[styles.inputContainer, {marginTop: 20}]}>
          <TextInput style={styles.input}
              placeholder="Palavra Passe"
              // placeholderTextColor = {colors.tertiary}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <View style={[styles.inputContainer, {marginTop: 20}]}>
          <TextInput style={styles.input}
              placeholder="Confirmar Palavra Passe"
              // placeholderTextColor = {colors.tertiary}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
        </View>



        <View style={{ flex: 1}}>

          <Modal isVisible={this.state.isModalVisibleS}  backdropOpacity = {0.6} >
            <View style={styles.modall}>
                 <Icon type='Ionicons' name='ios-checkmark-circle-outline' style={styles.buttoIcon} />
                 <Text style ={styles.title}>{"\n"}Registo Efetuado</Text>
                <Text style = {styles.innertext}>Faz Login! {"\n"} </Text>
               


                <TouchableHighlight style={styles.button1} onPress={() => this.modalButtonS()}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableHighlight>  
            </View>
          </Modal>

          <Modal isVisible={this.state.isModalVisiblematch}  backdropOpacity = {0.6} >
            <View style={styles.modall}>
                {this.state.passwordnomatch ? badmessage3 : goodmessage3}

                {this.state.passwordnomatch ? badmessagenomatch : goodmessage1}

                {this.state.passwordnomatch ? badmessagenomatch2 : goodmessage2}
             
                <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableHighlight>  
            </View>
          </Modal>

          <Modal isVisible={this.state.isModalVisibleNP}  backdropOpacity = {0.6} >
            <View style={styles.modall}>
                {this.state.nopassword ? badmessage3 : goodmessage3}

                {this.state.nopassword ? badmessagenomatch : goodmessage1}

                {this.state.nopassword ? badmessagenopass : goodmessage2}
             
                <TouchableHighlight style={styles.button1} onPress={() => this.modalButtonNP()}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableHighlight>  
            </View>
          </Modal>

          <Modal isVisible={this.state.isModalVisibleNE}  backdropOpacity = {0.6} >
            <View style={styles.modall}>
                {this.state.noemail ? badmessage3 : goodmessage3}

                {this.state.noemail ? badmessagenomatch : goodmessage1}

                {this.state.noemail ? badmessagenoemail : goodmessage2}
             
                <TouchableHighlight style={styles.button1} onPress={() => this.modalButtonNE()}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableHighlight>  
            </View>
          </Modal>

          <Modal isVisible={this.state.isModalVisibleER}  backdropOpacity = {0.6} >
            <View style={styles.modall}>
                {this.state.emailerror ? badmessage3 : goodmessage3}

                {this.state.emailerror ? badmessagenomatch : goodmessage1}

                {this.state.emailerror ? badmessagenoemailerror : goodmessage2}
             
                <TouchableHighlight style={styles.button1} onPress={() => this.modalButtonER()}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableHighlight>  
            </View>
          </Modal>

          <Modal isVisible={this.state.isModalVisibleNU}  backdropOpacity = {0.6} >
            <View style={styles.modall}>
                {this.state.nousername ? badmessage3 : goodmessage3}

                {this.state.nousername ? badmessagenomatch : goodmessage1}

                {this.state.nousername ? badmessagenousername : goodmessage2}
             
                <TouchableHighlight style={styles.button1} onPress={() => this.modalButtonNU()}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableHighlight>  
            </View>
          </Modal>

        </View>

        <View  style={styles.loginContainer}>
          <TouchableHighlight style={[styles.button, styles.signUpButton]} onPress={() => {this.doVerifications();}}>
            <Text style={styles.loginText}>Registar</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}




/*
<View style={styles.orLoginWithContainer}>
            <Text style={styles.orLoginWithText}>ou entrar com</Text>
        </View>
<View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <Icon type='Ionicons' name='logo-facebook' style={styles.buttonIcon} />
          </View>
          <View style={styles.buttonStyle}>
            <Icon type='Ionicons' name='logo-twitter' style={styles.buttonIcon} />
          </View>
          <View style={styles.buttonStyle}>
            <Icon type='Ionicons' name='logo-google' style={styles.buttonIcon} />
          </View>
        </View>*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    title2: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
    },
    buttoIcon: {
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
    buttonText: {
        color: colors.background,
        fontSize: responsiveFontSize(3),
    },
  logoContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 50,
  },
  logo:{
    width: 290,
    height: responsiveHeight(20),
    resizeMode: 'contain'
  },
  inputContainer: {
      borderBottomColor: colors.secondary,
      borderBottomWidth: 2,
      paddingBottom: 1,
      width:290,
      height:40,
      flexDirection: 'row',
      alignItems:'flex-start',
  },
  input:{
      fontSize: 20,
      flex:1,
      color: colors.tertiary,
      marginBottom: -20,
      textAlign: 'left'
  },
  orLoginWithContainer: {
    width: 290,
    paddingTop: 25,
  },
  buttonContainer: {
    width: responsiveWidth(60),
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingTop: 10
  },
  button: {
    height:55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30,
    width:290,
    borderRadius:10,
  },
    loginContainer: {
      paddingTop: 100
    },
  signUpButton: {
    backgroundColor: colors.secondary,
  },
  buttonStyle: {
    marginTop: 5,
    backgroundColor: colors.secondary,
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center" 
  },
  buttonIcon: {
    fontSize: responsiveFontSize(5),
    color: 'white'
  },
  orLoginWithText: {
    color: colors.tertiary,
    textAlign: "center"
  },
  loginText: {
    color: colors.background,
    fontSize: responsiveFontSize(3),
  },
});