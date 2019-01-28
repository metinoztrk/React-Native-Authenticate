import React,{Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'

export default class banner extends Component{
    render(){
        return(
            <View style={styles.bannerContainer}>
                <Text style={styles.bannerText}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    bannerContainer:{
        width:'auto',
        height:350,
        backgroundColor:'#E87B79',
        justifyContent:'center',
        alignItems:'center'
    },
    bannerText:{
        fontSize:34,
        color:'#fff',

    }
})