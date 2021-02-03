import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { responsiveWidth } from '../Libs/Dimensions';
import colors from '../Styles/Color';


export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        setTimeout (() => {
            this.props.navigation.navigate('Login');
        }, 3000);
    }
    render () {
        return (
            <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                <Image style={styles.logo} source={require('../Images/logo.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.background
    },
    logo:{
        width: responsiveWidth(90),
        resizeMode: 'contain'
    },
});