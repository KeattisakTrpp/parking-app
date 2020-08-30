import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native'
import { useSelector } from 'react-redux'
import  DateTimePicker  from '@react-native-community/datetimepicker'
import moment from 'moment-timezone'
import axios from 'axios'
import styles from '../css/style'
import DB from '../constance'

const ParkScreen = () => {
    const user = useSelector(state => state.user)
    let currentDateTime = new Date(moment(Date.now()).tz('Asia/Bangkok'))

    const [date, setDate] = useState(currentDateTime)
    const [checkIn, setCheckIn] = useState(currentDateTime)
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    
    const [showCheckOut, setShowCheckOut] = useState(false)
    const [checkOut, setCheckOut] = useState(moment(currentDateTime).add(1, 'm').toDate())
    
    const onChangeDate = (event, selectedDate) => {
        const dateInput = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(dateInput)
    }
    const onChangeCheckIn = (event, selectedTime) => {
        const time = selectedTime || checkIn
        setShow(Platform.OS === 'ios')
        // console.log('Check in: ' + time.getTime())
        setCheckIn(time)
    }

    const onChangeCheckOut = (event, selectedTime) => {
        const time = selectedTime || checkOut
        setShow(Platform.OS === 'ios')
        setShowCheckOut(false)
        // console.log('Check out: ' + time.getTime())
        setCheckOut(time)
    }

    const dateToString = (date = new Date()) => {
        return moment(date).format('DD-MM-YYYY')
    }
    const timeToString = (time = new Date()) => {
        return moment(time).format('hh:mm a')
    }

    const showDatepicker = () => {
        setShow(true);
        setMode('date');
    }

    const showTimepicker = (type) => {
        switch (type) {
            case 'checkIn':
                setShow(true)
                setMode('time')
                break
            case 'checkOut':
                setShowCheckOut(true)
        }
    }
        
    const submit = () => {
        axios.post(`${DB}/users/book`, {
            _id: user._id,
            date: date.getTime(),
            checkIn: checkIn.getTime(),
            checkOut: checkOut.getTime()
        }).then(res => {
            console.log(res.data)
            currentDateTime = new Date(moment().tz('Asia/Bangkok').format())
            setDate(currentDateTime)
            setCheckIn(currentDateTime)
            alert("Booking complete")
        }).catch(err => {
            console.warn(err)
        })
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#3498db'
        }}>
            <View>
                {
                    show && (
                        <DateTimePicker
                        testID="datePicker"
                        timeZoneOffsetInMinutes={0}
                        minimumDate={date}
                        value={date}
                        mode={mode}
                        is24Hour={false}
                        display="default"
                        onChange={mode === 'date' ? onChangeDate : onChangeCheckIn }
                        />
                    )
                }
            </View>
            
            <View>
                {
                    showCheckOut && (
                        <DateTimePicker
                        testID="datePicker"
                        timeZoneOffsetInMinutes={0}
                        value={checkOut}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={onChangeCheckOut}
                        />
                    )
                }
            </View>
                
            <Text style={style.label}> Date </Text>
            <TouchableOpacity onPress={showDatepicker} style={{alignSelf:'stretch'}}>
                <TextInput style={style.inputt} placeholder="Date" placeholderTextColor='#FFFFFF' returnKeyType="none" editable={false} value={dateToString(date)}/>
            </TouchableOpacity>

            <Text style={style.label}> Check In </Text>
            <TouchableOpacity onPress={() => showTimepicker('checkIn')} style={{alignSelf:'stretch'}}>
                <TextInput style={style.inputt} placeholder="Time in" placeholderTextColor='#FFFFFF' returnKeyType="next" editable={false} value={timeToString(checkIn)}/>
            </TouchableOpacity>

            <Text style={style.label}> Check Out </Text>
            <TouchableOpacity onPress={() => showTimepicker('checkOut')} style={{alignSelf:'stretch'}}>
                <TextInput style={checkOut.getTime() > checkIn.getTime() ? style.inputt : style.err} placeholder="Time Out" placeholderTextColor='#FFFFFF' returnKeyType="next" editable={false} value={timeToString(checkOut)}/>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }}>
                <Text style={styles.titlee} onPress={submit} >
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
    },
    label: {color: "white", fontSize: 20 , marginTop: 25, marginLeft: 10 },
    err: {
        alignSelf:'stretch',
        height:40,
        marginBottom:15,
        color:'#FFF',
        borderBottomColor: 'red',
        borderBottomWidth:1,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 15,
        fontSize: 20
    }
})

export default ParkScreen
