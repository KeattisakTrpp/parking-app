import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import styles from '../css/style'
import moment from 'moment-timezone'

const HistoryScreen = () => {
    const user = useSelector(state => state.user)
    const dateToString = (date) => {
        return moment(date).format('DD-MM-YYYY')
    }

    return (
        <View style={styles.reg}>
            <Text style={{ ...styles.head, marginTop: 15 }}>
                History
            </Text>
            <FlatList
                keyExtractor={(item, index) => index}
                data={user.parkings.sort((a,b) => a - b)} // ascending sort
                renderItem={({ item, index }) => (<Text key={index}> {dateToString(item.date)}: {item.checkIn} - {item.checkOut} </Text>)}
            />
        </View>
    )
}

export default HistoryScreen
