// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../styles/App.css'
import Header from './Header'
import Search from './Search'
import SoulRoute from './Soul'
import Cause from './Cause'
import Deliberation from './Deliberation'
import UserProfile from './UserProfile'

const App = () => (
	<div className="App">
		<Header />
		<Switch>
			<Route exact path="/" component={Search} />
			<Route path="/companies/:companyId" component={SoulRoute} />
			<Route path="/company/:companyId/causes" component={Cause} />
			<Route
				path="/company/:companyId/causes/:causeId/acts/:actId"
				component={Deliberation}
			/>
			<Route path="/users/:userId" component={UserProfile} />
		</Switch>
	</div>
)

export default App
