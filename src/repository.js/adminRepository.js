import ErrorService from "../middlewares/errorService.js";
import customerModel from "../models/customerModel.js";
import orderModel from "../models/orderModel.js";
import moment from "moment";
import mongoose from "mongoose";
import productModel from "../models/productModel.js";

export const revenueDataRepo = async () => {
  try {
    const revenue = await orderModel.aggregate([
      {
        $match: {
          status: "Completed",
        },
      },
      {
        $group: {
          _id: { $month: { $toDate: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          revenue: 1,
        },
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyRevenue = monthNames.map((name, index) => {
      const month = index + 1;
      const found = revenue.find((item) => item.month === month);
      return {
        name,
        revenue: found ? found.revenue : 0,
      };
    });

    const total = await orderModel.aggregate([
      { $match: { status: "Completed" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalCustomers = await customerModel.countDocuments();

    const totalRevenue = total[0].totalRevenue;

    return { success: true, monthlyRevenue, totalRevenue, totalCustomers };
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};

export const customerDataRepo = async () => {
  try {
    const customersData = await customerModel.find({}).lean();

    const customers = customersData.map((customer) => ({
      _id: customer._id.toString(),
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      location: customer.location,
      totalSpent: customer.totalSpent,
    }));

    return { customers };
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};

export const productDataRepo = async () => {
  try {
    const products = await productModel
      .find(
        {},
        {
          name: 1,
          price: 1,
          stock: 1,
          category: 1,
          totalSold: 1,
        }
      )
      .sort({ totalSold: -1 });

    return { products };
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};

export const orderDataRepo = async () => {
  try {
    const orderStatus = await orderModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    const bestCategory = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: "$totalSold" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    const orderData = await orderModel.aggregate([
      {
        $addFields: {
          userId: { $toObjectId: "$userId" },
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "userId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          createdAt: 1,
          customerName: "$customer.name",
          status: 1,
          totalAmount: 1,
        },
      },
    ]);

    return { bestCategory, orderStatus, orders: orderData };
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
      
  }
};

export const reportDataRepo = async () => {
  try {
     
    const reportData = await orderModel.aggregate([
          {
            $match:{status:"Completed"}
          },
          {
             $unwind:"$products"
          },
          {
            $addFields: {
              "products.productId": { $toObjectId: "$products.productId" }
            }
          },
          {
            $lookup: {
              from: "products",
              localField: "products.productId",
              foreignField: "_id",
              as: "product"
            }
          },
          {
            $unwind:"$product"
          },
          {
            $addFields:{
                userId:{$toObjectId:"$userId"}
            }
          },
          {
            $lookup:{
                from:"customers",
                localField:"userId",
                foreignField:"_id",
                as:"customer"
            }
          },
          {
            $unwind:"$customer"
          },
          {
            $project: {
              _id: { $toString: "$_id" },
              "quantity": "$products.quantity",
              "productName": "$product.name",
              "productPrice": "$product.price",
              "customerName": "$customer.name",
              createdAt: 1
            }
          }

      ]);

      return {reportData}
      
      
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};


export const orderDetaisRepo = async(orderId) => {
    try {

        const convertedOrderId = new mongoose.Types.ObjectId(orderId);
        console.log("convertedOrderId: ", convertedOrderId)
        const order = await orderModel.aggregate([
            {
             $match:{_id:convertedOrderId}
            },
            {
                $unwind:"$products"
             },
             {
                $addFields: {
                  "products.productId": { $toObjectId: "$products.productId" }
                }
              },
              {
                $lookup: {
                  from: "products",
                  localField: "products.productId",
                  foreignField: "_id",
                  as: "product"
                }
              },
              {
                $unwind:"$product"
              },
             {
              $project:{
                _id:{$toString:"$_id"},
                "productName":"$product.name",
                "price":"$product.price",
                "quantity":"$products.quantity",
                createAt:1
              }
             }
        ])

       return {order}

        
    } catch (error) {
        throw new ErrorService(error.message, error.statusCode);
    }
}