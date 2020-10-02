import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import styles from '../css/style'
import moment from 'moment-timezone'

const HistoryScreen = () => {
    const parkings = useSelector(state => state.user.parkings)
    const [data, setData] = useState([])
    const dateToString = (date) => {
        return moment(date).format('DD-MM-YYYY')
    }

    const normData = () => {
         // ascending sort
        const items = parkings.sort((a,b) => new Date(b.date) - new Date(a.date))
        console.log(items)
        setData(items)
    }

    useEffect(() => {
        normData()
    }, [])
    
    return (
        <View style={styles.reg}>
            <Text style={{ ...styles.head, marginTop: 15 }}>
                History
            </Text>
            <FlatList
                keyExtractor={(item, index) => index}
                data={data}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        {
                            index > 0 ? dateToString(data[index-1].date) !== dateToString(item.date) ? 
                                <Text style={style.label}> {dateToString(item.date)} </Text> : null 
                            : <Text style={style.label}> {dateToString(item.date)} </Text>
                        }
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={style.detail}>• {item.checkIn} - {item.checkOut} </Text>
                            <Text style={{...style.detail, color: item.status === 'active' ? '#28df99' : '#8d93ab'}}>{item.status}</Text>
                        </View>
                    </View>   
                )}
            />
        </View>
    )
}

const style = StyleSheet.create({
    label: {color: "white", fontSize: 20},
    detail: {color: "white", fontSize: 15, marginLeft: 25}
})

export default HistoryScreen
