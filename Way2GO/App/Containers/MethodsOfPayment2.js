import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import { Container, Content, Card, CardItem, Right, Text, Icon, List, ListItem } from "native-base";
import { responsiveWidth, responsiveFontSize, responsiveHeight } from '../Libs/Dimensions';
import colors from '../Styles/Color';

export default class MethodsOfPayment extends Component {
    static navigationOptions = {
        title: 'Métodos de Pagamento',
    };

    constructor(props) {
        super(props);
        this.state = {
        }
    }

	goToMBWayScreen() {
        this.props.navigation.navigate('MBWay', {
            value: this.props.navigation.getParam('value', '0.00')
        });
    }

	goToVisaScreen() {
        this.props.navigation.navigate('Visa', {
            value: this.props.navigation.getParam('value', '0.00')
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <List style={styles.list}>
                        <ListItem button style={styles.listItem} onPress={() => this.goToMBWayScreen()}>
                            <Text>MBWay</Text>
                            <Icon name="ios-arrow-forward" style={styles.buttonIcon} />
                        </ListItem>
                        <ListItem button style={styles.listItem} onPress={() => this.goToVisaScreen()}>
                            <Text>Visa/MasterCard</Text>
                            <Icon name="ios-arrow-forward" style={styles.buttonIcon} />
                        </ListItem>
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
