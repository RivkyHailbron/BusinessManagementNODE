
import exspress from 'express';
const router = exspress.Router();
import { getMeeting, getMeetings, postMeeting, putMeeting, deleteMeeting } from '../Controllers/MeetingController';
import { authenticateToken, authorizeRoles, isAuthorizeUser } from '../Middlewares/AuthMiddleware';

router.get('/', getMeetings);
router.get('/:id', getMeeting);
router.post('/', postMeeting);
router.put('/:id', authorizeRoles('admin'), putMeeting);
router.delete('/:id', deleteMeeting);

export default router;
