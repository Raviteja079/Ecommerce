import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

// http://localhost:8000/api/v1/product/67da6a8f3816cb44311afca1?keyword=shirt

//Create Products
export const createProducts = handleAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage=3
  const apiFunctionality = new APIFunctionality(
    Product.find(),
    req.query
  ).search().filter()
  
  //Getting filtered query before pagination
  const filteredQuery=apiFunctionality.query.clone();
  const productsCount=await filteredQuery.countDocuments()

  //calculate total pages based on filterd count
  const totalPages=Math.ceil(productsCount/resultsPerPage)
  const page = Number(req.query.page) || 1
  if(page> totalPages && productsCount > 0){
    return next(new HandleError('This page does not exist', 404))
  }

  // const products = await Product.find();
  apiFunctionality.pagination(resultsPerPage)
  const products = await apiFunctionality.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultsPerPage,
    currentPage: page
  });
});

//Update the Product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new HandleError("Product Not Found", 500));
    // return res.status(500).json({
    //   success: false,
    //   message: "Product Not Found",
    // });
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete the Product
export const deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
};

//Accessing Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
});
