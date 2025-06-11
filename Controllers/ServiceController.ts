import { Request, Response } from 'express';
import serviseService from '../Services/ServiceService'

// get service - רשימה של אירועים
export const getServices = async (req: Request, res: Response) => {
    try {
        const services = serviseService.getServices();
        res.send(services);
    } catch (e: any) {
        throw {
            statusCode: 404, message: 'Error fetching services: ' + e.message
        }
    };
}

// get service/:id - 
export const getService = async (req: Request, res: Response) => {
    try {
        const service = await serviseService.getServiceById(req.params.id);

        if (!service) {
            throw { statusCode: 404, message: 'Service not found' };
        }
        res.send(service);
    } catch (e: any) {
        throw { statusCode: 404, message: 'Error fetching service: ' + e.message };
    }
};

// post service - יצירת אירוע
export const postService = async (req: Request, res: Response) => {
    try {
        await serviseService.postService(req.body);
    } catch (e: any) {
        throw { statusCode: 400, message: 'Error creating service: ' + e.message };

    }
};

// put service/:id - עדכון אירוע
export const putService = async (req: Request, res: Response) => {
    try {
        await serviseService.putService(req.params.id, req.body);
        res.send('service updated');
    } catch {
        throw { statusCode: 400, message: 'Error updating service' };
    }
};

// delete service/:id - מחיקת אירוע
export const deleteService = async (req: Request, res: Response) => {
    try {
        await serviseService.deleteService(req.params.id);
        res.send('service deleted');
    } catch (e: any) {
        throw { statusCode: 404, message: 'Error deleting service: ' + e.message };
    }
};

