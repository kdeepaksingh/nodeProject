import express from 'express'
import { body, validationResult } from 'express-validator';
import { eventUser } from '../model/eventUser';
import User from '../model/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import tokenVarifier from '../middleware/tokenVarifier';

const userRouter: express.Router = express.Router();

/* 
@usage : Register a User
@url : http://127.0.0.1:5000/users/register
@method: POST
@fields: name , email , password
@access : public
*/

userRouter.post('/register', [
    body('name').not().isEmpty().withMessage('Name is Required'),
    body('email').not().isEmpty().withMessage('Email is Required'),
    body('password').not().isEmpty().withMessage('Password is Required'),
], async (req: express.Request, res: express.Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        let { name, email, password } = req.body;
        //check if the email is exists or not
        let user: eventUser | null = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                errors: [
                    { msg: 'User is Already Exists' }
                ]
            })
        }

        //encrypt the plain password
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        //get avatar url
        let avatar = gravatar.url(email, {
            s: '300',
            r: 'pg',
            d: 'mm'
        });

        //Register the users

        user = new User({ name, email, password, avatar });
        user = await user.save();
        res.status(200).json({ message: 'User Registered Successfully!!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [
                {
                    msg: error
                }
            ]
        })
    }
});

/* 
@usage : Login a User
@url : http://127.0.0.1:5000/users/login
@method: POST
@fields: email , password
@access : public
*/

userRouter.post('/login', [
    body('email').not().isEmpty().withMessage('Email is Required'),
    body('password').not().isEmpty().withMessage('Password is Required')
], async (req: express.Request, res: express.Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        let { email, password } = req.body;
        // cheack for email
        let user: eventUser | null = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                errors: [
                    { msg: 'Invalid Email' }
                ]
            })
        }

        // check for password
        let isMatch: boolean = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                errors: [
                    { msg: 'Invalid Password' }
                ]
            })
        }

        // create a token

        let payLoad: any = {
            user: {
                id: user.id,
                name: user.name
            }
        };

        let secretKey: string | undefined = process.env.JWT_SECRET_KEY;

        if (secretKey) {
            let token = await jwt.sign(payLoad, secretKey);
            res.status(200).json({
                msg: 'User Login Successfully!!',
                token: token
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [
                {
                    msg: error
                }
            ]
        })
    }
});


/* 
@usage : Get User Information
@url : http://127.0.0.1:5000/users/me
@method: get
@fields: no -field
@access : Private
*/

userRouter.get('/me', tokenVarifier, async (req: express.Request, res: express.Response) => {
    try {
        let requestedUser: any = req.headers['user'];
        let user: eventUser | null = await User.findById(requestedUser.id).select('-password');
        if (!user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Opps User Data is not Found!'
                    }
                ]
            });
        }

        res.status(200).json({
            user: user
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [
                {
                    msg: error
                }
            ]
        })
    }
});

export default userRouter;