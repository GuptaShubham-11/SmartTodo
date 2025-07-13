import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware';
import { boardController } from '../controllers/board.controller';

const router = Router();
router.use(verifyJWT);

router.post('/', boardController.createBoard);
router.get('/group/:groupId', boardController.getBoardsByGroup);
router.get('/:boardId', boardController.getBoardById);
router.put('/:boardId', boardController.updateBoard);
router.delete('/:boardId', boardController.deleteBoard);
router.put('/add-member/:boardId', boardController.addMemberToBoard);
router.put('/remove-member/:boardId', boardController.removeMemberFromBoard);
router.get('/:boardId/members', boardController.getMembersByBoard);

export default router;
