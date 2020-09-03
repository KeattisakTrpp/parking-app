import React, { Component } from 'react'
import { Text , TouchableOpacity, StyleSheet, SectionList, View} from 'react-native'
import styles from '../css/style'

const ProfileScreen = ({ route ,navigation }) => {
    
    _home=async()=>{
        navigation.navigate('Home')
    }

    return ( 
        <View style ={styles.reg}>
            <Text style={{...styles.head, marginTop: 15}}>
                Profile
            </Text>
            <Text style={style.text}>
                {`${route.params.profiledata.name} ${route.params.profiledata.surname}`}
            </Text>
            <Text style={style.text}>
                {`Tel: ${route.params.profiledata.tel}`}
            </Text>
            <View>
                <SectionList 
                    sections={[ {title: "Plates", data: route.params.profiledata.cars}]}
                    renderItem={({ item, index }) => ( <SectionListItem key={index} item={item} /> )}
                    renderSectionHeader={({ section }) => (
                        <View>
                            <Text style={style.text}>{section.title}</Text>    
                        </View>
                    )}
                    keyExtractor={(item, index) => index }
                >
                </SectionList>
            </View>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={_home} style={style.logout} >
                    <Text style={{...style.text, fontSize: 20, marginTop: 0}}>
                        Log Out
                    </Text>
                </TouchableOpacity>   
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    logout:{
        ...styles.titlee,
        width: 150,
        backgroundColor:'grey',
    },
    text: {
        color:'#FFFFFF',
        fontSize:25, 
        marginTop: 10
    },
})

const SectionListItem = ({ item }) => {
    const style = StyleSheet.create({
        row: {
            flex: 1, flexDirection: "column", 
            backgroundColor: "pink", 
            borderBottomColor: "black", borderBottomWidth:1
        },
        text: {
            color:'#FFFFFF',
            fontSize:20,
            marginLeft: 20,
            marginRight: 10,
        }
    })
    return (
        <View style={ styles.row }> 
            <Text style={style.text}>• {item.plate} - {item.color} {item.brand} </Text>   
        </View>
    )
}

export default ProfileScreen
