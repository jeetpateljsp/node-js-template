import helmet from 'helmet';
import express from 'express'
import cors from 'cors';
import * as http from 'node:http';

const app = express();
app.set('port', process.env.PORT || 9000);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('node server at your service 🖖!');
});

if (process.env.NODE_ENV !== 'test') {
    const server = http.createServer(app);
    server.listen(app.get('port'), () => {
        console.log('Server is running at port %s', app.get('port'));
    });
}

export default app;