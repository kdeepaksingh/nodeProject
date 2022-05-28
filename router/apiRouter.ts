import express from 'express';
import productModel from '../model/product';
import { iProduct } from '../model/iProduct';

const apiRouter: express.Router = express.Router();


/* 
@usage : Create a Product
@url : http://127.0.0.1:5000/api/v1/products
@method: POST
@fields: name , image , price , qty , info
@access : Public
*/

apiRouter.post('/products', async (req: express.Request, res: express.Response) => {
    try {
        //Receive the form data here
        let product = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            qty: req.body.qty,
            info: req.body.info
        };
        // check if product is already exists
        let existingProduct = await productModel.findOne({ name: product.name });
        if (existingProduct) {
            return res.status(401).json({
                msg: 'Product is Allready Exists!!'
            });
        }
        //if not exists then create a products
        let newProduct = new productModel(product);
        product = await newProduct.save();
        res.status(201).json({
            msg: 'Product Created Successfully!!!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error
        });
    }
});

/* 
@usage : Update a Product
@url : http://127.0.0.1:5000/api/v1/products/:productId
@method: PUT
@fields: name , image , price , qty , info
@access : Public
*/
apiRouter.put('/products/:productId', async (req: express.Request, res: express.Response) => {
    let { productId } = req.params;
    try {
        //Receive the form data here

        let updatedProduct = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            qty: req.body.qty,
            info: req.body.info
        };
        // check if the product is already exists   

        let product: iProduct | null = await productModel.findById(productId);
        if (!product) {
            return res.status(401).json({
                msg: 'Product is Not Exists!!'
            });
        }
        // if product is Exits then update the product

        product = await productModel.findByIdAndUpdate(productId, {
            // $set: updatedProduct  // this is used to update all field is required
            $set: {
                // Giving chance to if you want to update one field also from below logic
                name: updatedProduct.name ? updatedProduct.name : product.name,
                image: updatedProduct.image ? updatedProduct.image : product.image,
                price: updatedProduct.price ? updatedProduct.price : product.price,
                qty: updatedProduct.qty ? updatedProduct.qty : product.qty,
                info: updatedProduct.info ? updatedProduct.info : product.info,
            }
        }, { new: true });
        res.status(200).json({
            msg: 'Product Updated Successfully!!!!',
        });

    } catch (error) {
        console.log(error);
        // if (error.kind === 'ObjectId') {
        //     return res.status(401).json({
        //         msg: 'Product is Not Exists!!'
        //     });
        // }
        res.status(500).json({
            error: error
        });
    }
});

/* 
@usage : Get All The Products
@url : http://127.0.0.1:5000/api/v1/products/
@method: GET
@fields: no-fields
@access : Public
*/
apiRouter.get('/products', async (req: express.Request, res: express.Response) => {
    try {
        let products: iProduct[] = await productModel.find();
        res.status(200).json({
            products: products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});


/* 
@usage : Get a Single  Product
@url : http://127.0.0.1:5000/api/v1/products/:productId
@method: GET
@fields: no-fields
@access : Public
*/
apiRouter.get('/products/:productId', async (req: express.Request, res: express.Response) => {
    let { productId } = req.params;
    try {
        let product: iProduct | null = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                msg: 'Product is Not Found!!!'
            });
        }
        res.status(200).json({
            product: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});

/* 
@usage : Delete Product Successfully
@url : http://127.0.0.1:5000/api/v1/products/
@method: DELETE
@fields: no-fields
@access : Public
*/
apiRouter.delete('/products/:productId', async (req: express.Request, res: express.Response) => {
    let { productId } = req.params;
    try {
        let product: iProduct | null = await productModel.findById(productId);
        // check product is exists or not
        if (!product) {
            return res.status(404).json({
                msg: 'Product is Not Exists!!!'
            });
        }

        // if exists product then delete
        product = await productModel.findByIdAndRemove(productId);
        res.status(200).json({
            msg: 'Product Deleted Successfully!!!!'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});

export default apiRouter;