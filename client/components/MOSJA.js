import React from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import SignupScreen from './SignupScreen'
import ParkScreen from './ParkScreen'
import ProfileScreen from './ProfileScreen'
import HistoryScreen from './HistoryScreen'
import ScheduleScreen from './ScheduleScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Appearance } from 'react-native'
import { Text, TouchableOpacity, StyleSheet, SectionList, View, TextInput, Modal, Button } from 'react-native'
import axios from 'axios'
import DB from '../constance'
import styles from '../css/style'
import { addCar } from '../action'




const MOSJA = ({ navigation }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const profile = () => {
        navigation.navigate('Profile', { profiledata: user })
    }
    const park = () => {
        navigation.navigate('Park')
    }
    const schedule = () => {
        navigation.navigate('Schedule')
    }
    const history = () => {
        navigation.navigate('History')
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "pink" }}>
                <Text style={{ fontSize: 25, marginTop: 25 }}>
                    ชื่อ : {user.name}
                </Text>
                <Text style={{ fontSize: 25, marginTop: 25 }}>
                    นามสกุล : {user.surname}
                </Text>
            </View>
            <View style={{ flex: 2, backgroundColor: "white", flexDirection: 'column' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "#ec722e", justifyContent: 'center' }} onPress={profile} >
                        <View>
                            <Text style={{ ...style.text, textAlign: 'center' }}>
                                {`โปรไฟล์`}
                            </Text>
                            <Icon name='home' size={60} color='white' style={{ textAlign: "center" }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "#7dc343", justifyContent: 'center' }} onPress={park}>
                        <View >
                            <Text style={{ ...style.text, textAlign: 'center' }}>
                                {`จองที่จอดรถ`}
                            </Text>
                            <Icon name='car' size={60} color='white' style={{ textAlign: "center" }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "#64a2d8", justifyContent: 'center' }} onPress={schedule}>
                        <View >
                            <Text style={{ ...style.text, textAlign: 'center' }}>
                                {`ปฏิทิน`}
                            </Text>
                            <Icon name='calendar' size={60} color='white' style={{ textAlign: "center" }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "#eed842", justifyContent: 'center' }} onPress={history}>
                        <View >
                            <Text style={{ ...style.text, textAlign: 'center' }}>
                                {`ประวัติการจอง`}
                            </Text>
                            <Icon name='history' size={60} color='white' style={{ textAlign: "center" }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const mapStateProps = (state) => ({
    user: state.user,
})

const option = {
    headerStyle: {
        // backgroundColor: '#2980b9',
        backgroundColor: '#16213e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

const style = StyleSheet.create({
    text: {
        color: '#FFFFFF',
        fontSize: 25,
        marginTop: 10
    },
})

export default connect(mapStateProps)(MOSJA)