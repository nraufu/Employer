import express from 'express';
import employee from '../controllers/employee';
import validate from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/', verifyToken, validate.createEmployee, employee.addEmployee);
router.put('/:id',verifyToken, validate.paramValidation, employee.editEmployee);
router.put('/:id/activate', verifyToken, validate.paramValidation, employee.activateEmployee);
router.put('/:id/suspend', verifyToken, validate.paramValidation, employee.suspendEmployee);
router.delete('/:id', verifyToken, validate.paramValidation, employee.deleteEmployee);

export default router;