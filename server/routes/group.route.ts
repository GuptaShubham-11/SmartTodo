import { Router } from 'express';
import { groupController } from '../controllers/group.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = Router();

router.use(verifyJWT);

router.post('/create-group', groupController.createGroup);
router.get('/user-groups', groupController.getUserGroups);

export default router;
