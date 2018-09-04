// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../styles/App.css'
import Header from './Header'
import Search from './Search'
import Soul from './Soul'
import Cause from './Cause'
import Deliberation from './Deliberation'
import UserProfile from './UserProfile'

const App = () => (
	<div className="App">
		<Header />
		<Switch>
			<Route exact path="/" component={Search} />
			<Route exact path="/company" component={Soul} />
			<Route exact path="/company/cause" component={Cause} />
			<Route exact path="/company/cause/act" component={Deliberation} />
			<Route exact path="/user" component={UserProfile} />
		</Switch>
	</div>
)

export default App
