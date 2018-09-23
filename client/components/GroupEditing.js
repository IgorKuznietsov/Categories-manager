import React from 'react'
import {View, Text, TextInput, TouchableHighlight, BackHandler} from 'react-native'
import styles from '../styles'

export default class GroupEditing extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.editableGroup.name,
			id: props.editableGroup.id,
			parent: props.editableGroup.parent,
		}
	}
	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.finishEditing()
			return true
		})
	}

	componentWillUnmount() {
		this.backHandler.remove()
	}

	render() {
		return(<View style = {styles.rootElementStyle}>
			<Text style ={styles.textStyle} >Name: </Text>
			<TextInput style = {styles.textInputStyle} onChangeText = {(text) => {this.setState({name: text})} }>{this.props.editableGroup.name}</TextInput>
			<TouchableHighlight onPress = { () => {this.props.confirmEditing(this.state, this.props.sessionId)} }>
				<View style = {styles.buttonStyle}>
					<Text style ={styles.buttonTextStyle}>Confirm</Text>
				</View>
			</TouchableHighlight> 
		</View>)
	}
}