import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import { Agenda } from 'react-native-calendars'


const Schedule = ({data, handleRefresh, refreshing}) => {
  const [items, setItems] = useState({})
  const loadItems = () => {
    data.map(p => {
        const date = p.date.split('T')[0]
        const startTime = p.checkIn
        const endTime = p.checkOut
        if (!items[date]) items[date] = []

        if(!items[date].some(p => p.start === startTime)) {
          console.log(p)
          const name = p.userId.name + ' ' + p.userId.surname
          // console.log('items.name = ', items.name)
          items[date].push({
            start: startTime,
            end: endTime,
            name
          })
        }
    })
    const newItems = {};
    Object.keys(items).forEach(key => { newItems[key] = items[key] })
    // console.log(newItems)
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
              <Text> {item.name} {item.start} - {item.end}</Text>
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
