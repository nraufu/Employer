import express from 'express';
import employee from '../controllers/employee';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/', validate.createEmployee, employee.addEmployee);
router.put('/:id',validate.paramValidation, employee.editEmployee);
router.put('/:id/activate', validate.paramValidation, employee.activateEmployee);
router.put('/:id/suspend', validate.paramValidation, employee.suspendEmployee);
router.delete('/:id', validate.paramValidation, employee.deleteEmployee);

export default router;