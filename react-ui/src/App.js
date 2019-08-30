/*
  This is the Route handler that calls all the top level components for
*/

// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './styles/App.css'
import 'intro.js/introjs.css'
import './styles/introjs-custom.css'
import Navbar from './components/navbar/Navbar'
import Home from './scenes/home/Home'
import Search from './scenes/brands/Search'
import Help from './scenes/help/Help'
import About from './scenes/about/About'
import Soul from './scenes/soul/Soul'
import Cause from './scenes/cause/Cause'
import Deliberation from './scenes/deliberations/Deliberation'
import UserProfile from './scenes/userProfile/UserProfile'
import Login from './scenes/login/Login'
import LostPanda from './scenes/404/LostPanda'

// implements the routing thanks to react router dom. It loads the right
// component by matching the path
const App = () => (
  <div className="App" id="App">
    <Route path="/" component={Navbar} />
    <Switch>
      <Route
        exact
        strict
        path="/:url*"
        render={props => <Redirect to={`${props.location.pathname}/`} />}
      />
      <Route exact path="/" component={Home} />
      <Route exact path="/brands/" component={Search} />
      <Route exact path="/help/" component={Help} />
      <Route exact path="/about/" component={About} />
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
      <Route component={LostPanda} />
    </Switch>
  </div>
)

export default App
