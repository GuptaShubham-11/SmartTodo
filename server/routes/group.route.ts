import { Router } from 'express';
import { groupController } from '../controllers/group.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = Router();

router.use(verifyJWT);

router.post('/create-group', groupController.createGroup);
router.get('/user-groups', groupController.getUserGroups);
router.get('/:groupId', groupController.getGroupById);
router.put('/add-member/:groupId', groupController.addMemberToGroup);
router.put('/remove-member/:groupId', groupController.removeMemberFromGroup);

export default router;
