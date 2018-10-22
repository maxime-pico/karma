// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import '../styles/App.css'
import Header from './Header'
import Search from './Search'
import Soul from './Soul'
import Cause from './Cause'
import Deliberation from './Deliberation'
import UserProfile from './UserProfile'
import Login from './Login'
import PandaPerdu from './PandaPerdu'

// implements the routing thanks to react router dom. It loads the right
// component by matching the path
const App = () => (
	<div className="App" id="App">
		<Route path="/" component={Header} />
		<Switch>
			<Route
				exact
				strict
				path="/:url*"
				render={props => <Redirect to={`${props.location.pathname}/`} />}
			/>
			<Route exact path="/" component={Search} />
			<Route exact path="/company/:companyId" component={Soul} />
			<Route exact path="/company/:companyId/cause/:cause" component={Cause} />
			<Route
				exact
				path="/company/:companyId/cause/:cause/act/:act"
				component={Deliberation}
			/>
			<Route path="/user/" component={UserProfile} />
			<Route path="/signup/" component={Login} />
			<Route path="/login/" component={Login} />
			<Route component={PandaPerdu} />
		</Switch>
	</div>
)

export default App
