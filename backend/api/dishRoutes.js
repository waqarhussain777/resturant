// routes/dishRoutes.js
import express from 'express';
import authenticate from '../middleware/authenticateToken.js';
import { createDish, getDishes, getDish, updateDish, deleteDish } from '../controllers/dishController.js';

const router = express.Router();

router.post('/', authenticate, createDish);
router.get('/', authenticate, getDishes);
router.get('/:id', authenticate, getDish);
router.put('/:id', authenticate, updateDish);
router.delete('/:id', authenticate, deleteDish);

export default router;
