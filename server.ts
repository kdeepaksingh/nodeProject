import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({ path: './.env' });
import userRouter from './router/userRouter';
import eventRouter from './router/eventRouter';
import apiRouter from './router/apiRouter';
import multer from 'multer';
// import imgRouter from './router/imageRouter';

const app: express.Application = express();

// enable cors to communication between server
app.use(cors());

//configure express to receive the form data
app.use(express.json());

// router configuration
app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/api/v1', apiRouter);
// app.use('/uploadImg', imgRouter);
//Connect to mongodb
let dbURL: string | undefined = process.env.MONGO_DB_LOCAL;
if (dbURL) {
    mongoose.connect(dbURL, {
    }).then(() => {
        console.log(`Connected to mongodb Successfully!`);
    }).catch((error) => {
        console.error(error);
        process.exit(1); // to stop the node js process is unable to connect
    });
}

//configure dotenv
const hostName: string | undefined = process.env.HOST_NAME;
const port: string | undefined = process.env.PORT;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Get All Events Booking Data Successfully!!" });
});
app.post('/uploadImage', upload.single('userImg'), (req: express.Request, res: express.Response) => {
    console.log(req.file);
    res.status(200).json({ message: "Uploading Image Successfully!!" });
});

if (port && hostName) {
    app.listen(Number(port), hostName, () => {
        console.log(`Express Server is started at http://${hostName}:${port}`);
    });
}


