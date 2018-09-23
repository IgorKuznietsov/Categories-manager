import React from 'react';
import { Provider } from 'react-redux'
import Main from './containers/Main'

import store from './store'

export default class App extends React.Component{
	render(){
		return (
			<Provider store = {store}>
				<Main />
			</Provider>
		)
	}
}