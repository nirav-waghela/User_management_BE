const router = require('express').Router()
const UserControllers = require('../controllers/user-controllers')
const ProductControllers = require('../controllers/product-controllers')
const verify = require('../helpers/utils').verify

router.post('/signup', (req, res, next) => {
    const userController = new UserControllers()
    userController.signUpUser(req, res, next)
})

router.post('/login', (req, res, next) => {
    const userController = new UserControllers()
    userController.loginUser(req, res, next)
})

router.get('/allProducts', verify, (req, res, next) => {
    const productController = new ProductControllers()
    productController.getAllProducts(req, res, next)
})

router.get('/search', verify, (req, res, next) => {
    const productController = new ProductControllers()
    productController.searchByName(req, res, next)
})

router.post('/delete', verify, (req, res, next) => {
    const productController = new ProductControllers()
    productController.deleteProduct(req, res, next)
})

router.post('/updateProduct', verify, (req, res, next) => {
    const productController = new ProductControllers()
    productController.updateProduct(req, res, next)
})

router.post('/createProduct', verify , (req,res,next)=>{
    const productController = new ProductControllers()
    productController.createProduct(req,res,next)
})

module.exports = router;