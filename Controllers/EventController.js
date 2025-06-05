
const Event = require('../Models/Event.js');

// get event - רשימה של ארועים
const getEvents = async (req, res) => {
    try {
        let events = await Event.find(); // שליפת כל האירועים מהמסד נתונים
        events = events.map(event => ({
            id: event.id,
            name: event.name,
            description: event.description,
            producerEmail: event.producerEmail
        }));

        res.send(events);
    }
    catch (e) {
        console.log(e);
        res.status(404).send('events not found');
    }
};
// get event/:id - פרטי ארוע בודד
const getEvent = async (req, res) => {
    try {
        let event = await Event.findOne({ id: req.params.id });
        event = {
            id: event.id,
            name: event.name,
            description: event.description,
            producerEmail: event.producerEmail
        };
        res.send(event);
    }
    catch (e) {
        console.log(e);
        res.status(404).send('event not found');
    }
}
// post event - יצירת ארוע
const postEvent = async (req, res) => {
    try {
        const event = new Event({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            producerEmail: req.body.producerEmail
        });
        await event.save();
        res.send(event);
    }
    catch (e) {
        console.log(e);
        res.status(400).send('invalid data');
    }
};
// put event/:id - עדכון ארוע
const putEvent = async (req, res) => {
    try {
        await Event.updateOne({ id: req.params.id }, {
            name: req.body.name,
            description: req.body.description,
            producerEmail: req.body.producerEmail
        });
        res.send('event updated');
    }
    catch (e) {
        console.log(e);
        res.status(400).send('invalid data');
    }
}
// delete event/:id  - מחיקת ארוע
const deleteEvent = async (req, res) => {
    try {
        await Event.deleteOne({ id: req.params.id });
        res.send('event deleted');
    }
    catch (e) {
        console.log(e);
        res.status(404).send('event not found');
    }
};
module.exports = { getEvents, getEvent, postEvent, putEvent, deleteEvent };
