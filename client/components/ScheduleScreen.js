import React, { useEffect , useState } from 'react'
import Schedule from './Schedule'
import axios from 'axios'
import DB from '../constance'

const ScheduleScreen = ({navigation}) => {
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)

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
        const unsubscribe = navigation.addListener('focus', () => fetchData())

        return unsubscribe
    }, [navigation])

    return (
        <Schedule data={data} handleRefresh={handleRefresh} refreshing={refreshing}/>
    )
}

export default ScheduleScreen
