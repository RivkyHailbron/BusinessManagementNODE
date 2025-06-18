
import Service from '../Models/Services '; // ודא שאין רווח בסוף שם הקובץ
import { v4 as uuid } from 'uuid'; // ייבוא של uuid ליצירת מזהים ייחודיים
import UserService from './UserService';
const getServices = async () => {
    const services = await Service.find();
    return services;
}
const getServiceById = async (id: string) => {
    const service = await Service.findOne({ id: id });
    return service;

}
const postService = async (serviceData: any) => {
    const { name, description, producerEmail } = serviceData;
    if(!UserService.getUserByEmail(producerEmail)) {
        throw new Error('Producer email does not exist');
    }
    const id = uuid();
    const service = new Service({ id, name, description, producerEmail });
    return await service.save();
}

const putService = async (id: string, serviceData: any) => {
    const { name, description, producerEmail } = serviceData;
    if(!UserService.getUserByEmail(producerEmail)) {
        throw new Error('Producer email does not exist');
    }
    return await Service.updateOne({ id: id }, { name, description, producerEmail });
}
const deleteService = async (id: string) => {
    return await Service.deleteOne({ id: id });
}
export default {
    getServices,
    getServiceById,
    postService,
    putService,
    deleteService
};