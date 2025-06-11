import { Request, Response ,NextFunction} from "express";

const userService = require('../Services/userService.ts');
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = userService.getServices();
        res.send(users);
    } catch (e: any) {
        next({ statusCode: 404, message: 'Error fetching services: ' + e.message });
    };
}
// get User - מחזיר פרטי בעל עסק בודד, לפי האימייל של הבעל עסק
export const getUser = async (req: any, res: any, next: NextFunction) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        if (!user) {
            next({ statusCode: 404, message: 'User not found' });
        }
        res.send(user);
    }
    catch {
        next({ statusCode: 404, message: 'User not found' });
    }
}

// post User - יצירת בעל עסק חדש
export const postUser = async (req: any, res: any, next: NextFunction) => {
    try {
        await userService.createUser(req.body);
        console.log('User created:', req.body);

        res.status(201).send('User created');
    } catch {
        next({ statusCode: 400, message: 'Bad request' });

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


