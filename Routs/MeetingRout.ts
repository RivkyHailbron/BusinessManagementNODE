
import exspress from 'express';
const router = exspress.Router();
import { getMeeting, getMeetings, postMeeting, putMeeting, deleteMeeting } from '../Controllers/MeetingController';
import {  authorizeRoles } from '../Middlewares/AuthMiddleware';

router.get('/', authorizeRoles('admin'), getMeetings);
router.get('/:id', getMeeting);
router.post('/', postMeeting);
router.put('/:id',authorizeRoles('admin'), putMeeting);
router.delete('/:id', deleteMeeting);

export default router;
