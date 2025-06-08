const User = require('../Models/User');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => {
    return await User.findOne({ email : email });
}

const createUser = async(userData) => {
    const user = new User({
        name: userData.name,
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10),
     
    });
    return await user.save();
};

const updateUser = async (email, userData) => {
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


