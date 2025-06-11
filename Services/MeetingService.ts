import Meeting from '../Models/Meeting'
import { nanoid } from 'nanoid'
const getMeetings = async () => {
    const meetings = await Meeting.find();
    return meetings;
}

const getMeeting = async (id: string) => {
    const meeting = await Meeting.findById(id);
    return meeting;
};

const createMeeting = async (meetingData: any, res: any) => {
    const { serviceID, date, time, duration, userEmail } = meetingData;

    const hasOverlap = await hasOverlappingMeeting(serviceID, date, time, duration);
    if (hasOverlap) {
        return res.status(400).json({ message: 'Meeting overlaps with an existing one.' });
    }

    const id = nanoid();
    const meeting = new Meeting({ id, serviceID, date, time, duration, userEmail });

    try {
        const saved = await meeting.save();
        return res.status(201).json(saved);
    } catch (err) {
        return res.status(500).json({ message: 'Failed to save meeting.', error: err });
    }
};

const updateMeetingById = async (id: string, meetingData: any, res: any) => {
    const { serviceID, date, time, duration, userEmail } = meetingData;

    const meeting = await Meeting.findOne({ id });
    if (!meeting) {
        return res.status(404).json({ message: 'Meeting not found.' });
    }

    const isOverlapping = await hasOverlappingMeeting(
        serviceID,
        date,
        time,
        duration,
        id
    );

    if (isOverlapping) {
        return res.status(400).json({ message: 'Meeting overlaps with existing meeting.' });
    }

    // עדכון בפועל
    meeting.serviceID = serviceID;
    meeting.date = date;
    meeting.time = time;
    meeting.duration = duration;
    meeting.userEmail = userEmail;

    try {
        const updated = await meeting.save();
        return res.status(200).json(updated);
    } catch (err) {
        return res.status(500).json({ message: 'Failed to update meeting.', error: err });
    }
};

const deleteMeeting = async (id: string) => {
    return await Meeting.deleteOne({ id: id });
};

const hasOverlappingMeeting = async (
    serviceID: string,
    data: Date,
    timeStr: string,
    duration: number,
    excludeId?: string
) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const startTime = new Date(data);
    startTime.setHours(hours, minutes, 0, 0);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    const query: any = {
        serviceID,
        data,
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

}