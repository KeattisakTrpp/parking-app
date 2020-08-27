import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useDispatch } from 'react-redux'
import { login } from '../action'
import styles from '../css/style'
import axios from 'axios'
import DB from '../constance'

const HomeScreen = ({ navigation }) => {
    const [state, setState] = useState({
        username:'',
        password:'',
    })

    const dispatch = useDispatch()

    _login = () => {
        axios.post(`${DB}/users/login`,{
            username:state.username,
            password:state.password
        }).then(response=>{
            if(response.data !== "wrong"){
                // clear data
                setState({ username: '', password: '' })
                const profiledata = response.data
                dispatch(login(profiledata))
                navigation.navigate('Details',{
                    screen: 'Profile',
                    params: { profiledata }
                })
            } else {
                alert("Wrong Password")
            }
        }).catch(error=>{
            console.warn(error); 
            // alert("ssss")
        })
    }
    _sign = () =>{
        navigation.navigate('Signup')
    }

    return(
        <KeyboardAvoidingView behavior="padding" style ={styles.lolo}>
        <View style ={styles.logoContainer}>
            <Text style={styles.title}>
                Welcome To My App
            </Text>
        </View>
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Username"
                placeholderTextColor='rgba(255,255,255,0.7)'
                returnKeyType="next"
                onSubmitEditing={()=> passwordInput.focus()}
                onChangeText={(text)=> setState({...state, username:text})}
                value={state.username}
            />
            <TextInput style={styles.input} ref={(input)=>passwordInput=input}
                placeholder="Password"
                placeholderTextColor='rgba(255,255,255,0.7)'
                returnKeyType="go"
                secureTextEntry={true}
                onChangeText={(text)=> setState({...state, password:text})}
                value={state.password}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={_login} >
                <Text style={styles.buttonText}>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={_sign} >
            <Text style={styles.buttonText}>
                Sign Up
            </Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}


export default HomeScreen
