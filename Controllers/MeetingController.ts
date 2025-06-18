import { Request, Response, NextFunction } from 'express';
import meetingService from '../Services/MeetingService';

export const getMeetings = async (req: any, res: Response, next: NextFunction) => {
    try {
        const meetings = await meetingService.getMeetings(req.user);
        if (!meetings || meetings.length === 0) {
            return next({ statusCode: 404, message: 'No meetings found' });
        }
        res.status(200).json(meetings);
    } catch (error: any) {
        next({ statusCode: 500, message: 'Error fetching meetings: ' + error.message });
    }
};

export const getMeeting = async (req: any, res: Response, next: NextFunction) => {
    try {
        const meeting = await meetingService.getMeeting(req.params.id, req.user);
        if (!meeting) {
            return next({ statusCode: 404, message: 'Meeting not found' });
        }
        res.status(200).json(meeting);
    } catch (error: any) {
        next({ statusCode: 500, message: 'Error fetching meeting: ' + error.message });
    }
};

export const postMeeting = async (req: any, res: Response, next: NextFunction) => {
    try {
        const newMeeting = await meetingService.createMeeting(req.body, req.user);
        res.status(201).json(newMeeting);
    } catch (error: any) {
        next({ statusCode: error.statusCode || 400, message: error.message });
    }
};

export const putMeeting = async (req: any, res: Response, next: NextFunction) => {
    try {
        const updatedMeeting = await meetingService.updateMeetingById(req.params.id, req.body, req.user);
        res.status(200).json(updatedMeeting);
    } catch (error: any) {
        next({ statusCode: error.statusCode || 400, message: error.message });
    }
};

export const deleteMeeting = async (req: any, res: Response, next: NextFunction) => {
    try {
        await meetingService.deleteMeeting(req.params.id, req.user);
        res.status(200).send('Meeting deleted');
    } catch (error: any) {
        next({ statusCode: error.statusCode || 404, message: error.message });
    }
};