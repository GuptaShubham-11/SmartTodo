import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware';
import { dashboardController } from '../controllers/dashboard.controller';

const router = Router();
router.use(verifyJWT);

router.get('/', dashboardController.getDashboardOverview);
router.get('/popular-boards', dashboardController.getPopularBoards);
router.get('/task-status-ratio', dashboardController.getTaskStatusRatio);
router.get('/user-activity', dashboardController.getUserActivity);

export default router;
