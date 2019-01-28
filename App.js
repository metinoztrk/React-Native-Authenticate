import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Banner from './src/component/banner'
import LoginForm from './src/component/loginForm'
import firebase from 'firebase'
import {Spinner} from './src/component/common/spinner'
import {MyButton} from './src/component/common/Mybutton'

export default class App extends React.Component {

  state={
    loggedIn:null
  }

  componentDidMount(){
    firebase.initializeApp({
      apiKey:"",
      authDomain: "authentication-8e2d0.firebaseapp.com",
      databaseURL: "https://authentication-8e2d0.firebaseio.com",
      projectId: "authentication-8e2d0",
      storageBucket: "authentication-8e2d0.appspot.com",
      messagingSenderId: "196455087754"
    })

    firebase.auth().onAuthStateChanged((user)=>{
      const loggedIn=user ? true : false;

      this.setState({
        loggedIn
      })
    })
  }

  renderContent(){
    const {loggedIn}=this.state;

    switch(loggedIn){
      case true:
        return(
          <MyButton spinner={false}
                    onPress={()=>firebase.auth().signOut()}
                    title='Logout' 
                    color='#E87B79'/>
        )
      case false:
        return(
          <LoginForm/>
        )
      default:
        return(
          <Spinner/>
        )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Banner text='Authenticate'/>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
});
