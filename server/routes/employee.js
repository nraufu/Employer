import express from 'express';
import employee from '../controllers/employee';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/', validate.createEmployee, employee.addEmployee);
router.patch('/:id',validate.paramValidation, employee.editEmployee);

export default router;