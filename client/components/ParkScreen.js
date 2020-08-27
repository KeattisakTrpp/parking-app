import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from '../css/style'
import DB from '../constance'

const ParkScreen = () => {
    const user = useSelector(state => state.user)
    // const [state, setState] = useState({

    // })
    _submittime = async () => {
        console.log(user)
        // axios.post(`${DB}/time/addtime`, {
        //     date: this.state.date,
        //     timein: this.state.timein,
        //     timeout: this.state.timeout,
        // }).then(response => {
        //     console.warn(response.data);
        // }).catch(error => {
        //     console.warn(error);
        //     alert("error")
        // })
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#3498db'
        }}>
            <Text
                style={{
                    fontSize: 20,
                    marginTop: 20,
                }}>
                Current Date Time
            </Text>
            <Text
                style={{
                    fontSize: 20,
                    marginTop: 15,
                    marginBottom: 20
                }}>
                {/* {this.state.curdate} */}
            </Text>

            {/* <TextInput style={style.inputt} placeholder="Date" placeholderTextColor='#FFFFFF' returnKeyType="next" onChangeText={(text) => {
                this.setState({ date: text });
            }} />
            <TextInput style={style.inputt} placeholder="Time in" placeholderTextColor='#FFFFFF' returnKeyType="next" onChangeText={(text) => {
                this.setState({ timein: text });
            }} />
            <TextInput style={style.inputt} placeholder="Time out" placeholderTextColor='#FFFFFF' returnKeyType="next" onChangeText={(text) => {
                this.setState({ timeout: text });
            }} /> */}
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <Text style={styles.titlee} onPress={_submittime}>
                    Enter
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    inputt:{
        alignSelf:'stretch',
        height:40,
        marginBottom:15,
        color:'#FFF',
        borderBottomColor:'#FFFFFF',
        borderBottomWidth:1,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 15,
        fontSize: 20
    }
})

export default ParkScreen
