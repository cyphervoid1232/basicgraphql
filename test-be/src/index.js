import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema'
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const app = express();
const port = 8002

app.use(cors())

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql",subscriptionsEndpoint: `ws://localhost:${port}/subscriptions` }));

app.use("/", (req, res) => {
    res.sendStatus(200);
})

const ws = createServer(app)


ws.listen(port, () => {
    console.log("Subscription is now running");
    new SubscriptionServer({
        execute,
        subscribe,
        schema
    }, {
            server: ws,
            path: '/subscriptions'
        })
})

// app.listen(port, () => {
//     console.log('Server on ' + port);
// })
