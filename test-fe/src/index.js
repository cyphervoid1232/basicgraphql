import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: 'http://localhost:8002/graphql'
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, document.getElementById('root'));
