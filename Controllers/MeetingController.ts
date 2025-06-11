
import { Request, Response, NextFunction } from 'express';
import meetingService from '../Services/MeetingService';

export const getMeetings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const meetings = await meetingService.getMeetings();
        if (!meetings || meetings.length === 0) {
            next({ statusCode: 404, message: 'Service not found' });
        }
        res.status(200).json(meetings);
    } catch (error: any) {
        next({ statusCode: 500, message: 'Error fetching meetinges: ' + error.message });
    }
}

export const getMeeting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const meeting = await meetingService.getMeeting(req.params.id);
        if (!meeting) {
            next({ statusCode: 404, message: 'Service not found' });
        }
        res.status(200).json(meeting);
    } catch (error: any) {
        next({ statusCode: 500, message: 'Error fetching meetinges: ' + error.message });
    }
}
export const postMeeting = async (req: any, res: any, next: NextFunction) => {
    try {
        await meetingService.createMeeting(req.body);
        console.log('Meeting created:', req.body);

        res.status(201).send('Meeting created');
    } catch {
        next({ statusCode: 400, message: 'Bad request' });

    }
};

// put Meeting - עדכון פרטי בעל עסק
export const putMeeting = async (req: any, res: any) => {
    try {
        await meetingService.updateMeetingByEmail(req.params.email, req.body);
        res.status(200).send('Meeting updated');
    } catch {
        throw { statusCode: 400, message: 'Bad request' };
    }
};

// delete Meeting - מחיקת פגישה
export const deleteMeeting = async (req: any, res: any) => {
    try {
        await meetingService.deleteMeeting(req.params.id);
        res.status(200).send('Meeting deleted');
    } catch (error: any) {
        throw { statusCode: 404, message: 'Error deleting meeting: ' + error.message };
    }
}



