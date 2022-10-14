import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import App from './App'
import registerServiceWorker from './services/registerServiceWorker'
import { AUTH_TOKEN } from './services/constants'

// gives link to server to initiate the apollo client
const httpLink = createHttpLink({
	uri:
		process.env.NODE_ENV === 'production'
			? process.env.REACT_APP_DISTANT_ENDPOINT
			: 'http://localhost:4000',
	credentials: 'same-origin', // modify to same origin when backend on same domain
})

// pull the login token from cookies every time a request is sent
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local cookies if it exists
	const cookies = new Cookies()
	const token = cookies.get(AUTH_TOKEN)
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

// initiate the apollo client to make API calls
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

// wraps the App component around the apollo component and the browser router
// allowing to use graphql queries and (dynamic) routing
ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById('root'),
)
registerServiceWorker()
