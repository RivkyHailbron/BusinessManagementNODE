import Business from '../Models/Business'

const getBusiness = async () => {
    const business = await Business.find();
    return business;
}

const updateBusiness = async (id: string, businessData: any) => {
    const { name, description, managerEmail } = businessData;
    return await Business.updateOne({ id: id }, { name, description, managerEmail });
}


export default {
    getBusiness,
    updateBusiness
}