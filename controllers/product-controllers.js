const Products = require('../models/product-model')
const JWT = require('../helpers/jwt-helpers')

class productController {
    async createProduct(req, resp, next) {
        console.log(req.body)
        try {
            const { name, description, issueDate, category } = req.body
            let product = new Products({
                productName: name,
                productDescription: description,
                productCategory: category,
                productIssueDate: issueDate
            })
            const savedProduct = await product.save()
            if (savedProduct) {
                return resp.status(200).json({
                    success: true,
                    mesaage: 'Product Successfully saved',
                    data: savedProduct
                })
            } else {
                return resp.status(403).json({
                    success: false,
                    mesaage: 'Something went wrong!'
                })
            }

        }
        catch (err) {
            return resp.status(403).json({
                success: false,
                mesaage: 'Something went wrong!'
            })
        }
    }

    async getAllProducts(req, resp, next) {
        try {
            const allProducts = await Products.find({})
            if (allProducts) {
                return resp.status(200).json({
                    success: true,
                    message: 'All products',
                    data: allProducts
                })
            } else {
                return resp.status(500).json({
                    success: false,
                    message: 'Something went wrong! Please try again'
                })
            }
        }
        catch (err) {
            return resp.status(500).json({
                success: false,
                message: 'Something went wrong! Please try again'
            })
        }
    }

    async updateProduct(req, resp, next) {
        try {
            const { id, name, description, issueDate, category } = req.body
            console.log(id)
            const product = await Products.findOne({ _id: id })
            console.log(product)
            if (product) {
                let newProduct = {
                    productName: name,
                    productDescription: description,
                    productIssueDate: issueDate,
                    productCategory: category
                }
                try {
                    const updatedProduct = await Products.updateOne({ _id: id }, newProduct)
                    console.log(updatedProduct,"ratsdjltdl")
                    if (updatedProduct) {
                            return resp.status(200).json({
                                success: true,
                                message: 'Product updated successfully',
                                data: updatedProduct
                            })
                    } else {
                        return resp.status(500).json({
                            success: false,
                            message: 'Product not updated successfully'
                        })
                    }
                } catch (err) {
                    return resp.status(500).json({
                        success: false,
                        message: 'Something went wrong!'
                    })
                }
            } else {
                return resp.status(404).json({
                    success: false,
                    message: 'Product not found'
                })
            }
        }
        catch (err) {
            return resp.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
    }

    async deleteProduct(req, resp, next) {
        console.log(req.body)
        try {
            const { id } = req.body
            const deletedProduct = await Products.deleteOne({ _id: id })
            if (deletedProduct) {
                return resp.status(200).json({
                    success: true,
                    message: 'Product deleted successfully',
                    data: deletedProduct
                })
            } else {
                return resp.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again!'
                })
            }
        }
        catch (err) {
            return resp.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again!'
            })
        }
    }

    async searchByName(req, resp, next) {
        try {
            const regex = new RegExp(req.query.name, 'gi')
            let response = await Products.find({ name: { $in: [regex] } })
            if(response){
                return resp.status(200).json({
                    success:true,
                    message:'List of Products by name',
                    data:response
                })
            }else{
                return resp.status(500).json({
                    success:false,
                    message:'Something went wrong'
                })
            }
        }catch(err){
            return resp.status(500).json({
                success:false,
                message:'Something went wrong'
            })
        }
    }
}

module.exports = productController