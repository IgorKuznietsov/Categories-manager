import React from 'react'
import {ScrollView, View, Text, TextInput, TouchableHighlight, ActivityIndicator, StyleSheet} from 'react-native'
import styles from '../styles'

export default class Auth extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			login: '', 
			pass: ''
		}
	}
	
	render(){
        let spinner = null
		if (this.props.fetchingAccess) {
			spinner = (
				<View style = {{marginTop: 10}}>
					<ActivityIndicator size="large" color="#444" />
				</View>
			)
		}

		return(
			<ScrollView>
				<View style = {styles.rootElementStyle}>
					<Text style ={styles.textStyle} >Login: </Text>
					<TextInput style = {styles.textInputStyle} onChangeText = { (text) => {this.setState({login: text})} } />
					<Text style ={styles.textStyle} >Password: </Text>
					<TextInput style = {styles.textInputStyle} onChangeText = { (text) => {this.setState({pass: text})} } />
					<TouchableHighlight onPress = { () => {this.props.authorize(this.state.login, this.state.pass)} }>
						<View style = {styles.buttonStyle}>
							<Text style ={styles.buttonTextStyle}>Sign in</Text>
						</View>
					</TouchableHighlight>
				</View>
				{spinner}
			</ScrollView>
		)
	}
}