import './common/env';
import Server, {default as ExpressServer} from './common/server';
import routes from './routes';

const port = parseInt(process.env.PORT);
const server = new Server();
let app;

ExpressServer.connectMongoose().then(() => {
    app = server
        .router(routes)
        .listen(port)
});

export default app;
