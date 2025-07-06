import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware';
import { taskController } from '../controllers/task.controller';

const router = Router();
router.use(verifyJWT);

router.post('/', taskController.createTask);
router.get('/board/:boardId', taskController.getTasksByBoard);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);
router.put('/smart-assign/:boardId/:taskId', taskController.smartAssign);

export default router;
