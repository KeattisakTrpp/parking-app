import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import styles from '../css/style'
import DB from '../constance'

class SignupScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            name: '',
            surname: '',
            email: '',
            tel: '',
            cars: [{
                plate: '',
                color: '',
                brand: '',
            }],
        }
    }
    _submit = async () => {
        if(!this.checkEmail(this.state.email)) {
            console.warn('โปรดใส่อีเมล')
            return
        }
        console.log(this.state);
        axios.post(`${DB}/users/signup`, {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            cars: this.state.cars,
            tel: this.state.tel,
        }).then(response => {
            if(response.data === 'username is invalid') return alert('username is invalid')
            alert("กรุณาไปยืนยันตัวในอีเมล")
            this.props.navigation.navigate('Home')
        }).catch(error => {
            console.warn(error);
            alert("เกิดข้อผิดพลาด สมัครไม่สำเร็จ")
        })
    }
    checkEmail = (email) => {
        const regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        return regex.test(email)
    }
    render() {
        return (
            <ScrollView style={styles.reg}>
                <Text style={{ fontSize: 20, color:'#e94560', marginTop: 10, marginBottom: 5 }}>
                    ข้อมูลผู้ใช้
                </Text>
                <TextInput style={styles.inputt} placeholder="ชื่อบัญชีผู้ใช้" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next" onChangeText={(text) => {
                    this.setState({ username: text });
                }} />
                <TextInput style={styles.inputt} placeholder="รหัสผ่าน" placeholderTextColor='rgba(255,255,255,0.7)' secureTextEntry={true} returnKeyType="next" onChangeText={(text) => {
                    this.setState({ password: text });
                }} />
                <TextInput style={styles.inputt} placeholder="อีเมล" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next"  onChangeText={(text) => {
                    this.setState({ email: text });
                }} />
                <TextInput style={styles.inputt} placeholder="ชื่อ" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next" onChangeText={(text) => {
                    this.setState({ name: text });
                }} />
                <TextInput style={styles.inputt} placeholder="นามสกุล" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next" onChangeText={(text) => {
                    this.setState({ surname: text });
                }} />
                <TextInput style={styles.inputt} placeholder="เบอร์โทร" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next" onChangeText={(text) => {
                    this.setState({ tel: text });
                }} />
                <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 5, color:'#e94560' }}>
                    ข้อมูลรถ
                </Text>
                <View style={{ flex: 1}}>
                    {
                        this.state.cars.map((obj, i) => (
                            <View key={i} style={{marginTop: 10}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <TextInput style={{ ...styles.inputt, width: 50, height: 50, flex: 4 }} placeholder="ทะเบียน" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next"
                                        onChangeText={(text) => {
                                            const cars = [...this.state.cars]
                                            cars[i].plate = text
                                            this.setState({ cars });
                                        }} />
                                    <TouchableOpacity style={ i !== this.state.cars.length-1  ? { display: "none"} : "" }
                                        onPress={() => {
                                            const addedCar = [...this.state.cars, { plate: '', color: '', brand: '' }]
                                            this.setState({ cars: addedCar })
                                        }}>
                                        <Text style={styles.buttonText, { backgroundColor: "gold", width: 20, height: 20, paddingLeft: 5, marginTop: 15, }}>
                                            +
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={ i === 0 ? { display: "none"} : "" }
                                        onPress={() => {
                                            const cars = this.state.cars.filter((car, index) => index !== i)
                                            this.setState({ cars })
                                        }}>
                                        <Text style={styles.buttonText, { backgroundColor: "gold", width: 20, height: 20, paddingLeft: 5, marginTop: 15, }}>
                                            -
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <TextInput style={styles.inputt} placeholder="สีรถ" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next" onChangeText={(text) => {
                                    const cars = [...this.state.cars]
                                    cars[i].color = text
                                    this.setState({ cars });
                                }} />
                                <TextInput style={styles.inputt} placeholder="ยี่ห้อ" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next" onChangeText={(text) => {
                                    const cars = [...this.state.cars]
                                    cars[i].brand = text
                                    this.setState({ cars });
                                }} />
                            </View>
                        ))
                    }
                </View>
                <TouchableOpacity style={{...styles.buttonContainer, alignItems: 'center', marginBottom: 10 }}>
                    <Text style={styles.buttonText} onPress={this._submit}>
                        Enter
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

export default SignupScreen