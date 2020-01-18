import express from 'express';
import manager from '../controllers/manager';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/signup', validate.signUp, manager.createManager);
router.post('/signin', manager.loginManager);

export default router;