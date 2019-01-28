import React,{Component} from 'react'
import {Text,View,StyleSheet} from 'react-native'
import firebase from 'firebase'
import {Input} from './common/input';
import {MyButton} from './common/Mybutton';

export default class loginFrom extends Component{

    state={
        email:'',
        password:'',
        error:'',
        loading:false
    }

    onButtonClicked(){
        const {email,password}=this.state;

        this.setState({
            error:'',
            loading:true
        })
        
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(this.onLoginSuccess.bind(this))
        .catch(()=>{
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch(()=>{
                this.setState({
                    error:"Authentication failed",
                    loading:false
                })
            })
        })
    }

    onLoginSuccess(){
        this.setState({   
            email:'',
            password:'',
            error:'',
            loading:false
        })
    }

    render(){
        const {error,loading} =this.state
        const errorMessage=error?(
            <Text style={styles.errorStyle}>
                {error}
            </Text>
        ):null;

        return(
            <View style={styles.container}>
                <View>
                    <Input text='Email' inputPlaceHolder='Enter Email'
                            onChangeText={(text)=>{
                                this.setState({
                                    email:text
                                })
                            }}
                            value={this.state.email}
                            />
                </View>
                <View>
                    <Input text='Password' inputPlaceHolder='Enter Password'
                            onChangeText={(text)=>{
                                this.setState({
                                    password:text
                                })
                            }}
                            secureTextEntry
                            value={this.state.password}
                            />
                </View>
                {errorMessage}
                <MyButton spinner={loading}
                            title='Login'
                            onPress={this.onButtonClicked.bind(this)}
                            color='#E87B79'/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        padding:30
    },
    errorStyle:{
        fontSize:20,
        color:'red',
        paddingTop:5,
        alignSelf:'center'
    }
})