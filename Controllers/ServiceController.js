
const Service = require('../Models/Services ');
// get service - רשימה של ארועים
const getServices = async (req, res) => {
    try {
        

        res.send(services);
    }
    catch (e) {
        console.log(e);
        res.status(404).send('services not found');
    }
};
// get service/:id - פרטי ארוע בודד
const getService = async (req, res) => {
    try {
        let service = await Service.findOne({ id: req.params.id });
        service = {
            id: service.id,
            name: service.name,
            description: service.description,
            producerEmail: service.producerEmail
        };
        res.send(service);
    }
    catch (e) {
        console.log(e);
        res.status(404).send('service not found');
    }
}
// post service - יצירת ארוע
const postService = async (req, res) => {
    try {
        const service = new Service({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            producerEmail: req.body.producerEmail
        });
        await service.save();
        res.send(service);
    }
    catch (e) {
        console.log(e);
        res.status(400).send('invalid data');
    }
};
// put service/:id - עדכון ארוע
const putService = async (req, res) => {
    try {
        await Service.updateOne({ id: req.params.id }, {
            name: req.body.name,
            description: req.body.description,
            producerEmail: req.body.producerEmail
        });
        res.send('service updated');
    }
    catch (e) {
        console.log(e);
        res.status(400).send('invalid data');
    }
}
// delete service/:id  - מחיקת ארוע
const deleteService = async (req, res) => {
    try {
        await Service.deleteOne({ id: req.params.id });
        res.send('service deleted');
    }
    catch (e) {
        console.log(e);
        res.status(404).send('service not found');
    }
};
module.exports = { getServices, getService, postService, putService, deleteService };
