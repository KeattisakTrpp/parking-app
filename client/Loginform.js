import React, {Component, useState} from 'react';
import {StyleSheet,View,Image,Text,TextInput,TouchableOpacity,KeyboardAvoidingView,ActivityIndicator,ScrollView} from 'react-native';
import { createAppContainer,NavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';

class HomeScreen extends Component {
    static navigationOptions = {
        header : null,
     };
     constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            profiledata:[],
         }  
     }
     render(){
         return(
             <KeyboardAvoidingView behavior="padding" style ={styles.lolo}>
             <View style ={styles.logoContainer}>
                <Text style={styles.title}>
                    Welcome To My App
                </Text>
             </View>
             <View style={styles.container}>
                 <TextInput style={styles.input}
                     placeholder="Username"
                     placeholderTextColor='rgba(255,255,255,0.7)'
                     returnKeyType="next"
                     onSubmitEditing={()=>this.passwordInput.focus()}
                     onChangeText={(text)=>{
                         this.setState({username:text});
                     }}
                     //value={this.state.username}
                     //autoCapitalize="none"
                 />
                 <TextInput style={styles.input} ref={(input)=>this.passwordInput=input}
                     placeholder="Password"
                     placeholderTextColor='rgba(255,255,255,0.7)'
                     returnKeyType="go"
                     secureTextEntry={true}
                     onChangeText={(text)=>{
                        this.setState({password:text});
                    }}
                     //value={this.state.password}
                 />
                 <TouchableOpacity style={styles.buttonContainer} onPress={this._login} >
                     <Text style={styles.buttonText}>
                         Login
                     </Text>
 
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.buttonContainer} onPress={this._sign} >
                 <Text style={styles.buttonText}>
                         Sign Up
                 </Text>
                 </TouchableOpacity>
             </View>
             </KeyboardAvoidingView>
         )
     }
     _login=async()=>{
         axios.post('http://192.168.1.102:5000/exercises/login',{
                     username:this.state.username,
                     description:this.state.password
                 }).then(response=>{
                    console.warn(response);
                    this.setState({profiledata:response.data});
                    console.warn(this.state.profiledata);
                     if(response.data !== "NOT"){
                     //console.warn(response.data);
                     alert("Log In")
                     this.props.navigation.navigate('Details',{profiledata:this.state.profiledata})
                     }else{
                     alert("Wrong Password")
                     }
                 }).catch(error=>{
                     console.warn(error); 
                     alert("ssss")
                 })
        //fetch('http://192.168.1.108:5000/users')
            //.then(response => response.json() )
            //.then(data => alert(data) )
            //.catch(error => alert(error));
            
         
         //if (userInfo.username===this.state.username && userInfo.password === this.state.password) {
             //alert('Logged in');
             //this.props.navigation.navigate('Details')
    //}   
     //else{
            // alert('Username or Password is incorrect ')    
         //}           
}
    _sign=async()=>{
        this.props.navigation.navigate('Signup')
}
}

class DetailsScreen extends Component {
    render() {
    console.warn("I",this.props.navigation.state.params.profiledata);
      return (
        <View style ={styles.titleee}>            
        <TouchableOpacity onPress={this._park} >
        <Text style ={styles.titlee}>
              จองที่จอด
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._profile}>
        <Text style ={styles.titlee}>
              โปรไฟล์
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._home} >
        <Text style ={styles.titlee}>
              Log Out
        </Text>
        </TouchableOpacity>     
        </View>
      );
    }
    _park=async()=>{
        this.props.navigation.navigate('Parks')
    }
    _home=async()=>{
        this.props.navigation.navigate('Home')
    }
    _profile=async()=>{
        this.props.navigation.navigate('Profiles',{profiledata:this.props.navigation.state.params.profiledata})
    }

}


class SignupScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            name:'',
            surname:'',
            plate:[{value:''}],
            tel:'',
            date:'',
            colour:'',
            brand:'',
            //checkplate:false
            //isLoading: true,
            //dataSource:null,
         }
    }
    _submit=async()=>{
        axios.post('http://192.168.1.102:5000/exercises/signup',{
                    username:this.state.username,
                    description:this.state.password,
                    name:this.state.name,
                    surname:this.state.surname,
                    plate:this.state.plate,
                    tel:this.state.tel,
                    //date:this.state.username,
                    colour:this.state.colour,
                    brand:this.state.brand            
                 }).then(response=>{                 
                     console.warn(response.data);
                     //alert("Log In")
                     //this.props.navigation.navigate('Details')
                 }).catch(error=>{
                     console.warn(error); 
                     alert("ssss")
                 })
    }
    render() {
      return ( 
        <ScrollView style ={styles.reg}>
            <Text style={styles.head}>
              Register
            </Text>
            <TextInput style={styles.inputt} placeholder="Username" placeholderTextColor='#FFFFFF'returnKeyType="next"  onChangeText={(text)=>{
                         this.setState({username:text});
            }} />
            <TextInput style={styles.inputt} placeholder="Password" placeholderTextColor='#FFFFFF'secureTextEntry={true} returnKeyType="next" onChangeText={(text)=>{
                         this.setState({password:text});
            }}/>
            <TextInput style={styles.inputt} placeholder="Your name" placeholderTextColor='#FFFFFF'returnKeyType="next" onChangeText={(text)=>{
                         this.setState({name:text});
            }}/>
            <TextInput style={styles.inputt} placeholder="Surname" placeholderTextColor='#FFFFFF'returnKeyType="next" onChangeText={(text)=>{
                         this.setState({surname:text});
            }}/>
            <View style={{flex:1,flexDirection:"row"}}>
            { 
                this.state.plate.map((obj,i) => {
                    return <TextInput key={i} style={styles.inputt,{width:50,height:50,flex:4}} placeholder="Plate" placeholderTextColor='#FFFFFF'returnKeyType="next" 
                    onChangeText={(text)=>{
                        const plates = this.state.plate.map(p => ({...p}))
                        let field = [...plates]
                        field[i].value = text
                        this.setState({
                            plate:field
                        });     
                    }}/>
                })
            }
            <TouchableOpacity 
            onPress={() => {
                const plates = this.state.plate.map(p => ({...p}))
                const addedPlate = [...plates, {value: ''}]
                this.setState({plate: addedPlate})
            }}>
                <Text style={styles.buttonText,{backgroundColor:"gold",width:20,height:20,paddingLeft:5,marginTop:15,}}>
                    +
                </Text>
            </TouchableOpacity>
            </View>
           <TextInput style={styles.inputt} placeholder="Tel" placeholderTextColor='#FFFFFF'returnKeyType="next" onChangeText={(text)=>{
                         this.setState({tel:text});
            }}/>
            <TextInput style={styles.inputt} placeholder="Color" placeholderTextColor='#FFFFFF'returnKeyType="next"  onChangeText={(text)=>{
                         this.setState({colour:text});
            }}/>
            <TextInput style={styles.inputt} placeholder="Brand" placeholderTextColor='#FFFFFF'returnKeyType="next"  onChangeText={(text)=>{
                         this.setState({brand:text});
            }}/>     
            <TouchableOpacity style={{alignItems:'center'}}>
            <Text style ={styles.titlee}  onPress={this._submit}>
                Enter
            </Text>
            </TouchableOpacity>                
        </ScrollView>
      );
    }
 }
 class Park extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //defauilt value of the date time
          curdate: '',
        };
      }
      _submittime=async()=>{
        axios.post('http://192.168.1.102:5000/time/addtime',{
                    date:this.state.date,
                    timein:this.state.timein,
                    timeout:this.state.timeout,            
                 }).then(response=>{                 
                     console.warn(response.data);
                     //console.warn(navigation.getParam("username","K"));
                     //this.props.navigation.navigate('Home')
                     //alert("Log In")
                     //this.props.navigation.navigate('Details')
                 }).catch(error=>{
                     console.warn(error); 
                     alert("error")
                })
        }
      componentDidMount() {
        var that = this;
    
        var curdate = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
    
        that.setState({
          //Setting the value of the date time
          curdate:
            curdate + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
      }
      render() {
        return (
          <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor:'#3498db'
            }}>
            <Text
              style={{
                fontSize: 20,
                marginTop:20,
              }}>
              Current Date Time
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginTop: 16,
              }}>
              {this.state.curdate}
            </Text>
            <TextInput style={styles.inputt} placeholder="Date" placeholderTextColor='#FFFFFF'returnKeyType="next"  onChangeText={(text)=>{
                         this.setState({date:text});
            }} />
            <TextInput style={styles.inputt} placeholder="Time in" placeholderTextColor='#FFFFFF'returnKeyType="next" onChangeText={(text)=>{
                         this.setState({timein:text});
            }}/>
            <TextInput style={styles.inputt} placeholder="Time out" placeholderTextColor='#FFFFFF'returnKeyType="next" onChangeText={(text)=>{
                         this.setState({timeout:text});
            }}/>
            <TouchableOpacity style={{alignItems:'center'}}>
            <Text style ={styles.titlee}  onPress={this._submittime}>
                Enter
            </Text>
            </TouchableOpacity> 
          </View>
        );
      }
    }
    
    // _submittime=async()=>{
    //     axios.post('http://192.168.1.108:5000/time/addtime',{
    //                 date:this.state.date,
    //                 time:this.state.time,            
    //              }).then(response=>{                 
    //                  console.warn(response.data);
    //                  //console.warn(navigation.getParam("username","KUY"));
    //                  //this.props.navigation.navigate('Home')
    //                  //alert("Log In")
    //                  //this.props.navigation.navigate('Details')
    //              }).catch(error=>{
    //                  console.warn(error); 
    //                  alert("error")
    //              })
    // }
    // render() {
    //   return ( 
    //     <ScrollView style ={styles.reg}>
    //         <Text style={styles.head}>
    //             TIME
    //         </Text>
    //         <TextInput style={styles.inputt} placeholder="Date" placeholderTextColor='#FFFFFF'returnKeyType="next"  onChangeText={(text)=>{
    //                      this.setState({date:text});
    //         }} />
    //         <TextInput style={styles.inputt} placeholder="Time" placeholderTextColor='#FFFFFF'returnKeyType="next" onChangeText={(text)=>{
    //                      this.setState({time:text});
    //         }}/>
    //         <TouchableOpacity style={{alignItems:'center'}}>
    //         <Text style ={styles.titlee}  onPress={this._submittime}>
    //             Enter
    //         </Text>
    //         </TouchableOpacity> 
    //     </ScrollView>
        
