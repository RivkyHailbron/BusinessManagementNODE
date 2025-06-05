
const exspress = require('express');
const router = exspress.Router();
const { getServices,
    getService,
    postService,
    putService,
    deleteService } = require('../Controllers/ServiceController.js');

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', postService);
router.put('/:id', putService);
router.delete('/:id', deleteService);

module.exports = router;
