import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, ActivityIndicator, TouchableWithoutFeedback, TouchableHighlight, ScrollView, Animated, BackHandler} from 'react-native';
import { connect } from 'react-redux'
import { authorize } from '../actions/authActions'
import { groupOpenToggle, displayButtons, startAdding, confirmEditing, startEditing, finishEditing, deleteGroup } from '../actions/groupsActions'
import Auth from '../components/Auth'
import Group from '../components/Group'
import GroupEditing from '../components/GroupEditing'

const mapStateToProps = state => {
	return {
		sessionId: state.sessionId,
		editableGroup: state.editableGroup,
		fetchingAccess: state.fetchingAccess,
		group: state.group,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		authorize: (login, pass) => {
			dispatch(authorize(login, pass))
		},
		groupOpenToggle: (groupId, open, sessionId) => {
			dispatch(groupOpenToggle(groupId, open, sessionId))
		},
		displayButtons: (groupId) => {
			dispatch(displayButtons(groupId))
		},	
		startAdding: (groupId) => {
			dispatch(startAdding(groupId))
		},	
		confirmEditing: (group, sessionId) => {
			dispatch(confirmEditing(group, sessionId))
		},
		startEditing: (group) => {
			dispatch(startEditing(group))
		},
		finishEditing: () => {
			dispatch(finishEditing())
		},
		deleteGroup: (groupId, parentId, sessionId) => {
			dispatch(deleteGroup(groupId, parentId, sessionId))
		},
	}
}

class Main extends React.Component {
	render() {
		if (this.props.sessionId) {
			if (this.props.editableGroup == null) {
				return (//TODO: Non-pattern: probably no view-components should be in the container 
					<ScrollView style = {{backgroundColor: '#FFFBE8'}}>  
						<View style = {{paddingTop: 10, paddingRight: 20, flex: 1, justifyContent: 'flex-start'}}>
							<Group 
								group = {this.props.group}
								groupOpenToggle = {this.props.groupOpenToggle}
								displayButtons = {this.props.displayButtons}
								startAdding = {this.props.startAdding}
								startEditing = {this.props.startEditing}
								deleteGroup = {this.props.deleteGroup}
								sessionId = {this.props.sessionId}
							/>
						</View>
					</ScrollView>)
			} else {
				return (
				<ScrollView style = {{backgroundColor: '#FFFBE8'}}>
					<GroupEditing
						editableGroup = {this.props.editableGroup}
						confirmEditing = {this.props.confirmEditing}
						finishEditing = {this.props.finishEditing}
						sessionId = {this.props.sessionId}
					/>
				</ScrollView>)
			}	
		}
		else {
			return (<Auth 
				authorize = {this.props.authorize}
				fetchingAccess = {this.props.fetchingAccess}
			/>)
		}	
	}
 }

export default connect(mapStateToProps, mapDispatchToProps)(Main)