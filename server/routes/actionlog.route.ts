import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware';
import { actionLogController } from '../controllers/actionlog.controller';

const router = Router();
router.use(verifyJWT);

router.get('/board/:boardId', actionLogController.getActionLogs);

export default router;
