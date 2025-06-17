
import exspress from 'express';
const router = exspress.Router();
import { getMeeting, getMeetings, postMeeting, putMeeting, deleteMeeting } from '../Controllers/MeetingController';
import {  authenticateToken, authorizeRoles } from '../Middlewares/AuthMiddleware';

router.get('/', authenticateToken,authorizeRoles('admin'), getMeetings);
router.get('/:id', authenticateToken, getMeeting);
router.post('/', authenticateToken, postMeeting);
router.put('/:id',authenticateToken, authorizeRoles('admin'), putMeeting);
router.delete('/:id',authenticateToken,  deleteMeeting);

export default router;
