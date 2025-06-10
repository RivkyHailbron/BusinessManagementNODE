import User  from '../Models/User';
import bcrypt from 'bcrypt';

const getUserByEmail = async (email : String) => {
    return await User.findOne({ email : email });
}

const createUser = async(userData: any) => {
    
    const user  = new User({
        name: userData.name,
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10),
        
     
    });
    return await user.save();
};

const updateUser = async (email: String, userData : any) => {
    return await User.updateOne({ email: email }, {
        name: userData.name,
        password: bcrypt.hashSync(userData.password, 10),
     
    });
}

module.exports = {
    getUserByEmail,
    createUser,
    updateUser
};


