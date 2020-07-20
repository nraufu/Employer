import express from 'express';
import Employee from '../controllers/employee';
import validate from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/', verifyToken, validate.createEmployee, Employee.addEmployee);
router.post('/search', verifyToken, Employee.searchEmployee);
router.put('/:id',verifyToken, validate.paramValidation, Employee.editEmployee);
router.put('/:id/activate', verifyToken, validate.paramValidation, Employee.activateEmployee);
router.put('/:id/suspend', verifyToken, validate.paramValidation, Employee.suspendEmployee);
router.delete('/:id', verifyToken, validate.paramValidation, Employee.deleteEmployee);

export default router;