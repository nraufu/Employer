import express from 'express';
import Manager from '../controllers/manager';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/signup', validate.signUp, Manager.createManager);
router.post('/signin', Manager.loginManager);

export default router;