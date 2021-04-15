import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import  DateTimePicker  from '@react-native-community/datetimepicker'
import moment from 'moment-timezone'
import axios from 'axios'
import styles from '../css/style'
import DB, { timeSlots } from '../constance'
import { park } from '../action'

const ParkScreen = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const parkings = useSelector(state => state.user.parkings)

    const [car, setCar] = useState()
    const [options, setOptions] = useState(timeSlots)
    const [date, setDate] = useState(new Date())
    const [checkIn, setCheckIn] = useState(options[0])
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    
    const [showCheckOut, setShowCheckOut] = useState(false)
    const [checkOut, setCheckOut] = useState(options[1])
    
    const onChangeDate = (event, selectedDate) => {
        const dateInput = selectedDate || date
        setShow(Platform.OS === 'ios')
        console.log('Date: ' + dateInput)
        setDate(dateInput)
    }

    useEffect(() => {
        if(date.getDate() == new Date().getDate()) {
            console.log("Same")
            const timeCheck = timeToString().split(':')
            if(timeCheck > 0 & 30 < timeCheck) timeCheck[1] = "00"
            else timeCheck[1] = "30"
    
            let index = timeSlots.findIndex(time => time === timeCheck.join(":"))
            setOptions(timeSlots.slice(index))
        } else {
            console.log("Not same")
            setOptions(timeSlots)
        }
    }, [date])
    
    useEffect(() => {
        setCheckIn(options[0])
        setCheckOut(options[1])
    }, [options])
    // const onChangeCheckIn = (event, selectedTime) => {
    //     const time = selectedTime || checkIn
    //     setShow(Platform.OS === 'ios')
    //     console.log('Check in: ' + time)
    //     setCheckIn(time)
    // }

    // const onChangeCheckOut = (event, selectedTime) => {
    //     const time = selectedTime || checkOut
    //     setShow(Platform.OS === 'ios')
    //     setShowCheckOut(false)
    //     console.log('Check out: ' + time)
    //     setCheckOut(time)
    // }

    const dateToString = (date = new Date()) => moment(date).format('DD-MM-YYYY')

    const timeToString = (time = new Date()) => moment(time).format('HH:mm')
    
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

    const isValid = (checkIn, checkOut) => {
        const currentTime = timeToString()
        if(checkIn >= currentTime && checkOut > checkIn ) return true
        return false
    }
    const submit = () => {
        // const t1 = checkIn.toLocaleTimeString().slice(0,5)
        // const t2 = checkOut.toLocaleTimeString().slice(0,5)
        const t1 = checkIn
        const t2 = checkOut

        if(isValid(t1, t2)) {
            axios.post(`${DB}/users/book`, {
                _id: user._id,
                date: date,
                checkIn: t1,
                checkOut: t2
            }).then(res => {
                if(res.data === 'already reserved') return alert(res.data)
                parkings.push(res.data.parkings)
                dispatch(park(parkings))
                alert("Booking complete")
            }).catch(err => {
                console.warn(err)
            })
        } else {
            alert("Invalid Time")
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor:'#16213e',
        }}>
            <View>
                {
                    show && (
                        <DateTimePicker
                        timeZoneOffsetInMinutes={0}
                        minimumDate={new Date()}
                        value={date}
                        mode={mode}
                        is24Hour={true}
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
                        value={date}
                        mode="time"
                        is24Hour={true}
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
            <Picker style={style.inputt}
                selectedValue={checkIn}
                onValueChange={(val) => setCheckIn(val) }
            >
                {
                    options.map((time) => <Picker.Item key={time} style={style.inputt} label={time} value={time} />)
                }
            </Picker>
            <Text style={style.label}> Check Out </Text>
            <Picker style={checkOut > checkIn ? style.inputt : style.err}
                selectedValue={checkOut}
                onValueChange={(val) => setCheckOut(val) }
            >
                {
                    options.map((time) => <Picker.Item key={time} style={style.inputt} label={time} value={time} />)
                }
            </Picker>
            <Picker style={style.inputt}
                selectedValue={car}
                onValueChange={(val) => setCar(val) }
            >
                {
                    user.cars.map((car) => <Picker.Item key={car.plate} style={style.inputt} label={car.plate} value={car.plate} />)
                }
            </Picker>
            {/* <TouchableOpacity onPress={() => showTimepicker('checkIn')} style={{alignSelf:'stretch'}}>
                <TextInput style={style.inputt} placeholder="Time in" placeholderTextColor='#FFFFFF' returnKeyType="next" editable={false} value={timeToString(checkIn)}/>
            </TouchableOpacity> */}

            {/* <Text style={style.label}> Check Out </Text>
            <TouchableOpacity onPress={() => showTimepicker('checkOut')} style={{alignSelf:'stretch'}}>
                <TextInput style={checkOut > checkIn ? style.inputt : style.err} placeholder="Time Out" placeholderTextColor='#FFFFFF' returnKeyType="next" editable={false} value={timeToString(checkOut)}/>
            </TouchableOpacity> */}
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
        color:'red',
        borderBottomColor: 'red',
        borderBottomWidth:1,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 15,
        fontSize: 20
    }
})

export default ParkScreen
