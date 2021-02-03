import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  BackHandler,
  Alert,
  ImageBackground
} from 'react-native';
import { Icon } from "native-base";
import OfflineNotice from '../Libs/OfflineNotice';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from '../Libs/Dimensions';
import colors from '../Styles/Color';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isModalVisible: false,
      emailandpassworderror: false,
      
    }
  }

  passFromStorage = null;


  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    await this.getCurrentUser();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = async () => {
    return true;
  }

  goToLaunchScreen() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.props.navigation.navigate('Tabs');
  }

  goToSignUpScreen() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.props.navigation.navigate('SignUp');
  }

  async getCurrentUser() {
    const currentUserEmail = await AsyncStorage.getItem('currentUser')
    if (currentUserEmail != null) {
      const user = JSON.parse(await AsyncStorage.getItem(currentUserEmail))
      this.setState({
          email: user.email,
          password: user.password
      }, () => console.log(this.state.emailerror))
    }
  }

  async cleanCurrentUser() {
    await AsyncStorage.removeItem('currentUser')
  }

  async setCurrentUser() {
    await AsyncStorage.setItem('currentUser', this.state.email)
  }

  getPass = async() => {
    let a = JSON.parse(await AsyncStorage.getItem(this.state.email))
    if (this.state.email == undefined || this.state.email.trim() == '' || this.state.password == undefined || this.state.password.trim() == '') {
      this.setState({
          emailandpassworderror: true})
      
    }
    else if (a != null) {
      
      this.passFromStorage = a.password;
      //console.log("OLE a pass do ze " + this.passFromStorage);
      if(this.passFromStorage != this.state.password) {
        this.setState({
          emailandpassworderror: true})
      }
      else {
        await this.setCurrentUser()
        this.setState({
          emailandpassworderror: false})
        
      }
    }
    else {
      this.setState({
          emailandpassworderror: true})
    }
    
  }



  checkUser() {
    if(this.state != null) {
      this.getPass();
      
    }
    else {
      alert("Preencha os campos do email e password.");
    }
  }

  toggleModal = () => {
        //alert(this.state.emailandpassworderror);
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

  modalButton() {
        this.setState({ isModalVisible: false})
        //this.props.navigation.navigate('Login');
  }

  modalButton2() {
        this.setState({ isModalVisible: true})
        this.props.navigation.navigate('Tabs')
  }

  render() {

    const goodmessage1 = <Text style ={styles.title}>{"\n"}Login Efetuado</Text>;
    const goodmessage2 = <Text style = {styles.innertext}>Usa a nossa app! {"\n"} </Text>;
    const goodmessage3 = <Icon type='Ionicons' name='ios-checkmark-circle-outline' style={styles.buttonIcon} />

    const badmessage1 = <Text style ={styles.title}>{"\n"}Erro no Login</Text>; 

    const badmessage22 = <Text style = {styles.innertext}>Preenche o email e a password corretamente {"\n"} </Text>;

    const badmessage3 = <Icon type='Ionicons' name='ios-close-circle-outline' style={styles.buttonIcon2} />;

    return (

      <View style={styles.container}>
        <ImageBackground source={require('../Images/fundo.jpg')} imageStyle= 
{{opacity:0.1, marginTop: 50}} style={styles.backgroundImage}>

        <OfflineNotice/>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../Images/logo.png')}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              // placeholderTextColor = {colors.tertiary}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={[styles.inputContainer, {marginTop: 20}]}>
          <TextInput style={styles.inputs}
              placeholder="Palavra Passe"
              // placeholderTextColor = {colors.tertiary}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Esqueceu-se da palavra passe?</Text>
        </TouchableHighlight>

        <View style={{ flex: 1}}>
          <Modal isVisible={this.state.isModalVisible}  backdropOpacity = {0.6} >
            <View style={styles.modall}>
                {this.state.emailandpassworderror ? badmessage3 : goodmessage3}

                {this.state.emailandpassworderror ? badmessage1 : goodmessage1}

                {this.state.emailandpassworderror ? badmessage22 : goodmessage2}
             
                {this.state.emailandpassworderror ? 
                  <TouchableHighlight style={styles.button1} onPress={() => this.modalButton()}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableHighlight>  
              :
              <TouchableHighlight style={styles.button1} onPress={() => this.modalButton2()}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableHighlight>
              }

              
            </View>
          </Modal>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight style={[styles.button, styles.loginButton]} onPress={() => {this.checkUser(); this.toggleModal();}}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableHighlight>

          <Text style={styles.signUpText}>Não tens uma conta?
            <Text style ={{color: '#3D550C',fontWeight: 'bold'}} onPress={() => this.goToSignUpScreen()}>
              {' '}Registar
            </Text>
          </Text>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

//<TouchableHighlight style={[styles.button, styles.signUpButton]} onPress={() => this.goToSignUpScreen()}>
//            <Text style={styles.signUpText}>REGISTO</Text>
//          </TouchableHighlight>

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
    buttonText: {
        color: colors.background,
        fontSize: responsiveFontSize(3),
    },
  backgroundImage:{
    width: '100%',
    height: '88%',
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 50
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
      width:290,
      height:40,
      flexDirection: 'row',
      alignItems:'flex-start',
  },
  inputs:{
      fontSize: 20,
      flex:1,
      color: colors.tertiary,
      marginBottom: -20,
      textAlign: 'left'
  },
  forgotContainer: {
    width: 290,
    paddingTop: 10,
  },
  buttonContainer: {
    paddingTop: 40,
  },
  button: {
    height:55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:290,
    borderRadius:10,
  },
  loginButton: {
    backgroundColor: colors.secondary,
  },
  signUpButton: {
    backgroundColor: colors.tertiary,
  },
  forgotText: {
    color: colors.tertiary,
    textAlign: "right"
  },
  loginText: {
    color: colors.background,
    fontSize: responsiveFontSize(3),
  },
  signUpText: {
    paddingTop: 150,
    color: colors.tertiary,
    fontSize: responsiveFontSize(2),
    textAlign: 'center'
  }
});