
const userService = require('../Services/userService.ts');

// get User - מחזיר פרטי בעל עסק בודד, לפי האימייל של הבעל עסק
export const getUser = async (req: any, res: any) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        if (!user) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.send(user);
    }
    catch {
        throw { statusCode: 404, message: 'User not found' };
    }
}

// post User - יצירת בעל עסק חדש
export const postUser = async (req: any, res: any) => {
    try {
        await userService.createUser(req.body);
        console.log('User created:', req.body);

        res.status(201).send('User created');
    } catch {
        throw { statusCode: 400, message: 'Bad request' };

    }
};

// put User - עדכון פרטי בעל עסק
export const putUser = async (req: any, res: any) => {
    try {
        await userService.updateUserByEmail(req.params.email, req.body);
        res.status(200).send('User updated');
    } catch {
        throw { statusCode: 400, message: 'Bad request' };
    }
};


