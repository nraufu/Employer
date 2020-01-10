import express from 'express';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.json({
        "Message": "Welcome To My Page"
    });
})

app.listen(port, () => console.log(`Listening to port ${port}`));