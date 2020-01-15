import express from 'express';
import morgan from 'morgan';
import managerRoute from './routes/manager';
import employeeRoute from './routes/employee';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.json({
        "Message": "Welcome To My Employer"
    });
});

app.use('/auth', managerRoute);
app.use('/employees', employeeRoute);

app.listen(port, () => console.log(`Listening to port ${port}`));

export default app;