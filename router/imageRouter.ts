// import express from 'express'
// import multer from 'multer'
// import fs from 'fs'
// import path from 'path'
// import Loki from 'lokijs'
// import { imageFilter, loadCollection, cleanFolder,storage } from '../config/utils';
// const imgRouter: express.Router = express.Router();

// // setup
// const DB_NAME = 'db.json';
// const COLLECTION_NAME = 'images';
// const UPLOAD_PATH = 'uploads';
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter:imageFilter
// });

// // const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });

// const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

// // optional: clean all data before start
// // cleanFolder(UPLOAD_PATH);

// imgRouter.post('/profile', upload.single('avatar'), async (req:express.Request, res:express.Response) => {
//     try {
//         const col = await loadCollection(COLLECTION_NAME, db);
//         const data = col.insert(req.file);

//         db.saveDatabase();
//         res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
//     } catch (err) {
//         res.sendStatus(400);
//     }
// })

// imgRouter.post('/photos/upload', upload.array('photos', 12), async (req:express.Request, res:express.Response) => {
//     try {
//         const col = await loadCollection(COLLECTION_NAME, db)
//         let data = [].concat(col.insert(req.files));

//         db.saveDatabase();
//         res.send(data);
//         // res.send(data.map(x => ({ id: x.$loki, fileName: x.filename, originalName: x.originalname })));
//     } catch (err) {
//         res.sendStatus(400);
//     }
// })

// imgRouter.get('/images', async (req:express.Request, res:express.Response) => {
//     try {
//         const col = await loadCollection(COLLECTION_NAME, db);
//         res.send(col.data);
//     } catch (err) {
//         res.sendStatus(400);
//     }
// })

// imgRouter.get('/images/:id', async (req:express.Request, res:express.Response) => {
//     try {
//         const col = await loadCollection(COLLECTION_NAME, db);
//         const result = req.params;
//         if (!result) {
//             res.sendStatus(404);
//             return;
//         };
//         res.setHeader('Content-Type', result.mimetype);
//         fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
//     } catch (err) {
//         res.sendStatus(400);
//     }
// })

// export default imgRouter;