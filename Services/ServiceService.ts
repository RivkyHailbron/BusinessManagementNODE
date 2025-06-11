
import Service from '../Models/Services '; // ודא שאין רווח בסוף שם הקובץ

const getServices = async () => {
    const services = await Service.find();
    return services;
}
const getServiceById = async (id: string) => {
    const service = await Service.findOne({ id: id });

    return service;

}
const postService = async (serviceData: any) => {
    const { id, name, description, producerEmail } = serviceData;
    const service = new Service({ id, name, description, producerEmail });
    return await service.save();
}

const putService = async (id: string, serviceData: any) => {
    const { name, description, producerEmail } = serviceData;
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