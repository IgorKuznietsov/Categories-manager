import React from 'react'
import {View, Image, TouchableWithoutFeedback, Animated} from 'react-native'

export default class Buttons extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			position: new Animated.Value(100)
		}
	}

	componentDidMount() {
		Animated.timing(
			this.state.position,
			{
				toValue: this.props.parentId ? 0 : 77,  //root group has only one button. it shouldn't be moved so far
				duration: 300
			}	
		)
		.start()
	}

	render() {

		let deleteButton = null
		let editButton = null
		
		if (this.props.parentId) {
			deleteButton = (
				<TouchableWithoutFeedback onPress = {() => {this.props.deleteGroup(this.props.group.id, this.props.parentId, this.props.sessionId)}}>
					<View style = {{width: 40}}>
						<Image source = {require('../icons/delete.png')} style = {{width: 35, height: 35}}/>
					</View>
				</TouchableWithoutFeedback>
			)

			editButton = (
				<TouchableWithoutFeedback onPress = {() => {this.props.startEditing(this.props.group)}}>
					<View style = {{width: 40}}>
						<Image source = {require('../icons/edit.png')} style = {{width: 35, height: 35}}/>
					</View>
				</TouchableWithoutFeedback>
			)
		}
		return (
			<Animated.View style = {{width: 120, alignItems: 'center', flexDirection: 'row', transform: [{translateX: this.state.position}]}}>
				<TouchableWithoutFeedback onPress = {() => {this.props.startAdding(this.props.group.id)}}>
					<View style = {{width: 40}}>
						<Image source = {require('../icons/add.png')} style = {{width: 35, height: 35}}/>
					</View>
				</TouchableWithoutFeedback>
				{editButton}
				{deleteButton}
			</Animated.View>
		)
	}
}