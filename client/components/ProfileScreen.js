import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet, SectionList, View, TextInput, Modal, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import DB from '../constance'
import styles from '../css/style'
import { addCar } from '../action'

const ProfileScreen = ({ route, navigation }) => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const home = () => {
        navigation.navigate('Home')
    }

    const [state, setState] = useState({
        car: {
            plate: '',
            color: '',
            brand: '',
        },
    })
    const [modalVisible, setModalVisible] = useState(false);

    const add = () => {
        axios.post(`${DB}/users/${user._id}/car`, {
            car: state.car
        }).then(res => {
            user.cars.push(res.data)
            dispatch(addCar(res.data))
            alert("Car Added")
            setModalVisible(!modalVisible)
        }).catch(err => {
            console.warn(err)
        })
    }

    return (
        <View style={styles.reg}>
            <Text style={{ ...styles.head, marginTop: 15 , textAlign:'center'}}>
                โปรไฟล์
            </Text>
            <Button title="เพิ่มทะเบียน" onPress={() => setModalVisible(!modalVisible)} style={styles.buttonText, { width: "50%" }} />
            <View>
                <Modal animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{ backgroundColor: '#000000aa', flex: 1 } }>
                            <View style={{ backgroundColor: '#16213e', margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                <TextInput style={{ ...styles.inputt }} placeholder="ทะเบียน" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next"
                                    onChangeText={(text) => {
                                        const car = state.car
                                        car.plate = text
                                        setState({ car });
                                    }} />
                                <TextInput style={styles.inputt} placeholder="สี" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next" onChangeText={(text) => {
                                    const car = state.car
                                    car.color = text
                                    setState({ car });
                                }} />
                                <TextInput style={styles.inputt} placeholder="ยี่ห้อ" placeholderTextColor='rgba(255,255,255,0.7)' returnKeyType="next" onChangeText={(text) => {
                                    const car = state.car
                                    car.brand = text
                                    setState({ car });
                                }} />
                                <TouchableOpacity style={{...styles.buttonContainer, alignItems: 'center', marginBottom: 10 }} onPress={add}>
                                    <Text style={ styles.buttonText }>เพิ่ม </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={ styles.buttonText }> ยกเลิก </Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </Modal>
            </View>
            <Text style={style.text}>
                {`ชื่อ: ${route.params.profiledata.name}`}
            </Text>
            <Text style={style.text}>
                {`นามสกุล: ${route.params.profiledata.surname}`}
            </Text>
            <Text style={style.text}>
                {`เบอร์โทร: ${route.params.profiledata.tel}`}
            </Text>
            <View>
                <SectionList
                    sections={[{ title: "ทะเบียน", data: route.params.profiledata.cars }]}
                    renderItem={({ item, index }) => (<SectionListItem key={index} item={item} />)}
                    renderSectionHeader={({ section }) => (
                        <View>
                            <Text style={style.text}>{section.title}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index}
                >
                </SectionList>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={home} style={style.logout} >
                    <Text style={{ ...style.text, fontSize: 20, marginTop: 0 }}>
                        ออกจากระบบ
                    </Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}
const style = StyleSheet.create({
    logout: {
        ...styles.titlee,
        width: 150,
        backgroundColor: '#8d93ab',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 25,
        marginTop: 10
    },
})

const SectionListItem = ({ item }) => {
    const style = StyleSheet.create({
        row: {
            flex: 1, flexDirection: "column",
            backgroundColor: "pink",
            borderBottomColor: "black", borderBottomWidth: 1
        },
        text: {
            color: '#FFFFFF',
            fontSize: 20,
            marginLeft:10
        }
    })
    return (
        <View style={styles.row}>
            <Text style={style.text}>• {item.plate} - สี {item.color} ยี่ห้อ {item.brand} </Text>
        </View>
    )
}

export default ProfileScreen
