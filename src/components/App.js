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
			<Route exact path="/company/:companyId" component={Soul} />
			<Route exact path="/company/:companyId/cause/:cause" component={Cause} />
			<Route
				exact
				path="/company/:companyId/cause/:cause/act/:actId"
				component={Deliberation}
			/>
			<Route path="/users/:userId" component={UserProfile} />
		</Switch>
	</div>
)

export default App
