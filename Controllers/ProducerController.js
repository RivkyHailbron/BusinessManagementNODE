const Producer = require('../Models/Producer');

// get producer - מחזיר פרטי מפיק בודד, לפי האימייל של המפיק
const getProducer = async (req, res) => {
    try {
        const producer = await Producer.findOne({ email: req.params.email });
        res.send(producer);
    }
    catch(e){
        console.log(e);
        res.status(404).send('producer not found');
    }
}
// post producer - יצירת מפיק חדש
const postProducer = async (req, res) => {
    const producer = new Producer({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        description: req.body.description,

    });
    try {
        await producer.save();
    }
    catch(e){
        console.log(e);
        res.status(400).send('bad request');
    }
};

// put producer - עדכון פרטי מפיק
const putProducer = async (req, res) => {
    try{
        await Producer.updateOne({ email: req.params.email}, {
            name: req.body.name,
            phone: req.body.phone,
            description: req.body.description,
        });

    }
    catch(e){
        console.log(e);
        res.status(400).send('bad request');
    }
};


module.exports = { getProducer, postProducer, putProducer };
