import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import styles from '../css/style'

class DetailsScreen extends Component {
    render() {
        return (
            <View style ={styles.titleee}>            
            <TouchableOpacity onPress={this._park} style ={styles.titlee}>
            <Text style={style.text}>
                จองที่จอด
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._profile} style ={styles.titlee}>
            <Text style={style.text}>
                โปรไฟล์
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._home} style={style.logout} >
                <Text style={style.text}>
                    Log Out
                </Text>
            </TouchableOpacity>     
            </View>
        );
    }
    _park=async()=>{
        this.props.navigation.navigate('Park')
    }
    _home=async()=>{
        this.props.navigation.navigate('Home')
    }
    _profile=async()=>{
        this.props.navigation.navigate('Profile',{ profiledata: this.props.route.params.profiledata })
    }
}

const style = StyleSheet.create({
    logout:{
        ...styles.titlee,
        backgroundColor:'grey',
    },
    text: {
        color:'#FFFFFF',
        fontSize:25
    }
})

export default DetailsScreen