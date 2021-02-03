import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight
} from 'react-native';
import { Avatar } from "react-native-elements";
import { Card, CardItem, Text, Icon } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import colors from '../Styles/Color';


class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Perfil',
    };

    state = {
        name: '',
        balance: '',
        points: '',
    }

    async componentDidMount() {
        const currentUserEmail = await AsyncStorage.getItem('currentUser')
        const user = JSON.parse(await AsyncStorage.getItem(currentUserEmail))
        this.setState({
            name: user.name,
            balance: user.balance,
            points: user.points
        })
    }

    goToSaldoScreen() {
        this.props.navigation.navigate('Saldo');
    }
    goToPontosScreen() {
        this.props.navigation.navigate('Pontos');
    }

    goToLogin () {
        this.props.navigation.navigate('Login');
    }
    
    render() {
        return (
           <View style={styles.container}>
                <View style={{position: 'absolute', top: responsiveHeight(3), right: -10}}>
                    <TouchableHighlight style={styles.buttonlogout} onPress={() => this.goToLogin()}>
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableHighlight>
                </View> 
                 <Avatar rounded containerStyle={styles.avatar}
                 source={require('../Images/profile.jpeg')}
                                size={'xlarge'} showEditButton/>
                <Text style={styles.balanceText}>{this.state.name}</Text>
                <Card style={styles.card}>
                    <CardItem button style={styles.cardItem} onPress={() => this.goToSaldoScreen()}>
                        <Text style={styles.cardTitle}>Saldo: {this.state.balance}€</Text>
                        <Icon type='Ionicons' name='ios-arrow-forward' style={styles.buttonIcon} />
                    </CardItem>
                </Card>
                 <Card style={styles.card}>
                    <CardItem button style={styles.cardItem} onPress={() => this.goToPontosScreen()}>
                        <Text style={styles.cardTitle}>Pontos: {this.state.points}</Text>
                        <Icon type='Ionicons' name='ios-arrow-forward' style={styles.buttonIcon} />
                    </CardItem>
                </Card>
                <View style={styles.containerCards}>
                    <View style={styles.containerCardItem}>
                        <Card style={styles.cardRound}>
                            <CardItem button style={styles.cardItemRound}>
                                <Image style={styles.IconRound} source={require('../Images/leaf.png')}/>
                                <Text style={styles.cardRoundContent}>5%</Text>
                            </CardItem>
                        </Card>
                        <Text>CO2 </Text>
                        <Text>poupados</Text>
                    </View>
                    <View style={styles.containerCardItem}>
                        <Card style={styles.cardRound}>
                            <CardItem button style={styles.cardItemRound}>
                                <Image style={styles.IconRound} source={require('../Images/street.png')}/>
                                <Text style={styles.cardRoundContent}>20 km</Text>
                            </CardItem>
                        </Card>
                        <Text>Kms </Text>
                        <Text>feitos</Text>
                    </View>
                    <View style={styles.containerCardItem}>
                        <Card style={styles.cardRound}>
                            <CardItem button style={styles.cardItemRound}>
                                <Image style={styles.IconRoundEuro} source={require('../Images/euro.png')}/>
                                <Text style={styles.cardRoundContent}>VIVA</Text>
                            </CardItem>
                        </Card>
                        <Text>Descontos </Text>
                        <Text>VIVA</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    avatar:{
        marginTop: responsiveHeight(2)
    },
    containerCards:{
        width: responsiveWidth(80),
        justifyContent: 'space-between',
        flexDirection:'row',
        marginTop: responsiveHeight(3),
    },
    containerCardItem:{
       justifyContent: 'center',
       alignItems:'center',
       fontSize: responsiveFontSize(2),
    },
    balanceText:{
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        fontSize: responsiveFontSize(3),
    },
    card:{
        width: responsiveWidth(80),
        height: responsiveWidth(20),
        // marginTop: responsiveHeight(1),
        // marginBottom: responsiveHeight(1)
    },
    buttonIcon: {
        fontSize: responsiveFontSize(4.5),
        justifyContent: 'flex-end',
        color: colors.primary,
    },
    cardItem:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
            fontSize: responsiveFontSize(2.2),
            justifyContent:'center'
        },
    cardRound:{
        width: responsiveWidth(22),
        height: responsiveWidth(22),
        resizeMode: 'contain',
        justifyContent:'space-around',
        borderRadius:50,
    },
    IconRound: {
        height: responsiveWidth(5),
        width: responsiveWidth(5),
        resizeMode: 'contain',
        marginRight: responsiveWidth(1)
    },
    IconRoundEuro: {
        height: responsiveWidth(4),
        width: responsiveWidth(4),
        resizeMode: 'contain',
        marginRight: responsiveWidth(1)
    },
    cardItemRound:{
        justifyContent: 'center',
        height:'100%',
        borderRadius:50,
        backgroundColor: 'rgba(52, 52, 52, 0)',

    },
    buttonlogout : {
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:80,
        borderRadius:10,
        backgroundColor: colors.secondary,
    },
    buttonText: {
        color: colors.background,
        fontSize: responsiveFontSize(2.5),
    },
});

export default ProfileScreen;
