import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import { Agenda } from 'react-native-calendars'
import moment from 'moment-timezone'
import axios from 'axios'
import DB from '../constance'


const Schedule = () => {
  const [items, setItems] = useState({})
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const timeToString = (time) => {
    const date = new Date(time);
    return moment(date).format('hh:mm a')
  }

  const fetchData = () => {
    console.log("Fetching")
    axios.get(`${DB}/users/park`)
    .then(res => {
      setData(res.data)
      setRefreshing(false)
    })
    .catch(err => {
      console.warn(err)
    })
  }
  
  const handleRefresh = () => {
    setRefreshing(true)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const loadItems = () => {
    data.map(p => {
        const dateFormat = p.date.split('T')[0].split('-')
        const date = `${dateFormat[0]}-${dateFormat[1]}-${parseInt(dateFormat[2])+1}`
        const startTime = p.checkIn
        const endTime = p.checkOut
        if (!items[date]) items[date] = []

        if(!items[date].some(p => p.start === startTime)) {
          items[date].push({
            start: startTime,
            end: endTime      
          })
        }
    })
    const newItems = {};
    Object.keys(items).forEach(key => { newItems[key] = items[key]; });
    setItems(newItems)
  }

  const renderItem = (item) => {
    return (
        <Card>
          <Card.Content>
            <View  style={{ 
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 64
            }}>
              <Text>{item.start} - {item.end}</Text>
            </View>
          </Card.Content>
        </Card>
    )
  }

  const renderEmptyDate = () => {
    return (
        <Card>
          <Card.Content>
            <View  style={{ 
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 64
            }}>
              <Text>Avialable All Day</Text>
            </View>
          </Card.Content>
        </Card>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  )
}

export default Schedule
