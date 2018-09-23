import React from 'react'
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native'
import Buttons from './Buttons'

export default class Group extends React.Component {
	
	render() {
		let openSymbol = '►'	
		let siblings = null
		let open = this.props.group.open
		if (this.props.group.open){
			openSymbol = '▼'
			siblings = this.props.group.groups.map( (group) => {
				return (<Group
					group = {group} 
					key = {group.id}
					groupOpenToggle = {this.props.groupOpenToggle}
					displayButtons = {this.props.displayButtons}
					startAdding = {this.props.startAdding}
					startEditing = {this.props.startEditing}
					deleteGroup = {this.props.deleteGroup}
					parentId = {this.props.group.id}
					sessionId = {this.props.sessionId}
				/>)
			} )
		}

		let buttons = null
		if (this.props.group.displayButtons) {
			buttons = 
			<Buttons 
				parentId = {this.props.parentId} 
				group = {this.props.group} 
				startAdding = {this.props.startAdding}
				startEditing = {this.props.startEditing}
				deleteGroup = {this.props.deleteGroup}
				sessionId = {this.props.sessionId}
				
			/>
        }
		//TODO: Try to remove 'flex'-property from style
		//Since all the style elements are used only once - is there any reason to bear style properties to Stylesheet.create(...) ?..
		return(
			<View style = {{paddingLeft: 20, paddingTop: 10, flex: 1, justifyContent: 'flex-start'}}>  
				<View style = {{flex: 1, height: 42, backgroundColor: '#aaa', flexDirection: 'row', justifyContent: 'space-between', borderWidth: 2, borderColor:'#696969', borderRadius: 7}}>
					<TouchableWithoutFeedback 
						onPress = { () => { this.props.groupOpenToggle(this.props.group.id, this.props.group.open, sessionId = this.props.sessionId)} }
						onLongPress = { () => { this.props.displayButtons(this.props.group.id)} }
					>
						<View style = {{flex: 1, overflow:'hidden'}}>
							<Text style = {{fontSize: 26, color: '#E5E5E5', paddingLeft: 10, textShadowColor: '#000', textShadowOffset: {width: 1, height: 2},textShadowRadius: 13}}>
								{openSymbol}  {this.props.group.name} 
							</Text>
						</View>
					</TouchableWithoutFeedback>	
					{buttons}
				</View>	
				{siblings}
			</View>
			
		)	
	}
}