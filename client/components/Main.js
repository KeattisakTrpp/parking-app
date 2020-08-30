import React from 'react'
import { connect } from 'react-redux'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import SignupScreen from './SignupScreen'
import ParkScreen from './ParkScreen'
import ProfileScreen from './ProfileScreen'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const DetailStact = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                labelPosition: "beside-icon"
            }}
        >
          <Tab.Screen name="Profile" component={ProfileScreen} options={option} />
          <Tab.Screen name="Park" component={ParkScreen} options={option} />
        </Tab.Navigator>
    )
}

const Main = () => {
    return (
        <AppearanceProvider>
            <NavigationContainer theme={DarkTheme}>
                <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={option} />
                <Stack.Screen name="Signup" component={SignupScreen} options={option} />
                <Stack.Screen name="Details" component={DetailStact} options={{title: "My App", headerLeft: null, ...option}} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    )
}

const mapStateProps = (state) => ({
    user: state.user,
})

const option = {
    headerStyle: {
        backgroundColor: '#2980b9',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

export default connect(mapStateProps)(Main)
