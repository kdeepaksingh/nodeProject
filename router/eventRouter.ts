import express from 'express';
import tokenVarifier from '../middleware/tokenVarifier';
import { body, validationResult } from 'express-validator';
import { iEvents } from '../model/iEvents';
import eventModel from '../model/events';


const eventRouter: express.Router = express.Router();

/* 
@usage : Upload an Event
@url : http://127.0.0.1:5000/events/upload
@method: POST
@fields: name , image , price , date , info , type
@access : Private
*/

eventRouter.post('/upload', [
    body('name').not().isEmpty().withMessage('Name is Required'),
    body('image').not().isEmpty().withMessage('Image is Required'),
    body('price').not().isEmpty().withMessage('Price is Required'),
    body('date').not().isEmpty().withMessage('Date is Required'),
    body('info').not().isEmpty().withMessage('Info is Required'),
    body('type').not().isEmpty().withMessage('Type is Required'),
], tokenVarifier, async (req: express.Request, res: express.Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            errors: errors.array()
        });
    }
    try {
        let { name, image, price, date, info, type } = req.body;
        //check if event with the same name
        let event: iEvents | null = await eventModel.findOne({ name: name });
        if (event) {
            return res.status(401).json({
                errors: [
                    {
                        msg: 'Event is Already Exists...'
                    }
                ]
            });
        }
        //if not then create Event

        event = new eventModel({ name, image, price, date, info, type });
        event = await event.save();
        res.status(200).json({
            msg: 'Upload Event Successfully!!'
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

/* 
@usage : Get All Free Events
@url : http://127.0.0.1:5000/events/free
@method: get
@fields: no-field
@access : public
*/

eventRouter.get('/free', async (req: express.Request, res: express.Response) => {
    try {
        let event: iEvents[] | null = await eventModel.find({ type: 'FREE' });
        if (!event) {
            return res.status(401).json({
                errors: [
                    {
                        msg: 'Opps No Events is Found!!!!!!!!'
                    }
                ]
            });
        }
        res.status(200).json({
            event: event
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


/* 
@usage : get all pro events
@url : http://127.0.0.1:5000/events/pro
@method: get
@fields: no -field
@access : private
*/

eventRouter.get('/pro', async (req: express.Request, res: express.Response) => {
    try {
        let event: iEvents[] | null = await eventModel.find({ type: 'PRO' });
        if (!event) {
            return res.status(401).json({
                errors: [
                    {
                        msg: 'Opps No Events is Found!!!!!!!!'
                    }
                ]
            });
        }
        res.status(200).json({
            event: event
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

/* 
@usage : get a single events
@url : http://127.0.0.1:5000/events/:eventId
@method: get
@fields: no -field
@access : private
*/

eventRouter.get('/:eventId', async (req: express.Request, res: express.Response) => {
    try {
        let { eventId } = req.params;
        let event: iEvents | null = await eventModel.findById(eventId);
        if (!event) {
            return res.status(401).json({
                errors: [
                    {
                        msg: 'Opps No Events is Found!!!!!!!!'
                    }
                ]
            });
        }
        res.status(200).json({
            event: event
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



export default eventRouter;