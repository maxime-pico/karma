import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'

// gives link to server to initiate the apollo client
const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
})

// initiate the apollo client to make API calls
const client = new ApolloClient({
	link: httpLink,
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