//        );
//      }
//  }
    
  
 class Profile extends Component {

    render() {
    console.warn("O",this.props.navigation.state.params.profiledata);
      return ( 
        <ScrollView style ={styles.reg}>
            <Text style={styles.head}>
                Profile
            </Text>
            <Text>
                {this.props.navigation.state.params.profiledata.username}
            </Text>
            <Text>
                {this.props.navigation.state.params.profiledata.description}
            </Text>
            <Text>
                {this.props.navigation.state.params.profiledata.name}
            </Text>
            <Text>
                {this.props.navigation.state.params.profiledata.surname}
            </Text>
            <Text>
                {this.props.navigation.state.params.profiledata.plate}
            </Text>
            <Text>
                {this.props.navigation.state.params.profiledata.tel}
            </Text>
            <Text>
                {this.props.navigation.state.params.profiledata.colour}
            </Text>
            <Text>
                {this.props.navigation.state.params.profiledata.brand}
            </Text>
        </ScrollView>
        
      );
    }
 }

const userInfo ={username:'a',password:'p'}

const RootStack = createStackNavigator(
    {
        Home:HomeScreen,
        Details:DetailsScreen,
        Signup:SignupScreen,
        Parks:Park,
        Profiles:Profile
    },
    {
        initialRouteName:'Home',
    }
);

const AppContainer = createAppContainer(RootStack);
export default class Loginform extends Component {
   render(){
    return(
        <AppContainer/>
    );
   }
}
const styles = StyleSheet.create({
    container:{
        padding:20

    },
    input:{
        height:50,
        backgroundColor:'rgba(255,255,255,0.2)',
        marginBottom:10,
        color:'#FFF',
        paddingHorizontal:10,
        borderRadius:25

    },
    buttonContainer:{
        backgroundColor:'#2980b9',
        paddingVertical:10,
        marginTop:20,
        borderRadius:25
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'700',
        fontSize:16
    },
    buttonContainerr:{
        backgroundColor:'#2980b9',
        paddingVertical:10,
        marginTop:5,
        borderRadius:25
    },
    lolo:{
        flex:1,
        backgroundColor: '#3498db'
    },
    logoContainer:{
        alignItems:'center',
        flexGrow:1,
        justifyContent :'center'
    },
    logo:{
        width:100,
        height:100
    },
    title:{
        fontSize:30,
        color:'#FFF',
        marginTop:10,
        width:160,
        textAlign:'center',
        opacity:0.9
    },
    titlee:{
        textAlign:'center',
        color:'#FFFFFF',
        backgroundColor:'#2980b9',
        paddingHorizontal:10,
        paddingVertical:13,
        borderRadius:25,
        height:60,
        width:200,
        fontSize:25,
        marginTop:50,
        alignItems:'center',
        justifyContent:'center'
    },
    titleee:{
        flex:1,
        backgroundColor: '#3498db',
        alignItems:'center',
        justifyContent:'center'
    },
    logoo:{
        width:100,
        height:100,
        marginTop:50
    },
    reg:{
        flex:1,
        backgroundColor:'#3498db',
        alignSelf:'stretch',
        paddingLeft:60,
        paddingRight:60,
        //justifyContent:'center'
    },
    head:{
        fontSize:24,
        color:'#770000',
        paddingBottom:10,
        marginBottom:40,
        borderBottomColor:'#770000',
        borderBottomWidth:1,
    },
    inputt:{
        alignSelf:'stretch',
        height:40,
        marginBottom:15,
        color:'#FFF',
        borderBottomColor:'#FFFFFF',
        borderBottomWidth:1
    }
});