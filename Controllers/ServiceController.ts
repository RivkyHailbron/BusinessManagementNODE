import { Request, Response } from 'express';
import Service from '../Models/Services '; // ודא שאין רווח בסוף שם הקובץ

// get service - רשימה של אירועים
export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.find();
        res.send(services);
    } catch (e) {
        console.error(e);
        res.status(404).send('services not found');
    }
};

// get service/:id - פרטי אירוע בודד
export const getService = async (req: Request, res: Response) => {
    try {
        let service = await Service.findOne({ id: req.params.id });

        if (!service) {
            return res.status(404).send('service not found');
        }

        const result = {
            id: service.id,
            name: service.name,
            description: service.description,
            producerEmail: service.producerEmail
        };

        res.send(result);
    } catch (e) {
        console.error(e);
        res.status(404).send('service not found');
    }
};

// post service - יצירת אירוע
export const postService = async (req: Request, res: Response) => {
    try {
        const { id, name, description, producerEmail } = req.body;

        const service = new Service({ id, name, description, producerEmail });
        await service.save();
        res.send(service);
    } catch (e) {
        console.error(e);
        res.status(400).send('invalid data');
    }
};

// put service/:id - עדכון אירוע
export const putService = async (req: Request, res: Response) => {
    try {
        const { name, description, producerEmail } = req.body;

        await Service.updateOne({ id: req.params.id }, { name, description, producerEmail });
        res.send('service updated');
    } catch (e) {
        console.error(e);
        res.status(400).send('invalid data');
    }
};

// delete service/:id - מחיקת אירוע
export const deleteService = async (req: Request, res: Response) => {
    try {
        await Service.deleteOne({ id: req.params.id });
        res.send('service deleted');
    } catch (e) {
        console.error(e);
        res.status(404).send('service not found');
    }
};

