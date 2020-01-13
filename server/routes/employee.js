import express from 'express';
import employee from '../controllers/employee';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/', validate.createEmployee, employee.addEmployee);

export default router;