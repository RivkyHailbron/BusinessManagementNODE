
const userService = require('../Services/userService.js');

// get User - מחזיר פרטי בעל עסק בודד, לפי האימייל של הבעל עסק
const getUser = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        if(!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    }
    catch(e){
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
}

// post User - יצירת בעל עסק חדש
const postUser = async (req, res) => {
    try {
        await userService.createUser(req.body);
        console.log('User created:', req.body);
        
        res.status(201).send('User created');
    } catch (e) {
        console.error(e);
        res.status(400).send('Bad request');
    }
};

// put User - עדכון פרטי בעל עסק
const putUser = async (req, res) => {
    try {
        await userService.updateUserByEmail(req.params.email, req.body);
        res.status(200).send('User updated');
    } catch (e) {
        console.error(e);
        res.status(400).send('Bad request');
    }
};


module.exports = { getUser, postUser, putUser };
