// import * as del from 'del';
// import { Collection } from 'lokijs';
// import multer from 'multer';

// const imageFilter = function (req:Express.Request, file:any, cb:any) {
//     // accept image only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };

// const loadCollection = function (colName: any, db: Loki): Promise<Collection<any>> {
//     return new Promise(resolve => {
//         db.loadDatabase({}, () => {
//             const _collection = db.getCollection(colName) || db.addCollection(colName);
//             resolve(_collection);
//         })
//     });
// }

// const cleanFolder = function (folderPath: any) {
//     // delete files inside folder but not the folder itself
//     del.sync([`${folderPath}/**`, `!${folderPath}`]);
// };

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/uploads');
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, `${uniqueSuffix}-${file.originalname}`);
//     }
// });

// export { imageFilter, loadCollection, cleanFolder,storage }