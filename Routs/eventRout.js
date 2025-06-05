
const exspress = require('express');
const router = exspress.Router();
const { getEvents,
    getEvent,
    postEvent,
    putEvent,
    deleteEvent } = require('../Controllers/EventController.js');

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', postEvent);
router.put('/:id', putEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
