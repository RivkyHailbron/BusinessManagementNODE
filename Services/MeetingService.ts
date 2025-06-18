import Meeting from '../Models/Meeting';
import Service from '../Models/Services ';
const { v4: uuidv4 } = require('uuid');

const getMeetings = async (currentUser: any) => {
    const meetings = await Meeting.find();
    if (currentUser && currentUser.role === 'admin') return meetings;
    return meetings.filter((meeting: any) => meeting.userEmail == currentUser.email);
};

const getMeeting = async (id: string, currentUser: any) => {
    const meeting = await Meeting.findOne({ id });
    if (!meeting) return null;
    if (currentUser.role !== 'admin' && meeting.userEmail !== currentUser.email) return null;
    return meeting;
};

const createMeeting = async (meetingData: any, currentUser: any) => {
    const { serviceID, date, time, duration, userEmail } = meetingData;
    if (currentUser.role !== 'admin' && currentUser.email !== userEmail) {
        throw { statusCode: 403, message: 'Access denied: You can only create meetings for your own account.' };
    }
    const hasOverlap = await hasOverlappingMeeting(serviceID, date, time, duration);
    if (hasOverlap) {
        throw { statusCode: 400, message: 'Meeting overlaps with existing one.' };
    }
    const service = await Service.findOne({ id: serviceID });
    if (!service) {
        throw { statusCode: 404, message: 'Service not found.' };
    }
    const id = uuidv4();
    const meeting = new Meeting({ id, serviceID, date, time, duration, userEmail });
    return await meeting.save();
};

const updateMeetingById = async (id: string, meetingData: any, currentUser: any) => {
    const meeting = await Meeting.findOne({ id });
    if (!meeting) throw { statusCode: 404, message: 'Meeting not found.' };

    const { serviceID, date, time, duration, userEmail } = meetingData;
    const hasOverlap = await hasOverlappingMeeting(serviceID, date, time, duration, id);
    if (hasOverlap) throw { statusCode: 400, message: 'Meeting overlaps with existing meeting.' };

    if (currentUser.role !== 'admin' && currentUser.email !== meeting.userEmail) {
        throw { statusCode: 403, message: 'Access denied: You can only update your own meetings.' };
    }

    meeting.serviceID = serviceID;
    meeting.date = date;
    meeting.time = time;
    meeting.duration = duration;
    meeting.userEmail = userEmail;
    return await meeting.save();
};

const deleteMeeting = async (id: string, currentUser: any) => {
    const meeting = await Meeting.findOne({ id });
    if (!meeting) throw { statusCode: 404, message: 'Meeting not found.' };
    if (currentUser.role !== 'admin' && meeting.userEmail !== currentUser.email) {
        throw { statusCode: 403, message: 'Access denied: You can only delete your own meetings.' };
    }
    return await Meeting.deleteOne({ id });
};

const hasOverlappingMeeting = async (
    serviceID: string,
    date: Date,
    timeStr: string,
    duration: number,
    excludeId?: string
) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const startTime = new Date(date);
    startTime.setHours(hours, minutes, 0, 0);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    const query: any = {
        serviceID,
        date,
        ...(excludeId && { id: { $ne: excludeId } })
    };

    const meetings = await Meeting.find(query);

    return meetings.some((m) => {
        const [h, mns] = m.time.split(':').map(Number);
        const existingStart = new Date(m.date);
        existingStart.setHours(h, mns, 0, 0);
        const existingEnd = new Date(existingStart.getTime() + m.duration * 60000);
        return existingStart < endTime && existingEnd > startTime;
    });
};

export default {
    getMeetings,
    getMeeting,
    createMeeting,
    updateMeetingById,
    deleteMeeting
};
